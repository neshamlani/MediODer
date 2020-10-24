import {makeStyles} from '@material-ui/core/styles'

const useStyles=makeStyles((theme)=>({
  mainWrapper:{
    padding:20,
    width:'auto'
  },
  cardWrapper:{
    padding:20,
    display:'flex'
  },
  imgWrapper:{
    width:100,
    height:100
  },
  imgs:{
    width:'100%',
    height:'100%'
  },
  detailsWrapper:{
    paddingLeft:20,
    display:'flex',
    width:'80%',
    justifyContent:'space-between'
  },
  leftWrapper:{
    display:'flex',
    flexDirection:'column',
  }
}))

export default useStyles