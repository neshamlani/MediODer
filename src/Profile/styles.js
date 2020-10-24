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
    padding:20,
    width:'auto'
  },
  textField:{
    width:400,
    marginBottom:10,
  },
  textFieldDisabled:{
    '& .MuiInputBase-input.Mui-disabled':{
      color:'rgba(0,0,0,0.7)',
      fontWeight:'bold'
    }
  }
}))

export default useStyles