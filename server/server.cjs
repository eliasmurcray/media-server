const multer = require("multer");
const express = require("express");
const path = require("path");
const fs = require("fs");
const archiver = require("archiver");

const app = express();
const PORT = "5502";

if (!fs.existsSync(path.join(__dirname, "media"))) {
	fs.mkdirSync(path.join(__dirname, "media"));
}

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, "media/");
	},
	filename(req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const media = multer({ storage });

app.use(express.static(path.join(__dirname)));

// Enable access from localhost:5501
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://192.168.86.48:5001");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
});

// Allow reading for form data
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.sendFile(path.resolve(__dirname, "media.zip"));
});

// Upload files via FormData
app.post("/upload", media.array("file"), (req, res) => {
	res.sendStatus(req.files && req.files.length ? 200 : 400);
});

// Get all files in media
app.get("/download", (req, res) => {
	console.log(`Download request recieved at ${new Date()}`);
	res.sendFile("media.zip", { root: path.join(__dirname) });
	return;
	const files = fs.readdirSync(path.join(__dirname, "media"));
	if (!files || files.length === 0) {
		res.sendStatus(404);
		return;
	}
	const startDate = new Date();
	const archive = archiver("zip");
	archive.on("progress", (zipProgress) => {
		const progress = zipProgress.entries.processed * 100.0 / files.length;
		console.log(`${progress.toFixed(3)}% at ${new Date()}, started at ${startDate}`);
	});
	const zipStream = fs.createWriteStream(path.join(__dirname, "media.zip"));
	zipStream.on("close", () => {
		res.download(path.join(__dirname, "media.zip"));
	});
	archive.pipe(zipStream);
	archive.directory(path.join(__dirname, "media"), false);
	archive.finalize();
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
