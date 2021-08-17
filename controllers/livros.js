let Book = require('../models/Livro');

module.exports = {
    //buscar livros
    getAllBooks: (req, res, next) => {
        Book.find()
            .then(books => {
                return res.status(200).json(books);
            }).catch(error => {
                return res.status(500).json({ msg: "Erro ao buscar livros", error: error.message });
            });
    },

    //buscar livro por id
    getBookById: async (req, res, next) => {
        let idBook = req.params.id;

        try {
            let book = await Book.findById(idBook)
            return res.status(200).json({ book });
        } catch (error) {
            return res.status(500).json({ msg: "Erro ao buscar livro", error: error.message });
        }
    },

    //adicionar livro
    addBook: async (req, res, next) => {
        let newBook = new Book();

        newBook.title = req.body.title;
        newBook.writer = req.body.writer;
        newBook.publicationDate =  req.body.publicationDate ? req.body.publicationDate : '';

        try {
            let savedBook = await newBook.save();
            return res.status(201).json({ msg: "Livro adicionado com sucesso", book: savedBook });
        } catch (error) {
            return res.status(500).json({ msg: "Erro ao salvar livro", error: error.message });
        }
    },

    //atualizar um livro
    updateBook: async (req, res, next) => {
        let idBook = req.params.id;
        let bookUpdate = {};

        if (req.body.title) { bookUpdate.title = req.body.title };
        if (req.body.writer) bookUpdate.writer = req.body.writer;
        if (req.body.publicationDate) bookUpdate.publicationDate = req.body.publicationDate;

        try {
            await Book.updateOne({ _id: idBook }, bookUpdate)
            return res.status(200).json({ msg: "Livro atualizado com sucesso" });
        } catch (error) {
            res.status(500).json({ msg: "Erro ao atualizar livro", error: error.message });
        }
    },

    //deletar um livro
    deleteBook: (req, res, next) => {
        let idBook = req.params.id;

        Book.findByIdAndDelete(idBook)
            .then(bookDeleted => {
                res.status(200).json({ msg: "Livro removido com sucesso", book: bookDeleted });
            }).catch(error => {
                res.status(500).json({ msg: "Erro ao remover livro", error: error.message });
            })
    }
}