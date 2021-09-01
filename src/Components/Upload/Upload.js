import React, {Component, useState} from "react";
import Dropzone from "../DropZone/DropZone";
import "./Upload.css";
import Progress from "../Progress/Progress";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Button from "@material-ui/core/Button";

export default function Upload(props) {

    const [state, setState] = useState({
        files: [],
        uploading: false,
        uploadProgress: {},
        successfullUploaded: false
    })
// TODO changer les state, faire plusieurs useState
     const onFilesAdded = (files) => {
        setState({...state, files: files})
    }

     const uploadFiles = async () => {
        setState({
            ...state,
            uploadProgress: {},
            uploading: true
        });
        const promises = [];
        state.files.forEach(file => {
            promises.push(sendRequest(file))
        });
        try {
            await Promise.all(promises)

            setState({
                ...state,
                successfullUploaded: true,
                uploading: false })
        } catch (e) {
            // Not Production ready! Do some error handling here instead...
            setState({
                ...state,
                successfullUploaded: true,
                uploading: false })
        }
    }

    React.useEffect(() => {
        if(state.files.length !== 0 && state.uploading === false) {
            console.log('progress')
            setState({
                ...state,
                uploadProgress: {},
                uploading: true
            });
            const promises = [];
            state.files.forEach(file => {
                promises.push(sendRequest(state.files[0]))
            });
        }

    }, [state])

    const sendRequest = (file) => {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest()

            req.upload.addEventListener('progress', event => {
                if (event.lengthComputable) {
                    const copy = { ...state.uploadProgress }
                    copy[file.name] = {
                        state: 'pending',
                        percentage: (event.loaded / event.total) * 100
                    };
                    setState({...state, uploadProgress: copy })
                }
            });

            req.upload.addEventListener('load', event => {
                const copy = { ...state.uploadProgress }
                copy[file.name] = { state: 'done', percentage: 100 }
                setState({...state, uploadProgress: copy })
                resolve(req.response)
            });

            req.upload.addEventListener('error', event => {
                const copy = { ...state.uploadProgress }
                copy[file.name] = { state: 'error', percentage: 0 }
                setState({...state, uploadProgress: copy })
                reject(req.response)
            });

            const formData = new FormData()
            // formData.append('file', file, file.name)
            //
            // req.open('POST', 'http://localhost:8080/upload/game')
            // req.send(formData)
        });
    }

    const renderProgress = (file) => {
        console.log('check progress')
        const uploadProgress = state.uploadProgress[file.name];
        if (state.uploading || state.successfullUploaded) {
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
                            sendRequest={sendRequest}
                            game_pic={props.game_pic}
                            onFilesAdded={onFilesAdded}
                            disabled={state.uploading || state.successfullUploaded}
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
                <div className="actions">
                    {
                        state.successfullUploaded ?
                        <Button
                        onClick={() =>
                        setState({
                        ...state,
                        files: [],
                        successfullUploaded: false
                    })
                    }
                        >
                        Clear
                        </Button> :
                        <Button
                        disabled={state.files.length < 0 || state.uploading}
                        onClick={uploadFiles}
                        >
                        Upload
                        </Button>
                    }
                </div>
            </div>
        );

}











