import React, {Component, useState} from "react"
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import './DropZone.css'

export default function DropZone(props) {

    const [state, setState] = useState({
        hightlight: false
    })

    const openFileDialog = () => {
        if (props.disabled) return
        props.game_pic.current.click()
    }

    const onFilesAdded = (evt) => {
        if (props.disabled) return
        const files = evt.target.files
        if (props.onFilesAdded) {
            const array = fileListToArray(files)
            props.onFilesAdded(array)
        }
    }

    const onDragOver = (event) => {
        event.preventDefault();
        if (props.disabled) return;
        setState({...state, hightlight: true })
    }

    const onDragLeave = (event) => {
        setState({...state, hightlight: true })
    }

    const onDrop = (event) => {
        event.preventDefault();
        if (props.disabled) return;
        const files = event.dataTransfer.files;
        if (props.onFilesAdded) {
            const array = fileListToArray(files);
            props.onFilesAdded(array);
        }
        setState({...state, hightlight: false });
    }

    const fileListToArray = (list) => {
        const array = [];
        for (let i = 0; i < list.length; i++) {
            array.push(list.item(i));
        }
        return array;
    }

    return (
        <div
            className={`dropzone ${state.hightlight ? "highlight" : ""}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={openFileDialog}
            style={{ cursor: props.disabled ? "default" : "pointer" }}
        >
            <input
                ref={props.game_pic}
                className="fileInput"
                type="file"
                multiple
                onChange={onFilesAdded}
            />
            <CloudUploadIcon className="icon"/>
            <span>Upload Files</span>
        </div>
    );

}
