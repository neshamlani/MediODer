import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  modalwrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    backgroundColor: 'white',
    outline: 'none',
    width: 300,
    height: 200,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ['@media (max-width:650px)']: {
      width: '80vw',
      height: 'auto'
    }
  },
  cardWrapper: {
    fontSize: 24,
    color: 'black',
    width: 300
  },
  cardNumber: {
    marginTop: 10,
  }
}));

export default useStyles;