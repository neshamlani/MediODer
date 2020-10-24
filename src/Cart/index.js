import React from 'react'
import useStyles from './styles'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'

const Cart = (props) => {
  const classes = useStyles()
  console.log('props.items', props.items)

  return (
    <div className={classes.mainWrapper}>
      <Grid container spacing={4}>
        {
          props.items.map(val =>
            <Grid item xs={12} sm={12} md={6}>
              <Card>
                <div className={classes.cardWrapper}>
                  <div className={classes.imgWrapper}>
                    <img src={val.photo} alt='Image' className={classes.imgs} />
                  </div>
                  <div className={classes.detailsWrapper}>
                    <div className={classes.leftWrapper}>
                      <div>{val.name}</div>
                      <div>{val.price}</div>
                      <div>{val.medType}</div>
                      <div>{val.vendor}</div>
                    </div>
                    <div>
                      Add-Delete
                    </div>
                    <div>
                      Buy Now
                    </div>
                  </div>
                </div>
              </Card>
            </Grid>
          )
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
export default connect(mapStateToProps)(Cart)