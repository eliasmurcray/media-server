import "../css/index.css";

import * as React from "react";
import * as ReactDOM from "react-dom/client";

import FileUploader from "../components/file-uploader";
import FileDownloader from "../components/file-downloader";

class App extends React.Component {
	constructor(props: {} | Readonly<{}>) {
		super(props);
	}

	render(): React.JSX.Element {
		return <main>
			<h2>Upload Files to server</h2>
			<FileUploader endpointUrl="http://localhost:5502/upload" />
			<FileDownloader endpointUrl="http://localhost:5502/download" />
		</main>;
	}
}

const root = ReactDOM.createRoot(document.getElementById("app-root"));
root.render(<App />);
