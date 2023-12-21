import "../css/file-downloader.css";

import * as React from "react";

type FileDownloaderProps = {
	endpointUrl: string;
};

type FileDownloaderState = {
	loading: boolean;
	error: string;
};

class FileDownloader extends React.Component<FileDownloaderProps, FileDownloaderState> {
	constructor(props: FileDownloaderProps | Readonly<FileDownloaderProps>) {
		super(props);
		this.state = {
			loading: false,
			error: ""
		};
	}
	
	downloadFiles = async () => {
		if (this.state.loading) return;
		try {
			this.setState({
				loading: true,
				error: ""
			});
			const response = await fetch(this.props.endpointUrl);
			const blob = await response.blob();
			
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", "media.zip");

			document.body.appendChild(link);
			link.click();
			link.parentNode.removeChild(link);
      			window.URL.revokeObjectURL(url);
		} catch (error) {
			this.setState({
				loading: false,
				error: error.toString()
			});
			console.error(error);
		}
	}

	render(): React.JSX.Element {
		return <div>
			<h2>Download Files</h2>
			<p className="warning">This will download all files in the media directory!</p>
			<button disabled={this.state.loading} onClick={this.downloadFiles}>Download Files</button>
			{this.state.error.length !== 0 && <p className="error">{this.state.error}</p>}
		</div>;
	}
}

export default FileDownloader;
