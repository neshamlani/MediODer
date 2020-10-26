import React from 'react'
import useStyles from '../styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'

const CartCard = (props) => {
  const classes = useStyles()
  return (
    <Grid item xs={12} sm={12} md={12}>
      <Card>
        <div className={classes.cardWrapper}>
          <div className={classes.imgWrapper}>
            <img src={props.photo} alt='Image' className={classes.imgs} />
          </div>
          <div className={classes.detailsWrapper}>
            <div className={classes.leftWrapper}>
              <div><span className={classes.spanText}>Name: </span> {props.name}</div>
              <div><span className={classes.spanText}>Price: </span> {props.price}</div>
              <div><span className={classes.spanText}>Used for: </span> {props.medType}</div>
              <div><span className={classes.spanText}>Seller: </span> {props.vendor}</div>
            </div>
            <div>
              <div><span className={classes.spanText}>Quantity: </span> {props.quantity}</div>

            </div>
            <div className={classes.btnWrapper}>
              <Button
                onClick={props.remove}
                variant='contained'
                className={classes.btn}
                color='primary'>Remove</Button>

              <Button
                //onClick={props.remove}
                variant='contained'
                className={classes.btn}
                color='primary'>Buy Now</Button>
            </div>
          </div>
        </div>
      </Card>
    </Grid>
  )
}

export default CartCard