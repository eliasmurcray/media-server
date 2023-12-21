import "../css/index.css";

import * as React from "react";
import * as ReactDOM from "react-dom/client";

class App extends React.Component {
	constructor(props: {} | Readonly<{}>) {
		super(props);
	}

	render(): React.JSX.Element {
		return <p>testing changes!</p>;
	}
}

const root = ReactDOM.createRoot(document.getElementById("app-root"));
root.render(<App />);
