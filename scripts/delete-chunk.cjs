const fs = require("node:fs");

const chunkName = process.argv[3];

if (chunkName === undefined) {
	console.error("Error: Must provide chunk name");
	process.exit(1);
}

const deleteFile = (path) => {
	if (fs.existsSync(path)) {
		fs.unlinkSync(path);
	}
};

deleteFile(`./src/chunks/${chunkName}.tsx`);
deleteFile(`./src/css/${chunkName}.css`);
deleteFile(`./src/html/${chunkName}.html`);
