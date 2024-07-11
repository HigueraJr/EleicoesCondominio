const express = require('express');
const db = require('./db'); 

const app = express();


app.use(express.json());


app.post('./candidatos', (req, res) => {
    const { nome, cpf, endereco } = req.body; 
    const sql = 'INSERT INTO candidatos (NOME, CPF, ENDEREÇO) VALUES (?, ?, ?)';
    db.query(sql, [nome, cpf, endereco], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send(`Candidato adicionado com ID: ${result.insertId}`);
    });
});


app.get('/candidatos', (req, res) => {
    const sql = 'SELECT * FROM candidatos';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});


app.get('/candidatos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM candidatos WHERE ID = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length === 0) {
            return res.status(404).send('Candidato não encontrado');
        }
        res.json(result[0]);
    });
});


app.put('/candidatos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, cpf, endereco } = req.body;  // Ajuste os nomes para corresponder ao formulário
    const sql = 'UPDATE candidatos SET NOME = ?, CPF = ?, ENDEREÇO = ? WHERE ID = ?';
    db.query(sql, [nome, cpf, endereco, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Candidato não encontrado');
        }
        res.send('Candidato atualizado com sucesso');
    });
});


app.delete('/candidatos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM candidatos WHERE ID = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Candidato não encontrado');
        }
        res.send('Candidato deletado com sucesso');
    });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

