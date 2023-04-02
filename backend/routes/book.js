const express = require ('express');
const router = express.Router(); 
const bookCtrl = require('../controllers/book')

router.put('/:id', bookCtrl.modifyThing);
router.post('/', bookCtrl.createThing ); 
router.delete('/:id', bookCtrl.deleteThing);
router.get('/:id', bookCtrl.getOneThing);
router.get('/', bookCtrl.getAllThings);


module.exports = router;