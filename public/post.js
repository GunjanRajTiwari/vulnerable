const postBtn = document.getElementById("post");
function newPost() {
	postBtn.setAttribute("disabled", true);
	const content = document.getElementById("content");
	if (content.value == "") return;
	fetch("/post", {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			content: content.value,
		}),
	})
		.then(res => res.json())
		.then(() => {
			alert("Posted successfully.");
			content.value = "";
		})
		.catch(e => {
			alert("Failed to post");
		});
	postBtn.setAttribute("disabled", false);
}

postBtn.onclick = newPost;
