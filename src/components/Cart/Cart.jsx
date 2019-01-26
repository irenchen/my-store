import React, { Component } from 'react'

import { ProductConsumer } from '../../context'

import Title from '../Title'
import CartColumns from './CartColumns'
import EmptyCart from './EmptyCart'
import CartList from './CartList'
import CartSummary from './CartSummary'

export default class Cart extends Component {
  render() {
    return (
      <ProductConsumer>
        {({ cart }) => {
          if (!cart.length) {
            return <EmptyCart />
          }
          return (
            <React.Fragment>
              <Title name="your" title="cart" />
              <CartColumns />
              <CartList />
              <CartSummary history={this.props.history} />
            </React.Fragment>
          )
        }}
      
      </ProductConsumer>
    )
  }
}
