const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { settings } = require('cluster')
const app =express()

const port = process.env.PORT || 8080
const staticPath = path.join(__dirname,'../public/')
const viewsPath = path.join(__dirname,'../templates/views/')
const partialPath = path.join(__dirname,'../templates/partials/')

// setting up 
app.set('view engine','hbs')
app.use(express.static(staticPath))
hbs.registerPartials(partialPath)
app.set('views',viewsPath)


// Routing 
app.get('',(req,res)=>{
    res.render('index')
})

app.get('/about',(req,res)=>{
    res.render('about')
})

app.get('/weather',(req,res)=>{
    res.render('weather')
})

app.get('*',(req,res)=>{
    res.render('404error')
})

app.listen(port,()=>{
    console.log(`listening to port ${port}`)
})