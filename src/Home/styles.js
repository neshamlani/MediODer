import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	mainWrapper: {
		padding: 20,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	title: {
		color: '#3f51b5',
		fontWeight: '900',
		fontSize: '28px',
		marginBottom: 10
	},
	searchMeds: {
		marginBottom: 40,
		width: '60%'
	},
	searchContainer: {
		marginBottom: '40px !important',
		textAlign: 'left'
	},
	images: {
		width: '150px',
		height: '150px',
	},
	cardContent: {
		padding: 10,
		width: 'auto'
	}
}))

export default useStyles