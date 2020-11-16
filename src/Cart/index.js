import React, { useEffect, useState, Fragment } from 'react'
import useStyles from './styles'
import Grid from '@material-ui/core/Grid'
import CartCard from './CartCard'
import { connect } from 'react-redux'
import axios from 'axios'
import Spinner from '../Spinner'
import OrderSummary from './OrderSummary'
import Button from '@material-ui/core/Button'

const Cart = (props) => {
  const classes = useStyles()
  const [fetchedMeds, setFetchedMeds] = useState([])
  const [loading, setLoading] = useState(false)
  const [emails, setEmails] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deliveryMode, setDeliveryMode] = useState('')

  useEffect(() => {
    setLoading(true)
    let email = props.email
    email = email.split('@')
    setEmails(email[0])
    axios.get(`https://medi-o-der.firebaseio.com/${email[0]}/cart.json`)
      .then(resp => {
        console.log('resp.data', resp.data)
        let fetched = []
        for (let i in resp.data) {
          if (resp.data[i] === null) {
            continue
          }
          fetched.push({
            ...resp.data[i]
          })
        }
        setFetchedMeds(fetched)
        setLoading(false)
      })
      .catch(err => {
        alert(err)
        setLoading(false)
      })
  }, [])

  const removeFromCart = (val) => {
    axios.delete(`https://medi-o-der.firebaseio.com/${emails}/cart/${val.id}.json`)
      .then(resp => {
        let updated = fetchedMeds.filter(vals => vals.id != val.id)
        setFetchedMeds(updated)
      })
      .catch(err => alert(err))
  }

  const increment = (val) => {
    axios.patch(`https://medi-o-der.firebaseio.com/${emails}/cart/${val.id}.json`, {
      quantity: val.quantity + 1
    })
      .then(resp => {
        let updates = fetchedMeds.filter(vals => {
          if (vals.id === val.id) {
            vals.quantity = val.quantity + 1
            return vals
          } else {
            return vals
          }
        })
        setFetchedMeds(updates)
      })
      .catch(err => alert(err))
  }

  const decrement = (val) => {
    axios.patch(`https://medi-o-der.firebaseio.com/${emails}/cart/${val.id}.json`, {
      quantity: val.quantity > 1 ? val.quantity - 1 : 1
    })
      .then(resp => {
        let updates = fetchedMeds.filter(vals => {
          if (vals.id === val.id) {
            vals.quantity = vals.quantity > 1 ? val.quantity - 1 : 1
            return vals
          } else {
            return vals
          }
        })
        setFetchedMeds(updates)
      })
      .catch(err => alert(err))
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setDeliveryMode('');
  }

  const deliveryHandler = (option) => {
    setDeliveryMode(option)
  }

  const patchPrescription = (url) => {
    axios.post(`https://medi-o-der.firebaseio.com/${emails}/prescription.json`, {
      url: url
    })
      .then()
      .catch(err => alert(err))
  }


  return (
    <div className={classes.mainWrapper}>
      <div align='right'>
        {
          fetchedMeds.length > 0
            ?
            <Button
              onClick={toggleModal}
              variant='contained'
              color='primary'>Buy Now</Button>
            :
            null
        }

        <OrderSummary
          open={isModalOpen}
          close={() => toggleModal()}
          meds={fetchedMeds}
          email={props.email}
          delivery={deliveryHandler}
          mode={deliveryMode}
          email={emails}
          upload={patchPrescription} />
      </div>
      <Grid container spacing={4}>
        {
          loading ?
            <Spinner />
            :
            fetchedMeds.length > 0 ?
              fetchedMeds.map(val =>
                <Fragment key={val.id}>
                  <CartCard
                    photo={val.photo}
                    name={val.name}
                    price={val.price}
                    vendor={val.vendor}
                    medType={val.medType}
                    quantity={val.quantity}
                    remove={() => removeFromCart(val)}
                    increment={() => increment(val)}
                    decrement={() => decrement(val)}
                  />
                </Fragment>
              )
              : <h1>Add Products To Cart</h1>
        }
      </Grid>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    email: state.userDetails
  }
}

export default connect(mapStateToProps)(Cart)