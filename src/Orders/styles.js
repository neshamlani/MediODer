import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20
  },
  ordersWrapper: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    textAlign: 'center'
  },

  detailsWrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: 10
  },

  cardWrapper: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  }
}));

export default useStyles;