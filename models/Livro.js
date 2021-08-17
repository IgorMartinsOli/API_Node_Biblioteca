const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Titulo obrigatorio!']
    },
    writer: {
        type: String,
        validator: function (value){
            return /^$/.test(value);
        },
        message: props => `${props.value} não é um nome suportado!`
    },

    publicationDate:{
        type: String,
    },
});

module.exports = mongoose.model('Livro', bookSchema);