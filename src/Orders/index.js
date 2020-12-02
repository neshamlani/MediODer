import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import useStyles from './styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Divider from '@material-ui/core/Divider';

const Order = (props) => {
  const [orders, setOrders] = useState([]);
  const [amt, setAmt] = useState('')
  const [mode, setMode] = useState('')
  const [url, setUrl] = useState('')
  const [emails, setEmails] = useState('')
  useEffect(() => {
    let email = props.emails.split('@');
    setEmails(email[0])
    if (props.isSeller) {
      axios.get(`https://medi-o-der.firebaseio.com/orders.json`)
        .then(resp => {
          let data = [];
          for (let i in resp.data) {
            data.push({
              ...resp.data[i]
            })
          }
          console.log('data', data)
          setOrders(resp.data)
        })
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
  const travel = () => {
    let data = [];
    let consumer = {}
    for (let i in orders) {
      for (let j in orders[i]) {
        console.log('j', j)
        if (j === 'deliveryMode') {
          consumer = {
            deliveryMode: orders[i][j]
          }
          data.push(consumer)
          continue
        }
        if (j === 'price') {
          consumer = {
            totalPrice: orders[i][j]
          }
          data.push(consumer)
          continue
        }
        if (j === 'url') {
          consumer = {
            url: orders[i][j]
          }
          data.push(consumer)
          continue
        }
        if (emails !== orders[i][j].vendor) {
          continue
        }
        consumer = {
          name: orders[i][j].name,
          quantity: orders[i][j].quantity,
          price: orders[i][j].price,
          consumer: i,
        }
        data.push(consumer)
      }
    }
    console.log('data', data)
    return data.map(val => {
      if (val.name) {
        return (
          <TableRow>
            <TableCell>{val.name}</TableCell>
            <TableCell>{val.quantity}</TableCell>
            <TableCell>{val.consumer}</TableCell>
          </TableRow>
        )
      } else {
        if (val.deliveryMode) {
          return (
            <TableRow>
              <TableCell>Delivery Mode</TableCell>
              <TableCell></TableCell>
              <TableCell>{val.deliveryMode}</TableCell>
            </TableRow>
          )
        } else if (val.totalPrice) {
          return (
            <TableRow>
              <TableCell>Total Price</TableCell>
              <TableCell></TableCell>
              <TableCell>{val.totalPrice}</TableCell>
            </TableRow>
          )
        } else if (val.url) {
          return (
            <TableRow>
              <TableCell>Prescription</TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Button
                  color='primary'
                  variant='text'
                  href={val.url}
                  target='_blank'>
                  Prescription
                </Button>
              </TableCell>
            </TableRow>
          )
        }
      }
    })
  }
  const classes = useStyles();
  return (
    <div>
      {
        props.isSeller
          ?
          <div className={classes.ordersWrapper}>
            <h1>Today's Orders</h1>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Medicine Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Consumer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {travel()}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          :
          <div className={classes.mainWrapper}>
            <div className={classes.title}>Your Order</div>
            <div className={classes.detailsWrapper}>
              <div>Total Price: {amt}</div>
              <div>Delivery Mode: {mode}</div>
              <div>
                <Button
                  href={url}
                  variant='text'
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