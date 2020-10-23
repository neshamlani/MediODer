import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    formWrapper:{
        display:'flex',
        flexDirection:'column',
        width:400,
        margin:'auto',
        textAlign:'center'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    textField:{
        marginBottom:5
    }
}))

export default useStyles