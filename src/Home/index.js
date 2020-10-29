import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import axios from 'axios'
import Spinner from '../Spinner'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'

const Home = (props) => {
	const classes = useStyles()
	const [meds, setMeds] = useState([])
	const [loading, setLoading] = useState(false)
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
				props.setUserData(email)
				setLoading(false)
			})
			.catch(err => {
				alert(err)
				setLoading(false)
			})
	}, [])

	const addToCart=(val)=>{
		val.quantity=1
		props.addToCart(val)
	}

	return (
		<div className={classes.mainWrapper}>
			<div className={classes.title}>Recommended Medicines</div>
			<Grid container spacing={2} wrap='wrap'>
				{
					loading ? <Spinner />
						:
						meds.map(val =>
							<Grid item xs={6} sm={4} md={3} lg={2} >
									<Card>
										<div className={classes.cardContent}>
											<img src={val.photo} className={classes.images}/>
											<div>Name:{val.name}</div>
											<div>Price:{val.price}</div>
											<div>Vendor:{val.vendor}</div>
										</div>
										<CardActions>
											<Button
												variant='contained'
												color='primary'
												onClick={()=>addToCart(val)}>Add To Cart</Button>
										</CardActions>
									</Card>
							</Grid>
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
		addToCart:(items)=>dispatch({type:'ADD_TO_CART',value:items})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)