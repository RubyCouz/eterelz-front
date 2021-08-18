import React, {Component, useState} from 'react'
import {makeStyles} from '@material-ui/core'
import DropZone from '../DropZone/DropZone'
import Progress from '../Progress/Progress'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import './Upload.css'

const useStyle = makeStyles((theme) => ({}))

export default function Upload(props) {
    const classes = useStyle()
    const [state, setState] = useState({
        files: [],
        uploading: false,
        uploadProgress: [],
        successfullUploaded: false
    })

    const onFilesAdded = (files) => {
        setState({...state, files: files})
    }

    const uploadFiles = async () => {
        setState({
            ...state,
            uploadProgress: {},
            uploading: true
        })
        const promises = []
        state.files.forEach(file => {
            promises.push(sendRequest(file))
        })
        try{
            await Promise.all(promises)
                .setState({
                    ...state,
                    successfullUpload: true,
                    uploading: false
                })
        } catch (e) {
            // ajout error
            setState({
                ...state,
                successfullUploaded: true,
                uploading:false
            })
        }
    }

    const sendRequest = (file) => {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest()

            req.upload.addEventListener('progress', event => {
                if(event.lengthComputable) {
                    const copy = {...state.uploadProgress}
                    copy[file.name] = {
                        state: 'pending',
                        percentage: (event.loaded / event.total) * 100
                    }
                    setState({
                        ...state,
                        uploadProgress: copy
                    })
                }
            })

            req.upload.addEventListener('load', event => {
                const copy = {...state.uploadProgress}
                copy[file.name] = {
                    state: 'done',
                    percentage: 100
                }
                setState({
                    ...state,
                    uploadProgress: copy
                })
                resolve(req.response)
            })

            req.upload.addEventListener('error', event => {
                const copy = {...state.uploadProgress}
                copy[file.name] = {
                    state: 'error',
                    percentage: 0
                }
                setState({
                    ...state,
                    uploadProgress: copy
                })
                reject(req.response)
            })
            const formData = new FormData()
            formData.append("file", file, file.name)

            req.open('POST', 'http://localhost:8080/upload')
            req.send(formData)
        })
    }

    const renderProgress = (file) => {
        setState({
            ...state,
            uploadProgress: file.name
        })
        const uploadProgress = state.uploadProgress
        if(state.uploading || state.successfullUploaded) {
            return(
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
            )
        }
    }

    const renderActions = () => {
        if(state.successfullUploaded) {
            return (
                <button
                    onClick={() =>
                        setState({
                            ...state,
                            files: [],
                            successfullUploaded: false
                        })
                    }
                >
                    Clear
                </button>
            );
        } else {
            return (
                <button
                    disabled={
                        state.files.length < 0 ||
                        state.uploading
                    }
                    onClick={uploadFiles}
                >
                    Upload
                </button>
            )
        }
    }

    return (
        <>
            <div className="upload">
                <span className="title">Upload Files</span>
                <div className="content">
                    <div>
                        <DropZone
                            onFilesAdded={onFilesAdded}
                            disabled={state.uploading || state.successfullUploaded}
                        />
                    </div>
                    <div className="files">
                        {state.files.map(file => {
                            return (
                                <div key={file.name} className="Row">
                                    <span className="Filename">{file.name}</span>
                                    {() => renderProgress(file)}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="actions">
                    {
                        () => renderActions()
                    }
                </div>
            </div>
        </>
    )
}