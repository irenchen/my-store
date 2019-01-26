import React from 'react'

import { ProductConsumer } from '../../context'
import CartItem from './CartItem'

export default function CartList() {
  return (
    <ProductConsumer>
      {(ctx) => (
        <div className="container-fluid">
        {ctx.cart.map(item => (
          <CartItem key={item.id} item={item} ctx={ctx} />
        ))}
        </div>
      )}
    </ProductConsumer>
  )
}
