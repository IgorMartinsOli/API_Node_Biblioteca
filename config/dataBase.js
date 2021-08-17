let mongoose = require('mongoose');

module.exports = function () {
    let url = process.env.DB || 'mongodb://localhost:27017/SistemaBiblioteca';
    let options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 10
    }

    mongoose.connect(url, options);

    mongoose.connection.once('open', () => {
        console.log('[Mongoose] conectado em: ' + url);
    });

    mongoose.connection.on('error', (error) => {
        console.log('[Mongoose] Erro na conexão: ' + error);
    });
}