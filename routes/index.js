const express = require('express')
const router = express.Router() 
//added another object to the data.json containing bio/contact info
const { projects, bio } = require('../data/data.json') 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { projects, bio }) 
}) 

/* GET project page. */
router.get('/projects/:id', function(req, res, next) {
  const projectId = req.params.id;
  const project = projects.find( ({ id }) => id === +projectId );
  
  if (project) {
    res.render('project', { project, bio })
  } else {
    const error = new Error("Page not found!");
    error.status = 404;
    next(error) 
  }
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { projects, bio })
});

/* 500 error tests */

// router.use((req, res, next) => {
//   console.log('this is a 500 error tests')
//   const err = new Error(' this is a 500 error tests ')
//   err.status = 500;
//   next(err)
// })

/* Catches any non existing urls. sets them as 404 errors, and sends it to the next middleware. */
router.use((req, res, next) => {
  const error = new Error("Page not found!");
  error.status = 404;
  next(error) 
}) 

//An error handling middleware
router.use(function (err, req, res, next) {
  res.locals.error = err;
  console.log(err);
  if(err.status === 404) {
    res.status(404)
    res.render('page-not-found')
  }else if (err.status === 500){
    res.status(500)
    res.render('error')
  }
})

module.exports = router;
