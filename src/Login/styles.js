import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
    formWrapper:{
        display:'flex',
        flexDirection:'column',
        width:300,
        margin:'auto',
        marginTop:50,
        textAlign:'center'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
}))

export default useStyles