import React, {useState , useEffect} from 'react'

// import material -ui
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

// mport style
import useStyles from './style/grid';

//import component 
import AddDialog from "./add";
import AppLoading from "../../../components/AppLoading";

//firebase hook
import { useFirebase } from "../../../components/FirebaseProvider";
import {useCollection} from 'react-firebase-hooks/firestore';

export default function GridProduk() {

    const classes = useStyles();
    const { firestore , user} = useFirebase();
    const produkCol = firestore.collection(`toko/${user.uid}/produk`);
    const [snapshot , loading] = useCollection(produkCol);
    const [produkItems, setProdukItems] = useState([]);

    const [openAddDialog, setOpenAddDialog] = useState(false);

    useEffect(()=>{

        if(snapshot){
            setProdukItems(snapshot.docs);
        }

    },[snapshot]);

    if(loading){
        return <AppLoading />
    }

    return (
        <div>
          <Typography variant="h5" component="h1">Daftar Produk</Typography>

          {
              produkItems.length <= 0 &&
              <Typography>Belum ada data produk</Typography>
          }

      
          <Grid container spacing={5}>

              {
                  produkItems.map((produkDoc)=>{

                    const produkData = produkDoc.data();
                    return  <Grid key={produkData.id} item={true} xs={12} sm={12} md={6} lg={4}>
                            <Card>
                                <CardContent>
                                     <Typography variant="h5" noWarp>{produkData.nama}</Typography>

                                </CardContent>
                            </Card>

                        </Grid>

                  })
              }
         
          </Grid>
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