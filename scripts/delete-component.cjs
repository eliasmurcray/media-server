const fs = require("node:fs");

const componentName = process.argv[3];

if (componentName === undefined || componentName === null) {
	console.error("Error: Must provide a component  name");
	process.exit(1);
}

const deleteFile = (path) => {
	if (fs.existsSync(path)) {
		fs.unlinkSync(path);
	}
};

deleteFile(`./src/components/${componentName}.tsx`);
deleteFile(`./src/css/${componentName}.css`);
