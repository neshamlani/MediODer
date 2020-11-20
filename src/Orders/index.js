import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import useStyles from './styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card'

const Order = (props) => {
  const [orders, setOrders] = useState([]);
  const [amt, setAmt] = useState('')
  const [mode, setMode] = useState('')
  const [url, setUrl] = useState('')
  useEffect(() => {
    let email = props.emails.split('@');
    if (props.isSeller) {
      axios.get(`https://medi-o-der.firebaseio.com/orders.json`)
        .then(resp => console.log('resp', resp))
        .catch(err => alert(err))
    }
    else {
      axios.get(`https://medi-o-der.firebaseio.com/orders/${email[0]}.json`)
        .then(resp => {
          let data = []
          for (let i in resp.data) {
            if (i === null) {
              continue
            }
            if (i === 'url') {
              setUrl(resp.data[i])
              continue
            }
            if (i === 'price') {
              setAmt(resp.data[i])
              continue
            }
            if (i === 'deliveryMode') {
              setMode(resp.data[i])
              continue
            }
            data.push({
              ...resp.data[i]
            })
          }
          setOrders(data)
        })
        .catch(err => alert(err))
    }
  }, []);

  console.log('orders', orders)

  const classes = useStyles();
  return (
    <div>
      {
        props.isSeller
          ?
          null
          :
          <div className={classes.mainWrapper}>
            <div className={classes.title}>Your Order</div>
            <div className={classes.detailsWrapper}>
              <div>Total Price: {amt}</div>
              <div>Delivery Mode: {mode}</div>
              <div>
                <Button
                  href={url}
                  variant='contained'
                  color='primary'
                  target='_blank'
                >
                  Prescription
                </Button>
              </div>
            </div>
            <div className={classes.cardWrapper}>
              {
                orders.map(val =>
                  <Card style={{ marginLeft: 10, padding: 20 }}>
                    <img src={val.photo} width='200px' height='200px' />
                    <div>Name: {val.name}</div>
                    <div>Price: {val.price}</div>
                    <div>Quantity: {val.quantity}</div>
                    <div>Vendor{val.vendor}</div>
                  </Card>
                )
              }
            </div>
          </div>
      }
    </div>

  )
};

const mapStateToProps = state => {
  return {
    isSeller: state.isSeller,
    emails: state.userDetails
  }
};

export default connect(mapStateToProps)(Order);