import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import SearchIcon from '@material-ui/icons/Search'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Button from '@material-ui/core/Button'
import useStyles from './styles'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Spinner from '../Spinner'

const Sell = (props) => {
	const [search, setSearch] = useState('')
	const [searchResult, setSearchResult] = useState([])
	const [userName, setUserName] = useState('')
	const [uploadedMeds, setUploadedMeds] = useState([])
	const [isSeller, setIsSeller] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		let userEmail = ''
		userEmail = props.userDetails.split('@')
		setUserName(userEmail[0])
		//order the database by licence to check it the user is consumer or vendor using the email id
		axios.get('https://medi-o-der.firebaseio.com/users.json?orderBy="licence"')
			.then((resp) => {
				for (let i in resp.data) {
					var email = resp.data[i].email
					email = email.split('@')
					if (email[0] === userEmail[0]) {
						if (resp.data[i].licence.toLowerCase() !== 'no') {
							setIsSeller(true)
							return
						}
					}
				}
			})
			.catch(err => alert(err))
		//fetch posted medicines of vendor to display it to vendor 
		axios.get(`https://medi-o-der.firebaseio.com/${userEmail[0]}.json`)
			.then((resp) => {
				var data = []
				for (let i in resp.data) {
					data.push({
						...resp.data[i],
						key: i
					})
				}
				setUploadedMeds(data)
				setLoading(false)
			})
			.catch(err => alert(err))

	}, [])
	const handlerSearch = () => {

	}

	const changeHandler = (event) => {
		setSearch(event.target.value.toLowerCase())
		setSearchResult(props.getMedicines.filter(val => val.name.toLowerCase().includes(search)))
	}

	const sellHandler = (meds) => {
		const medData = {
			name: meds.name,
			photo: meds.photo,
			price: meds.price,
			id: meds.key,
			medType:meds.type
		}
		//upload the data of medicine to 2 documents as vendor wants to sell the medicines
		axios.post(`https://medi-o-der.firebaseio.com/${userName}.json`, medData)
			.then(() => {
				medData.vendor = userName
				axios.post(`https://medi-o-der.firebaseio.com/posted.json`, medData)
					.then(() => {
						// var addMeds=uploadedMeds
						// addMeds.push(medData)
						// setUploadedMeds(addMeds)
						alert('Posted')						
					})
					.catch(err => alert(err))
			})
			.catch(err => alert(err))
		//console.log('medData', medData)

	}

	const cancelHandler = (med) => {
		//delete posted med
		axios.delete(`https://medi-o-der.firebaseio.com/${userName}/${med.key}.json`)
			.then(() => {
				axios.get(`https://medi-o-der.firebaseio.com/posted.json?orderBy="vendor"&equalTo="${userName}"`)
					.then(resp => {
						for (let i in resp.data) {
							if (resp.data[i].id === med.id) {
								axios.delete(`https://medi-o-der.firebaseio.com/posted/${i}.json`)
									.then(() => alert('removed'))
									.catch(err => alert(err))
							}
						}
					})
					.catch(err => alert(err))
				let del = uploadedMeds
				let updated = del.filter(val => val.key !== med.key)
				setUploadedMeds(updated)
			})
			.catch(err => alert(err))
	}

	const classes = useStyles()
	return (
		<div>
			{
				loading ? <Spinner /> :

					<div>
						{
							isSeller
								?
								<div className={classes.container}>
									<ValidatorForm
										onSubmit={handlerSearch}>
										<Grid container justify='center' alignItems='center'>
											<Grid item md={6}>
												<TextValidator
													type='text'
													value={search}
													variant='filled'
													label='Search'
													onChange={changeHandler}
													validators={['required']}
													errorMessages={['this field is required']}
													fullWidth
												/>
											</Grid>
											<Grid item>
												<Button type='submit'><SearchIcon fontSize='small' color='primary' />Search</Button>
											</Grid>
										</Grid>
									</ValidatorForm>
									<Grid
										container
										justify='center'
										alignItems='center'
										style={{ textAlign: 'left' }}
										spacing={2}>
										{
											searchResult.map(val =>
												<Grid item xs={6} sm={4} md={3} lg={2}>
													<Card>
														<CardContent>
															<img src={val.photo} width='150' height='150' />
															<div>Name:{val.name}</div>
															<div>Price:{val.price}</div>
														</CardContent>
														<CardActions>
															<Button
																variant='contained'
																color='primary'
																onClick={() => sellHandler(val)}>Sell</Button>
														</CardActions>
													</Card>
												</Grid>)
										}
									</Grid>
									<div className={classes.title}>Your Posted Medicines</div>
									<Grid
										container
										justify='center'
										alignItems='center'
										style={{ textAlign: 'left' }}
										spacing={2}>
										{
											uploadedMeds.map((val) => {
												return (
													<Grid item xs={6} sm={4} md={3} lg={2}>
														<Card>
															<CardContent>
																<img src={val.photo} width='150' height='150' />
																<div>Name:{val.name}</div>
																<div>Price:{val.price}</div>
															</CardContent>
															<CardActions>
																<Button
																	variant='contained'
																	color='primary'
																	onClick={() => cancelHandler(val)}>Cancel</Button>
															</CardActions>
														</Card>
													</Grid>
												)
											})
										}
									</Grid>
								</div>
								:
								<div className={classes.container}>
									<div className={classes.title}>You are not a seller</div>
								</div>
						}
					</div>
			}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		getMedicines: state.medicines,
		userDetails: state.userDetails
	}
}

export default connect(mapStateToProps)(withRouter(Sell))