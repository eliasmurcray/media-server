const fs = require("node:fs");
const readline = require("node:readline/promises");

const chunkName = process.argv[3];

if (chunkName === undefined || chunkName === null) {
	console.error("Error: Must provide a chunk name");
	process.exit(1);
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

const createIfNotExists = (dir) => {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
};

createIfNotExists("./src/chunks/");
createIfNotExists("./src/css/");
createIfNotExists("./src/html/");

createFile(
	`./src/chunks/${chunkName}.tsx`,
	`import "../css/${chunkName}.css";

import * as React from "react";
import * as ReactDOM from "react-dom/client";

class App extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
  }

  render(): React.JSX.Element {
    return <p>${chunkName} works!</p>;
  }
}

const root = ReactDOM.createRoot(document.getElementById("app-root"));
root.render(<App />);
`,
)
	.then(() =>
		createFile(
			`./src/css/${chunkName}.css`,
			`body {
	background-color: #FFFFFF;
	color: #121318;
	font-family: sans-serif;
}`,
		),
	)
	.then(() =>
		createFile(
			`./src/html/${chunkName}.html`,
			`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${chunkName}</title>
  </head>
  <body><div id="app-root"></div></body>
</html>`,
		),
	)
	.then(() => rl.close());
