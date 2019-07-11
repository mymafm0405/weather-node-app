const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const chalk = require('chalk')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

//Define path for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mahmoud Yhya'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mahmoud Yhya'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'You are welcome to ask me any question!',
        title: 'Help page',
        name: 'Mahmoud Yhya'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({
                error: error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        error: 'Help article not found!',
        name: 'Mahmoud Yhya'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        error: 'Page not found!',
        name: 'Mahmoud Yhya'
    })
})

app.listen(3000, () => {
    console.log('Express is running')
})