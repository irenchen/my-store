import React, { Component } from 'react'

import { storeProducts, detailProduct } from './data'

const ProductContext = React.createContext()
// Provider, Consumer

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
  }
  componentDidMount() {
    this.setProducts()
  }
  setProducts = () => {
    let products = []
    storeProducts.forEach(item => {
      const singleItem = {...item}
      products = [...products, singleItem]
    })
    this.setState({ products })
  }
  getItemById = id => this.state.products.find(p => p.id === id)
  handleDetail = id => {
    const product = this.getItemById(id)
    this.setState({ detailProduct: product })
  }
  addToCart = id => {
    let tempProducts = [...this.state.products]
    const index = tempProducts.indexOf(this.getItemById(id))
    const product = tempProducts[index]
    product.inCart = true
    product.count = 1
    const price = product.price
    product.total = price
    this.setState({ products: tempProducts, cart: [...this.state.cart, product] }, () => this.addTotals())
  }
  removeFromCart = id => {
    let tempCart = [...this.state.cart]
    tempCart = tempCart.filter(item => item.id !== id)

    let tempProducts = [...this.state.products]
    const index = tempProducts.indexOf(this.getItemById(id))
    const productToRemove = tempProducts[index]
    productToRemove.inCart = false
    productToRemove.count = 0
    productToRemove.total = 0

    this.setState({ products: tempProducts, cart: tempCart }, () => this.addTotals())
  }
  openModal = id => {
    const product = this.getItemById(id)
    this.setState({ modalProduct: product, modalOpen: true })
  }
  closeModal = () => this.setState({ modalOpen: false })
  increment = id => {
    let tempCart = [...this.state.cart]
    const selectedProduct = tempCart.find(item => item.id === id)
    const selectedIndex = tempCart.indexOf(selectedProduct)

    const product = tempCart[selectedIndex]
    product.count += 1
    product.total = product.count * product.price

    this.setState({ cart: [...tempCart] }, () => this.addTotals())
  }
  decrement = id => {
    let tempCart = [...this.state.cart]
    const selectedProduct = tempCart.find(item => item.id === id)
    const selectedIndex = tempCart.indexOf(selectedProduct)
    
    const product = tempCart[selectedIndex]
    product.count -= 1
    product.total = product.count * product.price

    if (product.count === 0) {
      this.removeFromCart(id)
    } else {
      this.setState({ cart: [...tempCart] }, () => this.addTotals())
    }
  }
  clearCart = () => {
    this.setState({ cart: [], cartSubTotal: 0, cartTax: 0, cartTotal: 0 }, () => {
      this.setProducts() // reset all products
    })
  }
  addTotals = () => {
    const subTotal = this.state.cart.reduce((acc, item) => acc + item.total, 0)
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2))
    const total = subTotal + tax
    this.setState({ cartSubTotal: subTotal, cartTax: tax, cartTotal: total })
  }
  render() {
    return (
      <ProductContext.Provider value={{
        ...this.state,
        handleDetail: this.handleDetail,
        addToCart: this.addToCart,
        removeFromCart: this.removeFromCart,
        openModal: this.openModal,
        closeModal: this.closeModal,
        increment: this.increment,
        decrement: this.decrement,
        clearCart: this.clearCart,
      }}>
        {this.props.children}
      </ProductContext.Provider>
    )
  }
}

const ProductConsumer = ProductContext.Consumer

export {
  ProductProvider, ProductConsumer
}
