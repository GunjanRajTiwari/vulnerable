const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: false }));

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
		await db.query(begin);
		const text = "update profile set coin=coin+$1 where id = '$2'";
	} catch (e) {
		await db.query("rollback");
		console.log(e);
	}
}

// Routes
app.get("/", (req, res) => {
	res.send("Success");
});

app.get("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		// Wrong way
		const data = await db.query(
			`select name, email, coin from profile where email = '${id}'`
		);

		// Right Way
		// const data = await db.query(
		// 	`select name, email, coin from profile where email = $1`,
		// 	[id]
		// );
		res.json(data);
	} catch (e) {
		res.json({ error: e });
	}
});

app.post("/login");

app.listen(8000);
