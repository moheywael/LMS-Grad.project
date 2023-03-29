const express = require("express")
const bodyParser = require("body-parser")
const ejs = require('ejs')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.set("view engine", "ejs")
app.set('views', 'src/views')



app.get("/", (req, res) => {
    res.render("main", { title: "Home" })
})

app.get("/home", (req, res) => {
    res.render("main", { title: "Home" })
})

// 404 page
app.use((req, res) => {
    res.status(404).render('pages/404', { page_title: '404' })
})

// Listening to the port
app.listen(port, () => {
    console.clear()
    console.log(`listening to port ${port}...`)
})