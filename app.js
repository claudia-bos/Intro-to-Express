import express from 'express'
import lodash from "lodash";
import morgan from "morgan";
import nunjucks from "nunjucks";
import path from "path";
import url from "url";

// The project root directory
const rootDir = url.fileURLToPath(new URL(".", import.meta.url));

// define our "app" variable
const app = express()

// Configure the Express app
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

// endpoints/routes

// "home" === "/" -> the main page for localhost:8000

app.get('/', (req, res) => {
    res.render('home.html')
})

//Endpoint for /form to serve up  form.html
app.get('/form', (req, res) => {
    res.render('form.html')
})

// forms should submit to a different route than the one which renders the form itself

app.get('/welcome', (req, res) => {
    // to grab the query string as a JS 
    // object, use 'req.query'
    // When a <form> is submitted with a GET request 
    // (default), its contents are sent via a query string.
    // req.query keys will be the "name" attribute values of each <input>
    // console.log(req.query)
    const person = req.query.person
    const favNumber = req.query.favNumber

    res.send(`Hello, ${person}, I see that your favorite number is ${favNumber}`)

})

// endpoint to receive favorite food form submission
app.post('/food', (req, res) => {
    // to grab a form data from a POST request , we need to "req.body"

    const favFood = req.body.favFood
    res.send(`Your favorite food ${favFood}, has been secretly saved to the database.`)
})

// endpoint to receive favorite color from form submission
app.post('/user/:username', (req, res) => {
//   a POST to user
  const username = req.params.username
  const favColor = req.body.favColor
  res.send(`Hello ${username}, ${favColor} is my favorite color too!`)

})
// endpoint to render bridge.html
app.get('/bridge', (req, res) => {
    res.render('bridge.html')
})
// endpoint to receive bridge.html form submission and send the user to the "other-side"
app.post('/other-side', (req, res) => {

     //Using 'destructuring'
    // const {name, quest, color} = req.body

    const name = req.body.name
    const quest = req.body.quest
    const color =req.body.color

    // console.log(name, quest, color)

    res.render('other-side.html', {
        user: name, 
        userQuest: quest,
        userColor: color
    })
})
const COMPLIMENTS = [
    "awesome",
    "terrific",
    "fantastic",
    "neato",
    "fantabulous",
    "wowza",
    "brilliant",
    "ducky",
    "coolio",
    "incredible",
    "wonderful",
    "smashing",
    "lovely",
  ];
  app.get('/compliments', (req, res) => {
    // rendering compliments.html also passing to it a variable 
    // ,'compliments whose value is the value of COMPLIMENTS
    res.render('compliments.html', {
        compliments: COMPLIMENTS
    })
  })

const sayHello = (req, res) => {
    res.send('Hello world!')
}
app.get('/hello', sayHello)



// server route methods (.get()/.post()/...)accept 2 paraeters:
// ('/endpoints', handlerFunction)
// the handler function will know to accept 2 parameters of its own:
// handlerFunction (req, res) 'req & res are convention
// req = the request object generated by the user/client/ browser
// res = the response object generated by express

//run the server
app.listen('8000',() => {
    console.log('My very first server is running at http://localhost:8000')
})




