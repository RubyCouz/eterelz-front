import React, {Component, useRef, useState} from 'react'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import './DropZone.css'

export default function DropZone(props) {

    const [state, setState] = useState({
        highLight: false
    })

    const game_pic = useRef('')
    // ouverture de la boite de dialogue pour upload de fichier, puisque input invisible
    const openFileDialog = () => {
        if (props.disabled) {
            return
        }
        return game_pic.current.click
    }
    //ajout d'un fichier
    const onFilesAdded = (evt) => {
        if (props.disabled) {
            return
        }
        const files = evt.target.files
        const array = fileListToArray(files)
        props.onFilesAdded(array)

    }
    // convertion de la liste de fichier en tableau
    const fileListToArray = (list) => {
        const array = []
        for (let i = 0; i < list.length; i++) {
            array.push(list.item(i))
        }
        return array
    }

    const onDragOver = (evt) => {
        evt.preventDefault()
        if (props.disabled) {
            return
        }
        setState({...state, highLight: true})
    }

    const onDragLeave = () => {
        setState({...state, highLight: false})
    }

    const onDrop = (event) => {
        event.preventDefault()
        if (props.disabled) {
            return
        }
        const files = event.dataTransfer.files
        if (props.onFilesAdded) {
            const array = fileListToArray(files)
            props.onFilesAdded(array)
        }
        setState({...state, highLight: false})
    }

    return (
        <div
            className="{`Dropzone ${state.hightlight ? 'highlight' : ''}`}"
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={openFileDialog}
            style={{cursor: props.disabled ? 'default' : 'pointer'}}
            ref={game_pic}
        >
            <CloudUploadIcon className="icon"/>
            {/*<input*/}
            {/*    ref={fileInputRef}*/}
            {/*    className="fileInput"*/}
            {/*    type="file"*/}
            {/*    multiple*/}
            {/*    onChange={onFilesAdded}*/}
            {/*/>*/}
            {/*<span>Upload Files</span>*/}
        </div>
    )
}