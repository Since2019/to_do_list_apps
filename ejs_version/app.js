// import necessary libraries
const express = require('express');
var bodyParser = require('body-parser');
var app = express();

// configurations
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');                           // uses ejs

// constants:
PORT = 4567;
BOOL_DEBUG = true;


//======== API endpoints ==========================================================================

app.get('/', (req, res) => res.render('pages/index'));   // renders the root page with ejs.

app.get('/myForm', (req, res) => res.render('pages/myForm'));  //

// splits todo items by comma and renders on the "/views/pages/result.ejs"
app.post('/myForm', (req, res) => {
  let todolist = JSON.stringify(req.body.todolist);
  todolist = req.body.todolist.split(',');
  console.log(typeof todolist);
  res.render('pages/result', {
    todolist: todolist,
  });
});


// 用req.query来传值
// starting with '?', then split by '&'  eg:

// - example #1:
// ?order=desc&shoe[color]=blue&shoe[type]=converse 

// - example #2:
// ?order=desc&test1=haha&test2=yoyo
app.get('/myListQueryString', (req, res) => {
  console.log(req.query);
  let todolist = Object.values(req.query);

  BOOL_DEBUG && console.log('req.query:')
  BOOL_DEBUG && console.log(req.query)

  res.render('pages/result', {
    todolist: todolist,
  });
});

// 用params传值
// passes in the data using params, eg:

// - example #1:
// /1.sleep/2.eat/3.drink/4.work
app.get('/myList/*', (req, res) => {

  let todolist = req.params['0'].split('/');
  //   let todolist = req.params;
  res.render('pages/result', {
    todolist: todolist,
  });
});



// ^^^ API ENDPOINTS ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

app.listen(PORT);

console.log(`The server is running at PORT: ${PORT}`)