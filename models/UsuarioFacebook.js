let mongoose = require('mongoose');
const usuariosFacebookCollection = 'usuariosFacebook';

const UsuarioFacebookEsquema = mongoose.Schema({
    facebookId: {type: String, require: true},
    picture: {type: String, require: true},
    email: {type: String, require: true},
    firstName: {type: String, require: true},
    lastName: {type: String, require: true}
});

module.exports = {
    UsuarioFacebookModelo: mongoose.model(usuariosFacebookCollection, UsuarioFacebookEsquema)
}