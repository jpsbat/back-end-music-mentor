const { Router } = require("express");
const mysql = require('mysql2');

const router = Router();

const conn = mysql.createConnection({
    host: 'localhost',
    database: 'dbapiescola',
    user: 'root',
    password: ''
});

router.get('/listar', function (req, res) {

    try {

        conn.execute(
            `SELECT 
                aluno.id,
                aluno.nome_aluno "aluno",
                aluno.nascimento "nascimento",
                aluno.instrumento "instrumento",
                prof.nome_professor AS professor
            FROM
                aluno
            LEFT JOIN
                professor AS prof ON prof.id = aluno.id_professor;`, function (err, response, fields) {
    
            if (err) throw err;

            response.forEach(function(aluno) {
                aluno.nascimento = aluno.nascimento.toISOString().split('T')[0];
            });

            res.status(200).json({
                msg: 'Sucesso na listagem de alunos!',
                data: response
            });
        });
        
    } catch (error) {
        
        res.status(200).json({
            msg: 'Erro ao listar alunos!',
            data: error
        });
    }
});

router.get('/:id', function (req, res) {

    try {

        conn.execute(
            `SELECT 
                aluno.id,
                aluno.nome_aluno "aluno",
                aluno.nascimento "nascimento",
                aluno.instrumento "instrumento",
                prof.nome_professor AS professor
            FROM
                aluno
            LEFT JOIN
                professor AS prof ON prof.id = aluno.id_professor
            WHERE aluno.id = ?;`,
            [req.params.id], function (err, response, fields) {
    
            if (err) throw err;

            response.forEach(function(aluno) {
                aluno.nascimento = aluno.nascimento.toISOString().split('T')[0];
            });

            res.status(200).json({
                msg: 'Sucesso na consulta do aluno!',
                data: response[0]
            });
        });
        
    } catch (error) {
        
        res.status(200).json({
            msg: 'Erro ao consultar aluno!',
            data: error
        });
    }
});

router.post('/cadastrar', function (req, res) {

    try {

        conn.execute('INSERT INTO aluno (nome_aluno, nascimento, instrumento, id_professor) VALUES (?, ?, ?, ?);',
        [req.body.nome_aluno, req.body.nascimento, req.body.instrumento, req.body.id_professor],
        function (err, response, fields) {

            if (err) throw err;
    
            res.status(200).json({
                msg: 'Aluno cadastrado com sucesso!',
                data: response
            });
        });
        
    } catch (error) {
        
        res.status(500).json({
            msg: 'Erro ao cadastrar aluno!',
            data: error
        });
    }
});

router.patch('/alterar/:id', function (req, res) {

    try {

        conn.execute('UPDATE aluno SET nome_aluno = ?, nascimento = ?, instrumento = ?, id_professor = ? WHERE id = ?;',
        [req.body.nome_aluno, req.body.nascimento, req.body.instrumento, req.body.id_professor, req.params.id],
        function (err, response, fields) {

            if (err) throw err;
    
            res.status(200).json({
                msg: 'Aluno atualizado com sucesso!',
                data: response
            });
        });
        
    } catch (error) {
        
        res.status(500).json({
            msg: 'Erro ao atualizar aluno!',
            data: error
        });
    }
});

router.delete('/excluir/:id', function (req, res) {

    try {

        conn.execute('DELETE FROM aluno WHERE id = ?;', [req.params.id], function (err, response, fields) {

            if (err) throw err;
    
            res.status(200).json({
                msg: 'Aluno excluído com sucesso!',
                data: response
            });
        });
        
    } catch (error) {
        
        res.status(500).json({
            msg: 'Erro ao excluir aluno!',
            data: error
        });
    }
});

module.exports = router;