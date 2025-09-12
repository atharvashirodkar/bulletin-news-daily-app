import express from 'express'
import path from 'path'
import axios from 'axios'
import cors from 'cors'



const app = express()
const port = 8080

app.use(cors())

app.get('/api', async (req, res) => {
    console.log(`Received request with query: ${req._parsedUrl.query}`);
    let url = "https://newsapi.org/v2/everything?" + req._parsedUrl.query
    let r = await axios(url)
    let a = r.data
    res.json(a)
})

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname) })
    // res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`My app listening on port ${port}`)
})
