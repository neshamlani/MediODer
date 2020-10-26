import {makeStyles} from '@material-ui/core/styles'

const useStyles=makeStyles((theme)=>({
  mainWrapper:{
    padding:20,
    width:'auto'
  },
  cardWrapper:{
    padding:20,
    display:'flex',
    ['@media (max-width:650px)']:{
      flexDirection:'column'
    }
  },
  imgWrapper:{
    width:100,
    height:100,
    ['@media (max-width:650px)']:{
      paddingLeft:20
    }
  },
  imgs:{
    width:'100%',
    height:'100%'
  },
  detailsWrapper:{
    paddingLeft:20,
    display:'flex',
    width:'90%',
    justifyContent:'space-between',
    ['@media (max-width:650px)']:{
      flexDirection:'column'
    }
  },
  leftWrapper:{
    display:'flex',
    flexWrap:'wrap',
    flexDirection:'column',
    width:250
  },
  spanText:{
    fontWeight:'bold'
  },


  btnWrapper:{
    display:'flex',
    flexDirection:'column'
  },
  btn:{
    marginBottom:10
  }
}))

export default useStyles