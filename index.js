const express = require('express')
const path = require('path')
const fileUpload = require('express-fileupload')
const fileRoutes = require('./routes/file.routes')
const sequelize = require('./utils/database')
const app = express()
const port = process.env.PORT || '3000'

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(fileUpload({ debug: true }))

app.use('/api/file', fileRoutes)

// noinspection JSUnusedLocalSymbols
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

async function start() {
  try {
    // noinspection JSUnresolvedFunction
    await sequelize.sync()
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
    })
  } catch (e) {
    console.log(e)
  }
}

// noinspection JSIgnoredPromiseFromCall
start()
