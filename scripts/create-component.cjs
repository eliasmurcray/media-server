const fs = require("node:fs");
const readline = require("node:readline/promises");

const componentName = process.argv[3];

if (componentName === undefined || componentName === null) {
	console.error("Error: Must provide a component  name");
	process.exit(1);
}

if (!fs.existsSync("./src/components/")) {
	fs.mkdirSync("./src/components/");
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const createFile = async (path, contents) => {
	if (fs.existsSync(path)) {
		const response = await rl.question(path + " already exists. Regenerate file? (y/N): ");
		if (response.toLowerCase() === "y") {
			fs.writeFileSync(path, contents);
		} else {
			return;
		}
	}
	fs.writeFileSync(path, contents);
};

const componentClassName = componentName
	.split("-")
	.map(
		(v) =>
			v.charAt(0).toUpperCase() +
			v
				.slice(1)
				.split("")
				.map((v2) => v2.toLowerCase())
				.join(""),
	)
	.join("");

createFile(
	`./src/components/${componentName}.tsx`,
	`import "../css/${componentName}.css";

import * as React from "react";

class ${componentClassName} extends React.Component {
	constructor(props: {} | Readonly<{}>) {
		super(props);
	}

	render(): React.JSX.Element {
		return <p>${componentClassName} works!</p>;
	}
}

export default ${componentClassName};`,
)
	.then(() => createFile(`./src/css/${componentName}.css`, ``))
	.then(() => rl.close());
