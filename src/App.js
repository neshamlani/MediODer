import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from './Header'
import Login from './Login'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Signup from './Signup'
import Home from './Home'
import Sell from './Sell'
import Profile from './Profile'
import Cart from './Cart'
import Orders from './Orders'

const App = (props) => {
  useEffect(() => {
    if (props.token === null) {
      props.history.push('/auth')
    }
  }, [])
  return (
    <div>
      <Header />
      {
        props.token ?
          <Switch>
            <Route path='/profile' component={Profile} />
            <Route path='/sell' component={Sell} />
            <Route path='/cart' component={Cart} />
            <Route path='/orders' component={Orders} />
            <Route path='/' component={Home} />
          </Switch>
          :
          <Switch>
            <Route path='/auth' component={Login} />
            <Route path='/sign' component={Signup} />
            <Route path='/' render={() => <Redirect to='/auth' />} />
          </Switch>
      }

    </div>
  )
}


const mapStateToProps = state => {
  return {
    token: state.token
  }
}

export default connect(mapStateToProps)(withRouter(App));
