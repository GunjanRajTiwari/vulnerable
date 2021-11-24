const express = require("express");
const session = require("express-session");

const app = express();
const sessions = {};

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));
app.use(
	session({
		secret: "Session Secret",
		resave: false,
		saveUninitialized: false,
	})
);

// Custom middleware
function authenticate(req, res, next) {
	if (sessions[req.session.id] != undefined) {
		console.log("You are logged in!");
		return next();
	}
	console.log("Please login");
	return res.redirect("/login");
}

// Database connection
const { Client } = require("pg");

const db = new Client({
	user: "postgres",
	password: "gunjan",
	host: "localhost",
	port: 5432,
	database: "postgres",
});

db.connect();

//Transfer coin
async function transferCoin(from, to, amount) {
	try {
		await db.query("begin");
		const text = "update profile set coin=coin+$1 where id = $2";
		await db.query(text, [amount, to]);
		await db.query(text, [-amount, from]);
		await db.query("commit");
	} catch (e) {
		await db.query("rollback");
		console.log(e);
	}
}

// Routes
app.get("/login", (req, res) => {
	res.sendFile(__dirname + "/views/login.html");
});

app.get("/", authenticate, (req, res) => {
	res.sendFile(__dirname + "/views/home.html");
});

app.post("/login", async (req, res) => {
	const { email, password } = req.body;
	console.log(req.body);
	if (!email) {
		res.json({ error: "Invalid email" });
	}
	if (!password) {
		res.json({ error: "Invalid password" });
	}

	try {
		const text = "select id, password from profile where email = $1";
		const response = await db.query(text, [email]);
		const actualPassword = response.rows[0].password;
		if (password == actualPassword) {
			req.session.authUser = response.rows[0].id;
			sessions[req.session.id] = req.session;
			console.log(sessions);
			return res.redirect("/");
		}
		console.log(actualPassword);
		res.json({ error: "Invalid Credentials" });
	} catch (e) {
		res.json({ error: e });
	}
});

app.post("/sendCoins", authenticate, async (req, res) => {
	await transferCoin(req.session.authUser, req.body.to, req.body.amount);
	res.send(`${req.body.amount} coins sent successfully.`);
});

app.get("/profile/:id", async (req, res) => {
	const id = req.params.id;
	try {
		// Wrong way
		const data = await db.query(
			`select id, name, email, coin from profile where id = ${id}`
		);

		// Right Way
		// const data = await db.query(
		// 	`select id, name, email, coin from profile where id = $1`,
		// 	[id]
		// );
		res.json(data.rows);
	} catch (e) {
		res.json({ error: e });
	}
});

app.listen(8000, () => console.log("Running at port 8000 ..."));
