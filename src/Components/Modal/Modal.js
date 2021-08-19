import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
