let User = require('../models/User');

module.exports = {
    //buscar todos usuarios
    getAllUsers: (req, res, next) => {
        User.find()
            .then(users => {
                return res.status(200).json(users);
            }).catch(error => {
                return res.status(500).json({ msg: "Erro ao buscar usuarios", error: error.message });
            });
    },
    getUserById: async (req, res, next) => {
        let idUser = req.params.id;

        try {
            let user = await User.findById(idUser) //User.find({_id: idUser})
            if(user != null){
                return res.status(200).json(user);
            }else{
                return res.status(500).json({ msg: "Usuario não existe", error: error.message });
            }
        } catch (error) {
            return res.status(500).json({ msg: "Erro ao buscar usuario", error: error.message });
        }
    },

    addUser: async (req, res, next) => {
        let newUser = new User();

        newUser.nome = req.body.nome;
        newUser.cpf = req.body.cpf;
        newUser.telefone = req.body.cpf ? req.body.telefone : '';

        //promises
        /*          newUser.save().then(savedUser => {
                     return res.status(201).json({msg: "Usuario adicionado com sucesso", user: savedUser});
                 }).catch(error => {
                     return res.status(500).json({msg: "Erro ao salvar usuario", error: error.message});
                 }); */

        //async await
        try {
            let savedUser = await newUser.save();
            return res.status(201).json({ msg: "Usuario adicionado com sucesso", user: savedUser });
        } catch (error) {
            return res.status(500).json({ msg: "Erro ao salvar usuario", error: error.message });
        }

    },

    updateUser: async (req, res, next) => {
        let idUser = req.params.id;

        let userUpdate = {};
        if (req.body.nome) {userUpdate.nome = req.body.nome};
        if (req.body.cpf) userUpdate.cpf = req.body.cpf;
        if (req.body.telefone) userUpdate.telefone = req.body.telefone;

        try {
            await User.updateOne({_id: idUser}, userUpdate)
            return res.status(200).json({ msg: "Usuario atualizado com sucesso"});
        } catch (error) {
            res.status(500).json({ msg: "Erro ao atualizar usuario", error: error.message});
        }
    },

    deleteUser: (req, res, next) => {
        let idUser = req.params.id;

        //User.deleteOne({_id: idUser});
        User.findByIdAndDelete(idUser)
            .then(userDeleted => {
                res.status(200).json({ msg: "Usuario removido com sucesso", user: userDeleted });
            }).catch(error => {
                res.status(500).json({ msg: "Erro ao remover usuario", error: error.message });
            })

    }
}