import React from 'react';
import useStyles from './styles';
import Modal from '@material-ui/core/Modal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import StripeCheckout from '../../Stripe'

const OrderSummary = (props) => {
  const classes = useStyles();
  let totalPrice = 0;

  return (
    <Modal
      open={props.open}
      onClose={props.close}>
      <div className={classes.modalwrapper}>
        <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>Order Summary</div>
        <TableContainer className={classes.tableWrapper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price(In Rs.)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                props.meds.map(val => {
                  let mrp = val.price.match(/\d+/g)
                  mrp = Number(mrp[0])
                  mrp = mrp * val.quantity
                  totalPrice = totalPrice + mrp
                  return (
                    <TableRow key={val.id}>
                      <TableCell>{val.name}</TableCell>
                      <TableCell>{val.quantity}</TableCell>
                      <TableCell>{mrp}</TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.priceWrapper}>
          <div>Total Price: {totalPrice}</div>
          <div>
            {/* <Button
              variant='contained'
              color='primary'>Place Order</Button> */}

            <StripeCheckout price={totalPrice} />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default OrderSummary