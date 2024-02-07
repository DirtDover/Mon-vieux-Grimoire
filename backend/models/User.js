// Schema en ce qui concerne les user de l'app.

const mongoose = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email : {type: String, required: true, unique: true},
    password: {type: String, required: true}
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);

// uniqueValidator rajoute une sécurité et vérifie que le champ est bien unique dans la bdd