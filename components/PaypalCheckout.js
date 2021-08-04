import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useState } from 'react'

const options = {
  'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  currency: 'EUR',
  // intent: "capture", // capture is the default intent
}

const PaypalCheckout = ({ value, description }) => {
  const [capturedOrder, setCapturedOrder] = useState(null)
  const [createdOrder, setCreatedOrder] = useState(null)

  return (
    <PayPalScriptProvider options={options}>
      {capturedOrder && (
        <div className="text-success fs-4">
          the order was paid. <br />
          <div className="text-warning fs-5">
            <small>(stub) from api</small> → order status: PAID+PROCESSING{' '}
            <button>refresh status 🔄</button>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-around">
        <div className="card">
          createdOrder: <pre>{JSON.stringify(createdOrder, null, 2)}</pre>
        </div>
        <div className="card">
          capturedOrder: <pre>{JSON.stringify(capturedOrder, null, 2)}</pre>
        </div>
      </div>

      {!capturedOrder && (
        <PayPalButtons
          // style={{ layout: 'horizontal' }} // change the styles and visibility of buttons
          //
          // The createOrder parameter sets up the details of the transaction.
          // It's called when the buyer clicks the PayPal button, which launches the PayPal Checkout window
          // where the buyer logs in and approves the transaction on the paypal.com website.
          // Because this is a client-side call, PayPal calls the Orders API on your behalf,
          // so you don't need to provide the headers and body.
          createOrder={(data, actions) => {
            // actions.order — exposes the create action for creating the order.
            return actions.order
              .create({
                // actions.order.create options:
                // intent — The intent to either capture the payment immediately or authorize a payment for an order after order creation. The values are:
                //   CAPTURE — Default
                //   AUTHORIZE — The merchant intends to authorize a payment and place funds on hold after the customer makes a payment.
                // payer — The customer who approves and pays for the order. The customer is also known as the payer and buyer.
                // purchase_units — Required. An array of purchase units. Each purchase unit establishes a contract between a payer and the payee
                purchase_units: [
                  {
                    description,
                    amount: {
                      value,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // just to debug the orderId...
                setCreatedOrder(orderId)
                return orderId
              })
          }}
          // onApprove
          // Captures the funds from the transaction and shows a message to the buyer to let them know the transaction is successful.
          // The method is called after the buyer approves the transaction on paypal.com.
          // Because this is a client-side call, PayPal calls the Orders API on your behalf, so you don't need to provide the headers and body.
          onApprove={async (data, actions) => {
            const capturedOrder = await actions.order.capture()
            setCapturedOrder(capturedOrder)
          }}
        />
      )}
    </PayPalScriptProvider>
  )
}

export default PaypalCheckout
