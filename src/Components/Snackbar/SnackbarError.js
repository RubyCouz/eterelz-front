import React from 'react'
import { Snackbar, Button} from '@mui/material'
import MuiAlert from '@material-ui/lab/Alert'
import IconButton from "@mui/material/IconButton";

// Alert
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CloseIcon() {
    return null;
}


export default function SnackbarError (props) {
    // état de l'alerte


    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={props.onClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={props.onClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )
    return (
        <div className={props.class}>
            <Snackbar
                anchorOrigin={props.anchorOrigin}
                open={props.open}
                autoHideDuration={5000}
                TransitionComponent={props.transitionComponent}
                onClose={props.onClose}

                message={props.message}
                key={props.key}
            >
                <Alert severity={props.severity}
                       action={action}
                >
                    {props.message}
                </Alert>
            </Snackbar>
        </div>
    )
}
