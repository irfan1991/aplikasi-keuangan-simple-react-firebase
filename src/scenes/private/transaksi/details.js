import React from 'react'
import propTypes from 'prop-types'

//material-ui
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

//import helper 
import { currency } from "../../../helpers/formatter";
export default function DetailsDialog({open, handleClose, transaksi}) {
    return (
        <Dialog
            open={open}
            onClose = {handleClose}
        >
            <DialogTitle>
                Transaksi No : {transaksi.no}
            </DialogTitle>
            <DialogContent dividers>
            <Table>
                    <TableHead>
                        <TableCell>Item</TableCell>
                        <TableCell>Jumlah</TableCell>
                        <TableCell>Harga</TableCell>
                        <TableCell>Subtotal</TableCell>
                    </TableHead>
                    <TableBody>
                        { transaksi.items && 
                            Object.keys(transaksi.items).map(k =>{
                                const item = transaksi.items[k];
                                console.log(item);
                                return (
                                    <TableRow key={k}>
                                        <TableCell>{item.nama}</TableCell>
                                        <TableCell>{item.jumlah}</TableCell>
                                        <TableCell>{currency(item.harga)}</TableCell>
                                        <TableCell>{currency(item.subtotal)}</TableCell>
                                    </TableRow>
                                )
                            })
                        }

                        <TableRow>
                            <TableCell colSpan={3}>
                                <Typography
                                variant="subtitle1">
                                    Total
                                </Typography> 
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6">
                                {currency(transaksi.total)}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    )
}

DetailsDialog.prototype = {
    open : propTypes.bool.isRequired,
    handleClose :  propTypes.func.isRequired,
    transaksi : propTypes.object.isRequired
}