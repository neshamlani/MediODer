import React from 'react'
import useStyles from './styles'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import CartCard from './CartCard'

const Cart = (props) => {
  const classes = useStyles()
  console.log('props.items', props.items)

  const removeFromCart = (val) => {
    console.log('val.name', val.name)
    props.removeFromCart(val.name)
  }

  const increment=(val)=>{
    props.incrmentQuantity(val)
  }

  const decrement =(val)=>{
    props.decrementQuantity(val)
  }

  return (
    <div className={classes.mainWrapper}>
      <Grid container spacing={4}>
        {
          props.items.length>0?
          props.items.map(val =>
            <CartCard
              photo={val.photo}
              name={val.name}
              price={val.price}
              vendor={val.vendor}
              medType={val.medType}
              quantity={val.quantity}
              remove={() => removeFromCart(val)} 
              increment={()=>increment(val)}
              decrement={()=>decrement(val)}/>
          )
          :<h1>Add Products To Cart</h1>
        }
      </Grid>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    items: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: (item) => dispatch({ type: 'REMOVE_FROM_CART', value: item }),
    incrmentQuantity:(item)=>dispatch({type:'INCREMENT_QUANTITY',value:item}),
    decrementQuantity:(item)=>dispatch({type:'DECREMENT_QUANTITY',value:item})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)