import React, { Component } from 'react'
import Title from './Title'
import Product from './Product'

import { ProductConsumer } from '../context'

export default class ProductList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <Title name="our" title="products" />
          </div>

          <div className="row px-2 ml-2">
            {/* <div className="col-6 mx-auto text-center"> */}
            <ProductConsumer>
              {({ products, handleDetail, addToCart }) => {
                return products.map(product => {
                  return <Product key={product.id} product={product} />
                })
              }}
            </ProductConsumer>
            {/* </div> */}
          </div>
        </div>
      </React.Fragment>
    )
  }
}
