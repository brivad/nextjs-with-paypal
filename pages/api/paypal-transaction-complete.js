const handler = (req, res) => {
  const { orderID, authorizationID } = req.body

  console.log('{ orderID, authorizationID} :>> ', { orderID, authorizationID })

  // you will probably want to use the authorizationID to capture the order, depending on the logic/flows of your app

  res.json({ orderID, status: 'PENDING' })
}

export default handler
