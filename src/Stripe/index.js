import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Button from '@material-ui/core/Button';
import { loadStripe } from '@stripe/stripe-js';


const Checkout = (props) => {
  const key = "pk_test_51HktAnAL8iTBehj4geteQl83gouuOhpPaCT4m8SQV5H8iYdG55JQphXOtYARXNQ4pz4i4zOUxMeyvobTKq9vJ9th00BKc2YVFo"
  const stripePromise = loadStripe('pk_test_51HktAnAL8iTBehj4geteQl83gouuOhpPaCT4m8SQV5H8iYdG55JQphXOtYARXNQ4pz4i4zOUxMeyvobTKq9vJ9th00BKc2YVFo')

  const onToken = () => {
    alert('token')
  }

  return (
    <StripeCheckout
      stripeKey={key}
      token={onToken}
      //label='Pay Now'
      description={`Your Total Amount is: ${props.price}`}
      amount={props.price * 100}
      email={props.email}
      panelLabel='Pay Now'
      currency='INR' >

      <Button
        variant='contained'
        color='primary'
        disabled={props.mode ? false : true && props.img ? false : true}
      >
        Pay Now
        </Button>
    </StripeCheckout>

  )
}

export default Checkout