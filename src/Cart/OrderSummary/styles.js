import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modalwrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    backgroundColor: 'white',
    outline: 'none',
    width: 700,
    height: 500,
    //overflowY: 'scroll',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  tableWrapper: {
    padding: 20
  },
  priceWrapper: {
    width: '100%',
    fontSize: '1em',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'inherit',
    justifyContent: 'space-between'
  }
}));

export default useStyles