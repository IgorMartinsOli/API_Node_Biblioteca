const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    nome: {
        type: String,
        required: true
    },

    cpf: {
        type: String,
        required: [true, 'O CPF é obrigatorio!'],
        unique: true,
        match: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
    },

    telefone: {
        type: String,
        required: false,
        defaul: '',
        validate: {
            validator: function (valor) {
                return /^\([1-9]{2}\) 9?(?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}|()$/.test(valor);
            },
            message: props => `${props.value} não é um telefone valido`
        }
    }
});

module.exports = mongoose.model('User', userSchema);