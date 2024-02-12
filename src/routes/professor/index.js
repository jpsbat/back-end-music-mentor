const { Router } = require("express");
const mysql = require('mysql2');

const router = Router();

const conn = mysql.createConnection({
    host: 'localhost',
    database: 'dbapiescola',
    user: 'root',
    password: 'JPsn360SBX!'
});

router.get('/listar', function (req, res) {

    try {

        conn.execute('SELECT * FROM professor;', function (err, response, fields) {

            if (err) throw err;
    
            res.status(200).json({
                msg: 'Sucesso na listagem de professores!',
                data: response
            });
        });
        
    } catch (error) {
        
        res.status(200).json({
            msg: 'Erro ao listar professores!',
            data: error
        });
    }
});

router.get('/:id', function (req, res) {

    try {

        conn.execute(
            `SELECT * FROM professor WHERE id = ?;`, [req.params.id], function (err, response, fields) {
    
            if (err) throw err;

            res.status(200).json({
                msg: 'Sucesso na consulta do funcionário!',
                data: response[0]
            });
        });
        
    } catch (error) {
        
        res.status(200).json({
            msg: 'Erro ao consultar funcionário!',
            data: error
        });
    }
});


router.post('/cadastrar', function (req, res) {

    try {

        conn.execute('INSERT INTO PROFESSOR (NOME_PROFESSOR, NASCIMENTO, FACULDADE) VALUES (?, ?, ?);',
        [req.body.nome_professor, req.body.nascimento, req.body.faculdade],
        function (err, response, fields) {

            if (err) throw err;
    
            res.status(200).json({
                msg: 'Professor cadastrado com sucesso!',
                data: response
            });
        });
        
    } catch (error) {
        
        res.status(500).json({
            msg: 'Erro ao cadastrar professor!',
            data: error
        });
    }
});

router.patch('/alterar/:id', function (req, res) {

    try {

        conn.execute('UPDATE PROFESSOR SET NOME_PROFESSOR = ?, NASCIMENTO = ?, FACULDADE = ? WHERE ID = ?;',
        [req.body.nome_professor, req.body.nascimento, req.body.faculdade, req.params.id],
        function (err, response, fields) {

            if (err) throw err;
    
            res.status(200).json({
                msg: 'Professor atualizado com sucesso!',
                data: response
            });
        });
        
    } catch (error) {
        
        res.status(500).json({
            msg: 'Erro ao atualizar professor!',
            data: error
        });
    }
});

router.delete('/excluir/:id', function (req, res) {

    try {

        conn.execute('DELETE FROM PROFESSOR WHERE id = ?;', [req.params.id], function (err, response, fields) {

            if (err) throw err;
    
            res.status(200).json({
                msg: 'Professor excluído com sucesso!',
                data: response
            });
        });
        
    } catch (error) {
        
        res.status(500).json({
            msg: 'Erro ao excluir professor!',
            data: error
        });
    }
});


module.exports = router;