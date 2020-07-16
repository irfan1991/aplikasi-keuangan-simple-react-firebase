import React, {useState} from 'react'

// import material -ui
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

// mport style
import useStyles from './style/grid';

//import component 
import AddDialog from "./add";

export default function GridProduk() {

    const classes = useStyles();

    const [openAddDialog, setOpenAddDialog] = useState(false);

    return (
        <div>
            <h1>Halaman GridProduk</h1>
            <Fab
                className={classes.fab}
                color ="primary"
                onClick={(e) => {
                    setOpenAddDialog(true);
                }}
            >
                <AddIcon />
            </Fab>

            <AddDialog
                open={openAddDialog}
                handleClose={()=>{
                    setOpenAddDialog(false);
                }}
            />
        </div>
    )
}
