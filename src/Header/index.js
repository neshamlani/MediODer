import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const Header = (props) => {
	const classes = useStyles()
	const [loggedin, setLoggedin] = useState(false)
	const [menuItems, setMenuItem] = useState('')
	useEffect(() => {
		if (localStorage.getItem('token') !== null) {
			props.setUserToken(localStorage.getItem('token'))
			setLoggedin(true)
		}
	})
	const logoutUser = () => {
		props.logoutUser()
		localStorage.removeItem('token')
		setLoggedin(false)
		props.history.push('/auth')
	}

	return (
		<AppBar position='static'>
			<ToolBar className={classes.header}>
				{
					loggedin ?
						<div>
							<NavLink
								to='/'
								activeClassName={classes.link}
								className={classes.link}>
								<Button style={{ color: 'white' }}>Home</Button>
							</NavLink>
							<NavLink
								to='/profile'
								activeClassName={classes.link}
								className={classes.link}>
								<Button style={{ color: 'white' }}>Profile</Button>
							</NavLink>
							{
								props.isSeller ?
									<NavLink
										to='/sell'
										activeClassName={classes.link}
										className={classes.link}>
										<Button style={{ color: 'white' }}>Sell</Button>
									</NavLink>
									: null
							}
							<NavLink
								to='/orders'
								activeClassName={classes.link}
								className={classes.link}>
								<Button style={{ color: 'white' }}>Orders</Button>
							</NavLink>
							{
								props.isSeller
									?
									null
									:
									<NavLink
										to='/cart'
										activeClassName={classes.link}
										className={classes.link}>
										<Button style={{ color: 'white' }}>Cart</Button>
									</NavLink>
							}
							<Button style={{ color: 'white' }} onClick={logoutUser}>Logout</Button>
						</div>
						:
						<NavLink
							to='/auth'
							activeClassName={classes.link}
							className={classes.link}>
							<Button style={{ color: 'white' }}>Sign In</Button>
						</NavLink>
				}
			</ToolBar>
		</AppBar>
	)
}


const mapStateToProps = state => {
	return {
		token: state.token,
		isSeller: state.isSeller
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setUserToken: (token) => dispatch({ type: 'LOGIN', value: token }),
		logoutUser: () => dispatch({ type: 'LOGOUT' })
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))