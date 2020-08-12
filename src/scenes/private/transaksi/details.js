import React from 'react'
import propTypes from 'prop-types'

//material-ui
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


export default function DetailsDialog({open, handleClose, transaksi}) {
    return (
        <Dialog
            open={open}
            onClose = {handleClose}
        >
            <DialogTitle>
                Transaksi No : {transaksi.no}
            </DialogTitle>
            <DialogContent>

            </DialogContent>
            <DialogActions>

            </DialogActions>
        </Dialog>
    )
}

DetailsDialog.prototype = {
    open : propTypes.bool.isRequired,
    handleClose :  propTypes.func.isRequired,
    transaksi : propTypes.object.isRequired
}