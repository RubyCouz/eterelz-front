import React, {Component, useState} from "react";
import Dropzone from "../DropZone/DropZone";
import "./Upload.css";
import Progress from "../Progress/Progress";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Button from "@material-ui/core/Button";
import {logDOM} from "@testing-library/react";

export default function Upload(props) {

    const [state, setState] = useState({
        files: [],
    })
     const onFilesAdded = (files) => {
        setState({...state, files: files})
    }


    React.useEffect(async () => {
        console.log(state.files.length)
        console.log(props.uploading)
        if (state.files.length !== 0 && props.uploading === false) {
            console.log(state.files[0])
           props.setUploadingFile(state.files[0])
            props.setUploadProgress({})

            props.setUploading(true)
        }

    }, [state])


    const renderProgress = (file) => {
        console.log(props.uploadProgress)
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
                            // sendRequest={sendRequest}
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
                {/*<div className="actions">*/}
                {/*    {*/}
                {/*        state.successfullUploaded ?*/}
                {/*        <Button*/}
                {/*        onClick={() =>*/}
                {/*        setState({*/}
                {/*        ...state,*/}
                {/*        files: [],*/}
                {/*        successfullUploaded: false*/}
                {/*    })*/}
                {/*    }*/}
                {/*        >*/}
                {/*        Clear*/}
                {/*        </Button> :*/}
                {/*        <Button*/}
                {/*        disabled={state.files.length < 0 || state.uploading}*/}
                {/*        onClick={uploadFiles}*/}
                {/*        >*/}
                {/*        Upload*/}
                {/*        </Button>*/}
                {/*    }*/}
                {/*</div>*/}
            </div>
        );

}











