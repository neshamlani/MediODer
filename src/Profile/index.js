import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles'
import axios from 'axios'
import { connect } from 'react-redux'
import Spinner from '../Spinner'
import Grid from '@material-ui/core/Grid'

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
            <Grid container justify='center' spacing={4}>
              <Grid item>
                <span>Name</span><br />
                <TextField
                  placeholder="Name"
                  variant="outlined"
                  value={data.name}
                  disabled
                  className={classes.textField}
                  InputProps={{ className: classes.textFieldDisabled }} />

                <br /><span>Email Addess</span><br />
                <TextField
                  placeholder="E-mail Address"
                  variant="outlined"
                  value={data.email}
                  disabled
                  className={classes.textField}
                  InputProps={{ className: classes.textFieldDisabled }} />

                <br /><span>Mobile Number</span><br />
                <TextField
                  placeholder="Mobile No"
                  variant="outlined"
                  value={data.number}
                  disabled
                  className={classes.textField}
                  InputProps={{ className: classes.textFieldDisabled }} />

              </Grid>
              <Grid item>
                <span>Licence</span><br />
                <TextField
                  placeholder="Licence"
                  variant="outlined"
                  value={data.licence}
                  disabled
                  className={classes.textField}
                  InputProps={{ className: classes.textFieldDisabled }} />

                <br /><span>Address</span><br />
                <TextField
                  placeholder="Address"
                  variant="outlined"
                  value={data.address}
                  multiline
                  disabled
                  className={classes.textField}
                  InputProps={{ className: classes.textFieldDisabled }} />
              </Grid>
            </Grid>
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