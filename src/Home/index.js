import React, { useEffect, useState, Fragment } from 'react'
import useStyles from './styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import axios from 'axios'
import Spinner from '../Spinner'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';

const Home = (props) => {
	const classes = useStyles()
	const [meds, setMeds] = useState([])
	const [loading, setLoading] = useState(false)
	const [email, setEmail] = useState(null)
	const [medSearch, setMedSearch] = useState('')
	const [search, setSearch] = useState('')
	useEffect(() => {
		setLoading(true)
		//Fetched the posted medicine details from posted document to display it to consumer
		axios.get('https://medi-o-der.firebaseio.com/posted.json')
			.then((resp) => {
				let details = []
				for (let i in resp.data) {
					details.push({
						...resp.data[i]
					})
				}
				setMeds(details)
			})
			.catch((err) => {
				alert(err)
			})
		//fetch the complete dataset of medicines to use it for vendor
		axios.get('https://medi-o-der.firebaseio.com/mediciens.json')
			.then((resp) => {
				let details = []
				for (let i in resp.data) {
					details.push({
						...resp.data[i],
						key: i
					})
				}
				props.medicinesFetched(details)
			})
			.catch(err => alert(err))
		const id = {
			idToken: props.token
		}
		//fetch detail of user(consumer/vendor) 
		axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDA8ZWcy1HnyEyjsbyXgOEaCSAhL5i-9Z0', id)
			.then((resp) => {
				let email = ''
				resp.data.users.map(val => email = val.email)
				setEmail(email)
				props.setUserData(email)
				setLoading(false)
			})
			.catch(err => {
				alert(err)
				setLoading(false)
			})

		//Fetch user data to check if the user is vendor or consumer
		axios.get('https://medi-o-der.firebaseio.com/users.json')
			.then(resp => {
				for (let i in resp.data) {
					if (email === resp.data[i].email) {
						props.setAddress(resp.data[i].address)
						if (resp.data[i].licence.toLowerCase() !== 'no') {
							props.isSeller()
							return
						}
					}
				}
			})
			.catch(err => alert(err))
	}, [email])

	const addToCart = (val) => {
		val.quantity = 1
		//props.addToCart(val)
		let user = email.split('@')
		axios.put(`https://medi-o-der.firebaseio.com/${user[0]}/cart/${val.id}.json`, { ...val })
			.then(resp => {
				console.log('resp', resp)
				alert('Added')
			})
			.catch(err => alert(err))
	}

	const searchHandler = (event) => {
		setSearch(event.target.value.toLowerCase())
		setMedSearch(meds.filter(val => val.name.toLowerCase().includes(event.target.value.toLowerCase())))
	}

	return (
		<div className={classes.mainWrapper}>
			<div className={classes.title}>Recommended Medicines</div>
			<TextField
				variant='outlined'
				label='Search'
				className={classes.searchMeds}
				onChange={searchHandler}
			/>

			<Grid
				container
				justify='center'
				alignItems='center'
				className={classes.searchContainer}
				spacing={2}>
				{
					search ?
						medSearch.map(val =>
							<Fragment key={val.id}>
								<Grid item xs={6} sm={4} md={3} lg={2}>
									<Card>
										<div className={classes.cardContent}>
											<img src={val.photo} className={classes.images} />
											<div>Name:{val.name}</div>
											<div>Price:{val.price}</div>
											<div>Vendor:{val.vendor}</div>
											<div>Store Address:{val.address}</div>
										</div>
										<CardActions>
											<Button
												variant='contained'
												color='primary'
												onClick={() => addToCart(val)}>Add To Cart</Button>
										</CardActions>
									</Card>
								</Grid>
							</Fragment>
						)
						:
						null
				}
			</Grid>

			<Grid container spacing={2} wrap='wrap' justify='center'>
				{
					loading ? <Spinner />
						:
						meds.map(val =>
							<Fragment key={val.id}>
								<Grid item xs={6} sm={4} md={3} lg={2} >
									<Card>
										<div className={classes.cardContent}>
											<img src={val.photo} className={classes.images} />
											<div>Name:{val.name}</div>
											<div>Price:{val.price}</div>
											<div>Vendor:{val.vendor}</div>
											<div>Store Address:{val.address}</div>
										</div>
										<CardActions>
											<Button
												variant='contained'
												color='primary'
												onClick={() => addToCart(val)}>Add To Cart</Button>
										</CardActions>
									</Card>
								</Grid>
							</Fragment>
						)
				}

			</Grid>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		token: state.token
	}
}
const mapDispatchToProps = dispatch => {
	return {
		medicinesFetched: (fetched) => dispatch({ type: 'MED_FETCHED', value: fetched }),
		setUserData: (details) => dispatch({ type: 'SET_USER_DETAILS', value: details }),
		isSeller: () => dispatch({ type: 'IS_SELLER' }),
		setAddress: (address) => dispatch({ type: 'ADDRESS', value: address })
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)