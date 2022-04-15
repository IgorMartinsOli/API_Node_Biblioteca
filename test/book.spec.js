const app = require('../bin/www');

let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
const baseUrl = 'http://localhost:3000';

chai.use(chaiHttp);

let bookTest = {
    title: "usuario teste2",
    writer: "(64) 9300-1158",
    publicationDate: "123.897.338-01"
}

describe("Teste de livros na API", () => {
    it('Deve buscar todos os livros', (done) => {
        chai.request(baseUrl)
            .get('/livros/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('Deve apresentar erro 404', (done) => {
        chai.request(baseUrl)
            .get('/aaa/')
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
                done();
            });
    });

    it('Deve adicionar um novo livro', (done) => {
        chai.request(baseUrl)
            .post('/livros/')
            .send(bookTest)
            .end((req, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('book');
                bookTest._id = res.body.book._id;
                done();
            });
    });

    it('Nao deve adicionar um novo usuario /falta titulo', (done) => {
        chai.request(baseUrl)
            .post('/livros/')
            .send({ "writer": "Descrição", "publicationDate": "19/12/2000" })
            .end((req, res) => {
                expect(res).to.have.status(500);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
                done();
            });
    });

    it('Deve editar um usuario existente', (done) => {
        let bookEdit = {
            nome: "livro editado"
        }
        chai.request(baseUrl)
            .put('/livros/' + bookTest._id)
            .send(bookEdit)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('msg');
                done();
            });
    });

    /*
    it('Deve retornar um usuario existente e especifico', (done) => {
        chai.request(baseUrl)
        .get('/users/'+bookTest._id)
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object')
            expect(res.body.nome).to.equal('Usuario editado')
            done();
        });
    });*/

    it('Não deve retornar um usuario /ID não existe', (done) => {
        chai.request(baseUrl)
            .get('/livros/' + 12345648)
            .end((err, res) => {
                expect(res).to.have.status(500);
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('error');
                done();
            });
    });

    it("Deve remover um livro existente", (done) => {
        chai.request(baseUrl)
            .delete('/lirvos/' + bookTest._id)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.not.have.property('error')
                done();
            });
    });
});