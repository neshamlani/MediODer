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
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ['@media (max-width:650px)']: {
      width: '80vw',
      height: '50vh'
    }
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
  },
  radioGroup: {
    '&.MuiFormGroup-root': {
      display: 'flex',
      flexDirection: 'row'
    }
  }
}));

export default useStyles