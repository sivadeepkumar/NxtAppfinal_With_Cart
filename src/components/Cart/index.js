import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import CartSummary from '../CartSummary'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAll} = value
      const showEmptyView = cartList.length === 0

      let totalvalue = cartList.map(each => {
        const {quantity, price} = each
        const total = quantity * price
        return total
      })

      const p = cartList.map(each => {
        const {price} = each
        return price
      })

      totalvalue = totalvalue.reduce((acc, val) => acc + val, 0)

      // TODO: Update the functionality to remove all the items in the cart
      const count = cartList.length

      const emptyCart = () => {
        removeAll()
      }

      const renderEmptyAll = () => (
        <div className="remove-all">
          <button type="button" onClick={emptyCart}>
            Remove All
          </button>
        </div>
      )

      return (
        <>
          <Header />

          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                {renderEmptyAll()}
                <CartListView />
                <CartSummary count={count} price={p} totalvalue={totalvalue} />
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
