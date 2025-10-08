const express = require('express')
const axios = require('axios')
const app = express()

app.use(express.json())

app.all('*', async (req, res) => {
  try {
    const targetUrl = `https://example.com${req.originalUrl}`

    const response = await axios({
      method: req.method,
      url: targetUrl,
      headers: { ...req.headers, host: 'example.com' },
      data: req.body
    })

    res.status(response.status).send(response.data)
  } catch (err) {
    res.status(err.response?.status || 500).send(err.message)
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`))
