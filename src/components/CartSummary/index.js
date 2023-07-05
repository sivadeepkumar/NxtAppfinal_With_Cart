import './index.css'

const CartSummary = props => {
  const {count, totalvalue} = props

  return (
    <div className="total-value">
      <h1>Order Total : {totalvalue}/-</h1>
      <p>{count} Items in cart</p>
      <div className="checkout-cont">
        <button type="button" className="checkout-btn">
          Checkout
        </button>
      </div>
    </div>
  )
}

export default CartSummary
