const express = require ('express');
const router = express.Router(); 
const bookCtrl = require('../controllers/book')
const auth = require('../middleware/auth')


router.put('/:id',auth, bookCtrl.modifyThing);
router.post('/',auth, bookCtrl.createThing ); 
router.delete('/:id',auth, bookCtrl.deleteThing);
router.get('/:id', bookCtrl.getOneThing);
router.get('/', bookCtrl.getAllThings);


module.exports = router;