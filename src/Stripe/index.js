import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const Checkout = (props) => {
  const key = 'pk_test_51HktAnAL8iTBehj4geteQl83gouuOhpPaCT4m8SQV5H8iYdG55JQphXOtYARXNQ4pz4i4zOUxMeyvobTKq9vJ9th00BKc2YVFo'
  return (
    <StripeCheckout
      label='Pay Now'
      description={`Your Total Amount is: ${props.price}`}
      amount={props.price*100}
      stripeKey={key}
      panelLabel='Pay Now'
      currency='inr'
    />
  )
}

export default Checkout