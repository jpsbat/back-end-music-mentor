const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({origin: "*"}));

const professores = require('./routes/professor');
app.use('/routes/professores', professores);

const alunos = require('./routes/aluno');
app.use('/routes/alunos', alunos);

module.exports = app;