import { getUserInfo, setPayment } from "../localStroage"
import CheckoutSteps from "../component/CheckoutSteps"

const PaymentScreen = {
  after_render: () => {
    document.querySelector('#payment-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault()
        const paymentMethod = document.querySelector('input[name = "payment-method"]:checked').value

        setPayment({
          paymentMethod,
        })
        document.location.hash = '/placeorder'
      })
  },
  render: () => {
    const { name } = getUserInfo()
    if (!name) {
      document.location.hash = '/'
    }
    return (`
    ${CheckoutSteps.render({ step1: true, step2: true, step3: true })} 
<div class = "form-container">
  <form id = "payment-form">
    <ul class = "form-items">
      <li>
        <h1>Payment </h1>
      </li> 
     <li>
      <div>
        <input type = 'radio' name = 'payment-method' id = 'cash-on-delivery' value = 'Cash on Delivery' >
        <label for = 'cash-on-delivery'>Cash on Delivery</label>
      </div>
     </li>
     <li>
      <div>
        <input type = 'radio' name = 'payment-method' id = 'cash-on-delivery' value = 'stripe' >
        <label for = 'cash-on-delivery'>Stripe</label>
      </div>
     </li>
      <li>
        <button type = "submit" class="primary">Continue </button>
      </li>  
  
    </ul>
  </form>
</div>
`)

  }
}


export default PaymentScreen