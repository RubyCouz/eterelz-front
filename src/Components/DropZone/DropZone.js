import React, {useState} from "react"
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import './DropZone.css'

export default function DropZone(props) {

    const [hightlight, setHightlight] = useState()

    const openFileDialog = () => {
        if (props.disabled) return
        props.inputRef.current.click()
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
        event.preventDefault()
        if (props.disabled) return
        setHightlight(true)
    }

    const onDragLeave = (event) => {
        setHightlight(true)
    }

    const onDrop = (event) => {
        event.preventDefault()
        if (props.disabled) return
        const files = event.dataTransfer.files
        if (props.onFilesAdded) {
            const array = fileListToArray(files)
            props.onFilesAdded(array)
        }

        setHightlight(true)
    }

    const fileListToArray = (list) => {
        const array = []
        for (let i = 0; i < list.length; i++) {
            array.push(list.item(i))
        }
        console.log(array)
        return array;
    }

    return (
        <div
            className={`dropzone ${hightlight ? "highlight" : ""}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={openFileDialog}
            style={{ cursor: props.disabled ? "default" : "pointer" }}
        >
            <input
                ref={props.inputRef}
                className="fileInput"
                type="file"
                onChange={onFilesAdded}
            />
            <CloudUploadIcon className="icon"/>
            <span>Upload Files</span>
        </div>
    );

}
