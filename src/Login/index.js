import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import { Link, withRouter } from 'react-router-dom'
import Spinner from '../Spinner'
import { connect } from 'react-redux'

const Login = (props) => {

	const [token, setToken] = useState('')
	useEffect(() => {
		if (localStorage.getItem('token') !== null) {
			setToken(localStorage.getItem('token'))
			props.setUserToken(localStorage.getItem('token'))
			props.history.push('/')
		}
	}, [])

	const classes = useStyles()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const loginHandler = () => {
		setLoading(true)
		const data = {
			email: email,
			password: password
		}
		axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDA8ZWcy1HnyEyjsbyXgOEaCSAhL5i-9Z0', data)
			.then((resp) => {
				localStorage.setItem('token', resp.data.idToken)
				props.setUserToken(resp.data.idToken)
				setLoading(false)
				props.history.push('/')
			})
			.catch(err => {
				alert(err.response.data.error.message)
				setLoading(false)
			})
	}
	return (
		<div className={classes.formWrapper} >
			<h1>Login</h1>
			<ValidatorForm
				onSubmit={loginHandler}
				className={classes.form}
			>
				<TextValidator
					style={{ marginBottom: 20 }}
					type='email'
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					autoFocus
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
					style={{ marginBottom: 20 }}
				/>
				{
					loading ? <Spinner /> : null
				}
				<Button
					type='submit'
					color='primary'
					variant='contained'
					style={{ marginBottom: 10 }}>Login</Button>
			</ValidatorForm>
			<Link to='/sign'>Create New Account</Link>
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
		setUserToken: (token) => dispatch({ type: 'LOGIN', value: token }),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
