import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    padding: 20,
    width: 'auto',
    margin:'auto'
  },
  cardWrapper: {
    padding: 20,
    display: 'flex',
    ['@media (max-width:650px)']: {
      flexDirection: 'column'
    }
  },
  imgWrapper: {
    width: 100,
    height: 100,
    ['@media (max-width:650px)']: {
      margin:'auto'
    }
  },
  imgs: {
    width: '100%',
    height: '100%'
  },
  detailsWrapper: {
    paddingLeft: 20,
    display: 'flex',
    width: '90%',
    justifyContent: 'space-between',
    ['@media (max-width:650px)']: {
      flexDirection: 'column',
      marginTop:20
    }
  },
  leftWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    width: 250,
    ['@media (max-width:650px)']: {
      margin:'auto'
    }
  },
  spanText: {
    fontWeight: 'bold'
  },
  quantityWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center',
    ['@media (max-width:650px)']: {
      margin:'20px 0 20px'
    }
  },
  incrWrapper: {
    display: 'flex',
    marginTop: 20
  },
  displayQuantity:{
    margin:'0 10px 0 10px',
    width:20,
  },
  inrBtn: {
    width:20,
    height:20
  },
  btnWrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  btn: {
    marginBottom: 10
  }
}))

export default useStyles