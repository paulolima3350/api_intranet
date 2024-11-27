const multer = require('multer');
const multerConfig = require('../config/multer');

const procedimentosDAO = require('../DAO/IntranetDAO');

const router = require('express').Router();

router
    .get('/procedimentos',procedimentosDAO.retornarProcedimentos)

router
    .post('/users', procedimentosDAO.validaUsuario)
    .post('/uploads', multer(multerConfig).array('file'), procedimentosDAO.cadastraProcedimento)
    .post('/dadosProcedimentos', procedimentosDAO.cadastraDadosProcedimento)
    

module.exports = router;