import Head from 'next/head'
import { useState } from 'react'
import PaypalCheckout from '../components/PaypalCheckout'
import PaypalCheckoutAuthorize from '../components/PaypalCheckoutAuthorize'

const cart = {
  id: '123',
  items: [
    { id: 1, description: 'a shiny product', price: 1000, qty: 1 },
    { id: 2, description: 'a shitty product', price: 500, qty: 2 },
  ],
  get totalCents() {
    return this.items.reduce((a, i) => a + i.price * i.qty, 0)
  },
  get total() {
    return (this.totalCents / 100).toFixed(2)
  },
}

export default function Home() {
  const [intent, setIntent] = useState('capture')

  return (
    <div className="container">
      <Head>
        <title>Paypal Integration</title>

        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        ></link>
      </Head>

      <h2>cart:</h2>
      <small className="card">
        <pre>{JSON.stringify(cart, null, 2)}</pre>
      </small>

      <h3>cart total: {cart.total}</h3>

      <hr />

      <div className="fs-2">
        Paypal Checkout Intent:{' '}
        <select value={intent} onChange={(e) => setIntent(e.target.value)}>
          <option value="capture">capture</option>
          <option value="authorize">authorize</option>
        </select>
      </div>

      {/* {intent === 'capture' && <PaypalCheckout cart={cart} />} */}
      {/* {intent === 'authorize' && <PaypalCheckoutAuthorize cart={cart} />} */}

      {intent === 'capture' && (
        <PaypalCheckout
          value={cart.total}
          description={`cart id: ${cart.id} (${cart.items.length} items)`}
        />
      )}
      {intent === 'authorize' && (
        <PaypalCheckoutAuthorize
          value={cart.total}
          description={`cart id: ${cart.id} (${cart.items.length} items)`}
        />
      )}
    </div>
  )
}
