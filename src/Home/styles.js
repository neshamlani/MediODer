import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	mainWrapper: {
		padding: 20,
	},
	title: {
		color: '#3f51b5',
		fontWeight: '900',
		fontSize: '28px',
		marginBottom: 10
	},
	images: {
		width: 'auto',
		height: '150px',
	},
	cardContent: {
		padding: 10,
		width:'auto'
	}
}))

export default useStyles