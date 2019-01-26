import React from 'react'
import { Link } from 'react-router-dom'

import { ProductConsumer } from '../../context'

export default function CartSummary() {
  return (
    <ProductConsumer>
      {({ cartSubTotal, cartTax, cartTotal, clearCart }) => (
        <React.Fragment>
          <div className="container">
            <div className="row">
              <div className="col-10 mt-2 ml-sm-4 ml-md-auto col-sm-8 text-capitalize text-right">
                <Link to="/">
                  <button
                    className="btn btn-outline-danger text-uppercase mb-3 px-5"
                    onClick={clearCart}
                  >
                    clear cart
                  </button>
                </Link>
                <h5>
                  <span className="text-title">
                    subtotal: 
                  </span>
                  <strong>$ {cartSubTotal}</strong>
                </h5>
                <h5>
                  <span className="text-title">
                    tax: 
                  </span>
                  <strong>$ {cartTax}</strong>
                </h5>
                <h5>
                  <span className="text-title">
                    total: 
                  </span>
                  <strong>$ {cartTotal}</strong>
                </h5>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </ProductConsumer>
  )
}
