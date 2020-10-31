import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import Grid from '@material-ui/core/Grid'
import CartCard from './CartCard'
import { connect } from 'react-redux'
import axios from 'axios'
import Spinner from '../Spinner'

const Cart = (props) => {
  const classes = useStyles()
  const [fetchedMeds, setFetchedMeds] = useState([])
  const [loading, setLoading] = useState(false)
  const [emails,setEmails]=useState('')

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
          if(resp.data[i]===null){
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
    .then(resp=>{
      //alert('removed')
      let updated=fetchedMeds.filter(vals=>vals.id!=val.id)
      setFetchedMeds(updated)
    })
    .catch(err=>alert(err))
  }

  const increment = (val) => {
    axios.patch(`https://medi-o-der.firebaseio.com/${emails}/cart/${val.id}.json`,{
      quantity:val.quantity+1
    })
    .then(resp=>{
      let updates=fetchedMeds.filter(vals=>{
        if(vals.id===val.id){
          vals.quantity=val.quantity+1
          return vals
        }else{
          return vals
        }
      })
      setFetchedMeds(updates)
    })
    .catch(err=>alert(err))
  }

  const decrement = (val) => {
    axios.patch(`https://medi-o-der.firebaseio.com/${emails}/cart/${val.id}.json`,{
      quantity:val.quantity>1?val.quantity-1:1
    })
    .then(resp=>{
      let updates=fetchedMeds.filter(vals=>{
        if(vals.id===val.id){
          vals.quantity=vals.quantity>1?val.quantity-1:1
          return vals
        }else{
          return vals
        }
      })
      setFetchedMeds(updates)
    })
    .catch(err=>alert(err))
  }

  return (
    <div className={classes.mainWrapper}>
      <Grid container spacing={4}>
        {
          loading ?
            <Spinner />            
            : 
            fetchedMeds.length > 0 ?
            fetchedMeds.map(val =>
              <CartCard
                photo={val.photo}
                name={val.name}
                price={val.price}
                vendor={val.vendor}
                medType={val.medType}
                quantity={val.quantity}
                remove={() => removeFromCart(val)}
                increment={() => increment(val)}
                decrement={() => decrement(val)} />
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