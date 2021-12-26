import React, {useEffect, useState} from "react";
import Dropzone from "../DropZone/DropZone";
import "./Upload.css";
import Progress from "../Progress/Progress";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

export default function Upload(props) {

    const [state, setState] = useState({
        files: [],
    })
     const onFilesAdded = (files) => {
        setState({...state, files: files})
    }

    useEffect( () => {
        async function upload() {
            if (state.files.length !== 0 && props.uploading === false) {
                props.setUploadingFile(state.files[0])
                props.setUploadProgress({})
                props.setUploading(true)
            }
        }
        upload()
    }, [state, props])


    const renderProgress = (file) => {
        const uploadProgress = props.uploadProgress[file.name];
        if (props.uploading || props.successfullUploaded) {
            return (
                <div className="progressWrapper">
                    <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
                    <CheckCircleOutlineIcon
                        className="checkIcon"
                        style={{
                            opacity:
                                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
                        }}
                    />
                </div>
            );
        }
    }

        return (
            <div className="upload">
                <span className="title">Upload Files</span>
                <div className="content">
                    <div>
                        <Dropzone
                            files={state.files}
                            game_pic={props.game_pic}
                            onFilesAdded={onFilesAdded}
                            disabled={props.uploading || props.successfullUploaded}
                        />
                    </div>
                    <div className="files">
                        {state.files.map(file => {
                            return (
                                <div key={file.name} className="row">
                                    <span className="filename">{file.name}</span>
                                    {renderProgress(file)}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );

}











