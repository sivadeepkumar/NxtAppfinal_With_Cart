import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAll = () => {
    this.setState({cartList: []})
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state

    const isInSideCart = cartList.find(each => each.id === product.id)

    if (isInSideCart) {
      this.setState(prev => ({
        cartList: prev.cartList.map(each => {
          if (each.id === product.id) {
            console.log(each, each.quantity)
            return {...each, quantity: product.quantity + each.quantity}
          }
          return each
        }),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }

    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = id => {
    this.setState(prev => ({
      cartList: prev.cartList.filter(each => each.id !== id),
    }))
  }

  minusButton = id => {
    const {cartList} = this.state
    const modcartList = cartList.map(each => {
      if (each.id === id) {
        const quantity = each.quantity - 1
        return {...each, quantity}
      }
      return each
    })

    const cart = cartList.find(each => each.id === id)

    if (cart.quantity <= 1) {
      this.removeCartItem(id)
    } else {
      this.setState({cartList: modcartList})
    }
  }

  plusButton = id => {
    const {cartList} = this.state
    const modcartList = cartList.map(each => {
      if (each.id === id) {
        const quantity = each.quantity + 1
        return {...each, quantity}
      }
      return each
    })
    this.setState({cartList: modcartList})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          minusButton: this.minusButton,
          plusButton: this.plusButton,
          removeAll: this.removeAll,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
