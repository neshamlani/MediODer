import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles'
import axios from 'axios'
import { connect } from 'react-redux'
import Spinner from '../Spinner'

const Profile = (props) => {
  const classes = useStyles();
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get('https://medi-o-der.firebaseio.com/users.json')
      .then(resp => {
        var email = ''
        var details = props.userDetails
        details = details.split('@')
        for (let i in resp.data) {
          email = resp.data[i].email
          email = email.split('@')
          if (email[0] === details[0]) {
            setData(resp.data[i])
            setLoading(false)
            return
          }
        }
        
      })
      .catch(err => {
        alert(err)
        setLoading(false)
      })
  }, [])

  return (
    <div className={classes.wrapper}>
      <div className={classes.titleWrapper}><h2>My Profile</h2></div>
      {
        loading ? <Spinner />
          :
          <div className={classes.formWrapper}>
            <TextField
              placeholder="Name"
              variant="outlined"
              value={data.name}
              disabled
              className={classes.textField} />

            <TextField
              placeholder="E-mail Address"
              variant="outlined"
              value={data.email}
              disabled
              className={classes.textField} />

            <TextField
              placeholder="Address"
              variant="outlined"
              value={data.address}
              multiline
              disabled
              className={classes.textField} />

            <TextField
              placeholder="Mobile No"
              variant="outlined"
              value={data.number}
              disabled
              className={classes.textField} />

            <TextField
              placeholder="Licence"
              variant="outlined"
              value={data.licence}
              disabled
              className={classes.textField} />
          </div>
      }
    </div>

  );
}

const mapStateToProps = state => {
  return {
    userDetails: state.userDetails
  }
}

export default connect(mapStateToProps)(Profile)