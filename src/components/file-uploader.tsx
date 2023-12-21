import "../css/file-uploader.css";

import * as React from "react";

type FileUploaderProps = {
	endpointUrl: string;
};

type FileUploaderState = {
	loading: boolean;
};

class FileUploader extends React.Component<FileUploaderProps, FileUploaderState> {
	private fileInputRef: React.RefObject<HTMLInputElement>;

        constructor(props: FileUploaderProps | Readonly<FileUploaderProps>) {
                super(props);
                this.state = {
                        loading: false
                };
                this.fileInputRef = React.createRef<HTMLInputElement>();
        }

        handleSubmit = async (event) => {
                event.preventDefault();
		if (this.state.loading) return;
                this.setState({
                        loading: true
                });
                const files = this.fileInputRef.current?.files;
                console.log(files);

		const formData = new FormData();
		for (let i = 0; i < files.length; i++) {
			formData.append("file", files[i]);
		}

		try {
			const response = await fetch(this.props.endpointUrl, {
				method: "POST",
				body: formData
			});

			if (response.ok) {
				console.log("Files uploaded successfully");
			} else {
				console.error('Failed to upload files.');
			}
		} catch (error) {
			console.error(error);
		}

		this.setState({
			loading: false
		});
        };

        render(): React.JSX.Element {
                return <form onSubmit={this.handleSubmit}>
                        <input ref={this.fileInputRef} disabled={this.state.loading} type="file" multiple={true} />
                        <button type="submit" disabled={this.state.loading}>Upload Media</button>
                </form>;
        }
}

export default FileUploader;
