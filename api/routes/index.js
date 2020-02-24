var express = require('express');
var router = express.Router();
// +2
const ObjectID = require('mongodb').ObjectID; // ObjectID ObjectId
// get all appointment
router.get('/appointments', (req, res, next) => {
  req.collection.find({})
    .toArray()
    .then(result => res.json(result))
    .catch(error => res.send(error));
  })
// handel creation of new appointment
router.post('/appointments', (req, res, next) => {
  const { appointmentDate, name, email } = req.body;
  console.log(req.body);
  if(!appointmentDate || !name || !email) {
      return res.status(400).json({
        message: 'Appointment date, name and email are required'
      })

  }
  // now we constricted the pay load as object
  const payload = { appointmentDate, name, email };
  req.collection.insert(payload)
    .then(result => res.json(result.ops))
    .catch(error => res.send(error)); 
}) 

// handel delete appointment
router.delete('/appointments/:id', (req, res, next) => {
  const { id } = req.params;
  console.log('req.params: ' + req.params.id);
  const _id = ObjectID(id); // convert this to mongodb object id 

  req.collection.deleteOne({_id})
    .then(result => res.send(result)) // we will send that back will will not do any thing with that with angular
    .catch(error => res.json(error)) 
})
// +2
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
