const express = require('express');
const router = express.Router();
const mysql = require('../connect/mysql').pool;

/* Get TODOS OS DADOS ENCONTRADOS SEM FILTRO POR PARAMETRO */
router.get('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if(error) {return res.status(500).send({error: error})}

        conn.query(
            'SELECT * FROM contatosTb;',
            (error, result, fields) => {
                conn.release();
                if(error) {return res.status(500).send({error: error})}

                const response = {
                    quantidade: result.length,
                    contato: result.map(prod => {

                        return {
                            id: prod.id,
                            setor: prod.setor,
                            posicao: prod.posicao,
                            nomeFuncionario: prod.nomeFuncionario,
                            userLinkTelegram: prod.userLinkTelegram,
                            usuárioLinkWhatsaap: prod.usuárioLinkWhatsaap,
                            númeroDeContatoAtual: prod.númeroDeContatoAtual,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes de um produto',
                                url: 'http://localhost:3000/atendimentos/' + prod.id
                            }
                        }

                    })
                }
                return res.status(200).json(response)
            }
        )
    })
});

/* Get RETORNA DOS OS DADOS ENCONTRADOS COM O PARAMETRO PASSADO NA URL */
router.get('/setor/:setor', (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if(error) {return res.status(500).send({error: error})}

        conn.query(
            'SELECT * FROM contatosTb WHERE setor = ?;',
            [req.params.setor],
            (error, result, fields) => {
                conn.release();
                if(error) {return res.status(500).send({error: error})}
                
                if(result.length == 0){
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado nenhum produto com esse id'
                    })
                }

                const response = {
                    contato: result.map(prod => {

                        return {
                            id: prod.id,
                            setor: prod.setor,
                            posicao: prod.posicao,
                            nomeFuncionario: prod.nomeFuncionario,
                            userLinkTelegram: prod.userLinkTelegram,
                            usuárioLinkWhatsaap: prod.usuárioLinkWhatsaap,
                            númeroDeContatoAtual: prod.númeroDeContatoAtual,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes de um produto',
                                url: 'http://localhost:3000/atendimentos/' + prod.id
                            }
                        }

                    })
                }
                return res.status(200).json(response)
            }
        )
    })
});

/* Get SOMENTE DE UM DADO RETORNADO PELO SEU ID */
router.get('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if(error) {return res.status(500).send({error: error})}

        conn.query(
            'SELECT * FROM contatosTb WHERE id = ?;',
            [req.params.id],
            (error, result, fields) => {
                conn.release();
                if(error) {return res.status(500).send({error: error})}
                
                if(result.length == 0){
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado nenhum produto com esse id'
                    })
                }

                const response = {
                    produto: {
                        id: result[0].id,
                        setor: result[0].setor,
                        posicao: result[0].posicao,
                        nomeFuncionario: result[0].nomeFuncionario,
                        usuarioLinkTelegram: result[0].usuarioLinkTelegram,
                        usuarioLinkWhatsaap: result[0].usuarioLinkWhatsaap,
                        numeroDeContatoAtual: result[0].numeroDeContatoAtual,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna um produto',
                            url: 'http://localhost:3000/atendimentos'
                        }

                    }
                }
                return res.status(200).json(response)
            }
        )
    })
});

module.exports = router;