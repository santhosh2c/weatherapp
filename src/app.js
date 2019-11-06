const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
const patrialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(patrialsPath)

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Santhosh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Santhosh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Santhosh'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'add address'
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error){
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecast) => {
            if (error){
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecast,
                location: location,
                address: req.query.address
            })

      })
    })
})

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        title: 'Not Found page',
        name: 'Santhosh',
        error:'article not found'
    })
})

app.get('*', (req, res) => {
    res.render('notfound', {
        title: 'Not Found page',
        name: 'Santhosh',
        error:'404 page'
    })
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})