import { makeStyles } from '@material-ui/core/styles';

const useStyles=makeStyles((theme)=>({
  wrapper:{
    display:'flex',
    flexDirection:'column',
    margin:'auto',
    marginTop:10
  },
  titleWrapper:{
    color:'#3f51b5',
    textAlign:'center'
  },
  formWrapper:{
    display:'flex',
    flexDirection:'column',
    margin:'auto',
    marginTop:10
  },
  textField:{
    width:400,
    marginBottom:10,
    '&:disabled':{
      color:'black !important',
      fontWeight:'bold !important'
    }
  }
}))

export default useStyles