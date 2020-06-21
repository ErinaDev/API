function getInteractImage(name) {
	if (!name)
		throw TypeError(
			"La declaración del cliente y el nombre del directorio es necesaria."
		);
	let dir = "./resources/" + name;
	let files = fs.readdirSync(dir);
	let chosenFile = files[Math.floor(Math.random() * files.length)];
	return config.baseUrl + name + "/" + chosenFile;
}

let express = require("express"),
	http = require("http"),
	app = express(),
	fs = require("fs"),
	config = require("./config.json"),
	server = http.createServer(app),
	port = config.port,
	web = async () => {
		try {
			app.set("view engine", "ejs")
				.use(express.static("./resources/"))
				.get("/", (req, res) =>
					res.send({
						endpoints: [
							"GET /kiss",
							"GET /bite",
							"GET /hug",
							"GET /lick",
							"GET /pat",
							"GET /slap",
						],
					})
				)
				.get("/api/kiss", async (req, res) => {
					let image = getInteractImage("kiss");
					res.send({
						url: image,
					});
				})
				.get("/api/bite", async (req, res) => {
					let image = getInteractImage("bite");
					res.send({
						url: image,
					});
				})
				.get("/api/hug", async (req, res) => {
					let image = getInteractImage("hug");
					res.send({
						url: image,
					});
				})
				.get("/api/lick", async (req, res) => {
					let image = getInteractImage("lick");
					res.send({
						url: image,
					});
				})
				.get("/api/pat", async (req, res) => {
					let image = getInteractImage("pat");
					res.send({
						url: image,
					});
				})
				.get("/api/slap", async (req, res) => {
					let image = getInteractImage("slap");
					res.send({
						url: image,
					});
				})
				.use((req, res, next) => res.status(404).render("404")); // 404 not found

			server.listen(port, () => {
				console.log("ꕥ API port " + port + ".");
			});
			return;
		} catch (e) {
			console.error(e);
		}
	};

web();
