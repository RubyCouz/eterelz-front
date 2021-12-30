import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import './Modal.css'
export default function AlertDialog(props) {

    return (
        <div >

            <Dialog
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                open={true}
                >
                <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" >
                        {props.children}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {props.canCancel &&
                    <Button onClick={props.onCancel} color="primary">
                        Disagree
                    </Button>}
                    {props.canConfirm &&
                    <Button onClick={props.onConfirm} color="primary" autoFocus>
                        Agree
                    </Button>}
                </DialogActions>
            </Dialog>
        </div>
    );
}
