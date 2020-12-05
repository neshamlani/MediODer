import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router-dom'
import Spinner from '../Spinner'
import { connect } from 'react-redux'

const Signup = (props) => {
	const classes = useStyles()
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [number, setNumber] = useState('')
	const [address, setAddress] = useState('')
	const [licence, setLicence] = useState('')
	const [loading, setLoading] = useState(false)

	const signupHandler = () => {
		setLoading(true)
		const details = {
			email: email,
			number: number,
			address: address,
			licence: licence,
			name:name
		}
		const data = {
			email: email,
			password: password
		}
		axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDA8ZWcy1HnyEyjsbyXgOEaCSAhL5i-9Z0', data)
			.then((resp) => {
				localStorage.setItem('token', resp.data.idToken)
				props.setUserToken(resp.data.idToken)
				axios.post('https://medi-o-der.firebaseio.com/users.json', details)
					.then(() => setLoading(false))
					.catch(err => alert(err.response.data.error.message))
			})
			.catch((err) => {
				alert(err.response.data.error.message)
				setLoading(false)
			})
	}
	return (
		<div className={classes.formWrapper} >
			<h1>Signup</h1>
			<ValidatorForm
				onSubmit={signupHandler}
				className={classes.form}
			>
				<TextValidator
					type='text'
					autoFocus
					value={name}
					onChange={(event) => setName(event.target.value)}
					fullWidth
					validators={['required']}
					errorMessages={['this field is required']}
					variant='outlined'
					label='Name'
					className={classes.textField}
				/>

				<TextValidator
					className={classes.textField}
					type='email'
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					fullWidth
					validators={['required', 'isEmail']}
					errorMessages={['this field is required', 'email is not valid']}
					variant='outlined'
					label='Email'

				/>

				<TextValidator
					type='password'
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					fullWidth
					validators={['required']}
					errorMessages={['this field is required']}
					variant='outlined'
					label='Password'
					className={classes.textField}
				/>

				<TextValidator
					type='number'
					value={number}
					onChange={(event) => setNumber(event.target.value)}
					fullWidth
					validators={['required']}
					errorMessages={['this field is required']}
					variant='outlined'
					label='Contact Number'
					className={classes.textField}
				/>

				<TextValidator
					type='text'
					value={address}
					onChange={(event) => setAddress(event.target.value)}
					fullWidth
					validators={['required']}
					errorMessages={['this field is required']}
					variant='outlined'
					label='Address'
					className={classes.textField}
				/>

				<TextValidator
					type='text'
					value={licence}
					onChange={(event) => setLicence(event.target.value)}
					fullWidth
					validators={['required']}
					errorMessages={['this field is required']}
					variant='outlined'
					label='Licence'
					placeholder='Enter no if consumer'
					className={classes.textField}
				/>

				{
					loading ? <Spinner /> : null
				}
				<Button type='submit' color='primary' variant='contained'>SignUp</Button>
			</ValidatorForm>
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
		setUserToken: (token) => dispatch({ type: 'LOGIN', value: token })
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signup))