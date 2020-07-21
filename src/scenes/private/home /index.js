import React ,{useState, useEffect }from 'react'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import TextField from "@material-ui/core/TextField"

//firebase hook
import { useFirebase } from '../../../components/FirebaseProvider'
import {useCollection} from 'react-firebase-hooks/firestore';

//import komponent 
import AppLoading from "../../../components/AppLoading";

//import style
import useStyles from "./style";

export default function Home() {

    const {auth , firestore, user} = useFirebase();
    const produkCol = firestore.collection(`toko/${user.uid}/produk`);
    const [snapshotProduk , loadingProduk] = useCollection(produkCol);
    const [produkItems , setProdukItems] = useState([]);
    const [filterProduk, setFilterProduk] = useState('');
    const classes = useStyles();

    useEffect(()=>{

        if(snapshotProduk){
            setProdukItems(snapshotProduk.docs.filter((produkDoc)=>{
                if(filterProduk){
                    return produkDoc.data().nama.toLowerCase().includes(filterProduk.toLowerCase());
                }

                return true;
            }));
        }
    }, [snapshotProduk, filterProduk]);

    if(loadingProduk){
        return <AppLoading />
    }
  
    return (
        <div>
           <Typography variant="h5" component="h1">
               Buat Transaksi Baru
           </Typography>

           <Grid>
               <Grid item xs={12}>
                   <List
                   className={classes.produkList}
                    component="nav"
                    subheader={
                        <ListSubheader component="div">
                            <TextField
                            label="Cari Produk"
                            fullWidth
                            margin="normal"
                            onChange={e => {
                                setFilterProduk(e.target.value);
                            }}
                            />
                        </ListSubheader>
                    }
                   >
                        {
                            produkItems.map((produkDoc)=>{
                                const produkData = produkDoc.data();
                                return <ListItem
                                    key={produkDoc.id} 
                                    button
                                    disabled={produkData.stock == 0}
                                >
                                    {
                                        produkData.foto?
                                        <ListItemAvatar>
                                            <Avatar 
                                                src={produkData.foto}
                                                alt={produkData.nama}
                                            />
                                        </ListItemAvatar>
                                        :
                                        <ListItemIcon>
                                            <ImageIcon />
                                        </ListItemIcon>
                                    }
                                        <ListItemText
                                            primary={produkData.nama}
                                            secondary={`Stock :${produkData.stock || 0}`}
                                        />
                                </ListItem>
                            })
                        }
                   </List>

               </Grid>

           </Grid>
            <Button onClick={(e)=>{auth.signOut()}}>Sign Out</Button>
        </div>
    )
}
