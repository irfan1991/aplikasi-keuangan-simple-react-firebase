import { makeStyles} from '@material-ui/styles'


const useStyles= makeStyles(theme=>({

        hideInputFile :{
            display :'none'
        },
        uploadFotoProduk : {
            padding : theme.spacing(3),
            textAlign : "center"
        },
        previewFoto : {
            width :"100%",
            height : "auto"
        }

}))


export default useStyles;
