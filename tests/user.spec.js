const app = require('../bin/www');

let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
const baseUrl = 'http://localhost:3000';

chai.use(chaiHttp);

let userTest = {
    nome: "usuario teste2",
    telefone: "(64) 9300-1158",
    cpf: "123.897.338-01"
}

describe("Teste de usuarios na API", () => {
    it('Deve buscar todos os usuarios', (done) =>{
        chai.request(baseUrl)
        .get('/users/')
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
        });
    });

    it('Deve apresentar erro 404', (done) =>{
        chai.request(baseUrl)
        .get('/aaa/')
        .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('error');
            done();
        });
    });

    it('Deve adicionar um novo usuario', (done) =>{
        chai.request(baseUrl)
        .post('/users/')
        .send(userTest)
        .end((req, res) =>{
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('user');
            userTest._id = res.body.user._id;
            done();
        });
    });

    it('Nao deve adicionar um novo usuario /falta cpf', (done) =>{
        chai.request(baseUrl)
        .post('/users/')
        .send({"nome":"usuario", "telefone":"(34) 3333-3333"})
        .end((req, res) =>{
            expect(res).to.have.status(500);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('error');
            done();
        });
    });

    it('Deve editar um usuario existente', (done) =>{
        let userEdit = {
            nome: "Usuario editado"
        }
        chai.request(baseUrl)
        .put('/users/'+userTest._id)
        .send(userEdit)
        .end((err, res) =>{
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('msg');
            done();
        });
    });

    /*
    it('Deve retornar um usuario existente e especifico', (done) => {
        chai.request(baseUrl)
        .get('/users/'+userTest._id)
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object')
            expect(res.body.nome).to.equal('Usuario editado')
            done();
        });
    });*/

    it('Não deve retornar um usuario /ID não existe', (done) => {
        chai.request(baseUrl)
        .get('/users/'+12345648)
        .end((err, res) => {
            expect(res).to.have.status(500);
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('error');
            done();
        });
    });

    it("Deve remover um usuario existente", (done) =>{
        chai.request(baseUrl)
        .delete('/users/'+userTest._id)
        .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.not.have.property('error')
            done();
        });
    });
});