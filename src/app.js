const express = require ('express')
const path = require ('path')
const hbs = require('hbs') // hbs partials to create partial templates (i.e header / sidebar / footer)
const geocode = require ('./utils/geocode.js')
const forecast = require ('./utils/forecast.js')

const app = express()
//when we want to upload to heroku || 3000 means locally (default setting)
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//express and hbs set up the template (index.hbs)
//this is the routing set up
app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Irene K'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        name: 'Irene K'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        name: 'Irene K',
        message: 'This is the help page, hopefully you can find the solution'
    })
})

app.get('/weather', (req, res)=>{
    const location = req.query.address
    if (!location){
        return res.send({
            error: 'You must enter an address'
        })
    }
    geocode(location, (error, {latitude, longitude} = {})=>{
        if (error){
            return res.send({ error })
        } else {
            forecast( longitude, latitude, (error, data)=> {
                if (error) {
                    return res.send({error})
                } 
                res.send({
                    forecastData: data.forecastData,
                })
            })
        }
    })

})
app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: 'Error occurs!',
        message: 'Help article is not found!',
        name: 'Irene K'
    } )
})

app.get ('/products', (req, res)=>{
    if (!req.query.search){
        return res.send( {
            error: 'You must provide a search term'
        })}
    res.send({
        products :[]
    })

})
///////////404//////////////////////
//* means anything there is no match above
app.get('*', (req, res)=>{
    res.render('404', {
        title: 'Error occurs',
        message: 'Page is not found!',
        name: 'Irene K'
    })

})

//app listen only apply to locally run
// app.listen(3000, ()=> {
//     console.log('Server is up!')
// })

app.listen(port, ()=>{
    console.log('Server is now up on ' + port)
})