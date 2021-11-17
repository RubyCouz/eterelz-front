import React, {useState} from 'react'
import './Progress.css'

export default function Progress(props) {
const [state, setState] = useState()
    return(
        <div className="progressBar">
            <div className="progress" style={{width: props.progress + '%'}}>

            </div>
        </div>
    )

}