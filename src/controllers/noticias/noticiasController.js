const NoticiasServices = require('../../services/noticias/noticiasServices');

const imagem = [];
const arquivo = [];
const arquivoEng = [];

const arrayEdicaoImagem = [];
const arrayEdicaoArquivo = [];
const arrayEdicaoArquivoEng = [];

class NoticiasController {
    static async retornaNoticias(req, res) {
        const sql = `SELECT * from intranet_noticias WHERE ativo = 1`;
        await NoticiasServices.buscaNoticias(res, sql);
    }

    static cadastraImagemNoticia(req, res) {
        imagem[0] = req.files;

        if (!req.files || req.files.length === 0) {
            res.status(500).send('Arquivos não recebidos!');
        } else {
            res.status(201).json('Arquivos processados com sucesso!');
        }
    }

    static cadastraArquivoNoticia(req, res) {
        arquivo[0] = req.files;

        if (!req.files || req.files.length === 0) {
            res.status(500).send('Arquivos não recebidos!');
        } else {
            res.status(201).json('Arquivos processados com sucesso!');
        }
    }

    static cadastraArquivoEngNoticia(req, res) {
        arquivoEng[0] = req.files;

        if (!req.files || req.files.length === 0) {
            res.status(500).send('Arquivos não recebidos!');
        } else {
            res.status(201).json('Arquivos processados com sucesso!');
        }
    }

    static async cadastraNoticia(req, res) {
        const objNoticia = req.body.objNoticia;

        const novoLocalImagemCadastraNoticia = imagem[0] && imagem[0].length > 0 
            ? `/img/noticias/${imagem[0][0].filename}`
            : objNoticia.imagemNoticia;

        const novoLocalArquivoCadastroNoticia = arquivo[0] && arquivo[0].length > 0 
            ? `http://192.168.4.121/compartilhamento/procedimentos/noticias/${arquivo[0][0].filename}`
            : objNoticia.arquivoPortugues;

        const novoLocalArquivoEngCadastroNoticia = arquivoEng[0] && arquivoEng[0].length > 0 
            ? `http://192.168.4.121/compartilhamento/procedimentos/noticias/${arquivoEng[0][0].filename}`
            : '';

        objNoticia.imagemNoticia = novoLocalImagemCadastraNoticia;
        objNoticia.arquivoPortugues = novoLocalArquivoCadastroNoticia;
        objNoticia.arquivoIngles = novoLocalArquivoEngCadastroNoticia;

        const sql = `INSERT INTO intranet_noticias SET ?`;
        await NoticiasServices.insereNoticias(res, objNoticia, sql);
    }

    static editaImagensNoticias(req, res) {
        arrayEdicaoImagem[0] = req.files;
        res.status(201).json({ message: 'Imagens processadas com sucesso!' });
    }

    static editaArquivoNoticias(req, res) {
        arrayEdicaoArquivo[0] = req.files;
        res.status(201).json({ message: 'Arquivos processados com sucesso!' });
    }

    static editaArquivoEngNoticias(req, res) {
        arrayEdicaoArquivoEng[0] = req.files;
        res.status(201).json({ message: 'Arquivos processados com sucesso!' });
    }

    static async editarNoticias(req, res) {
        const objEdicaoNoticia = req.body.objInputEditaProcedimento;

        const novoLocalImagem = arrayEdicaoImagem[0] && arrayEdicaoImagem[0].length > 0
            ? `/img/noticias/${arrayEdicaoImagem[0][0].filename}`
            : objEdicaoNoticia.imagemNoticia;

        const novoLocalArquivo = arrayEdicaoArquivo[0] && arrayEdicaoArquivo[0].length > 0
            ? `http://192.168.4.121/compartilhamento/procedimentos/noticias/${arrayEdicaoArquivo[0][0].filename}`
            : objEdicaoNoticia.arquivoPortugues;

        const novoLocalArquivoEng = arrayEdicaoArquivoEng[0] && arrayEdicaoArquivoEng[0].length > 0
            ? `http://192.168.4.121/compartilhamento/procedimentos/noticias/${arrayEdicaoArquivoEng[0][0].filename}`
            : objEdicaoNoticia.arquivoIngles;

        objEdicaoNoticia.imagemNoticia = novoLocalImagem;
        objEdicaoNoticia.arquivoPortugues = novoLocalArquivo;
        objEdicaoNoticia.arquivoIngles = novoLocalArquivoEng;

        const sql = `
         UPDATE intranet_noticias SET 
            departamento = '${objEdicaoNoticia.departamento}', 
            tagSetor = '${objEdicaoNoticia.tagSetor}', 
            textoDepartamento = '${objEdicaoNoticia.textoDepartamento}', 
            imagemNoticia = '${objEdicaoNoticia.imagemNoticia}',
            altImagem = '${objEdicaoNoticia.altImagem}',
            tituloIngles = '${objEdicaoNoticia.tituloIngles}',
            arquivoIngles = '${objEdicaoNoticia.arquivoIngles}',
            tituloPortugues = '${objEdicaoNoticia.tituloPortugues}',
            arquivoPortugues = '${objEdicaoNoticia.arquivoPortugues}',
            ativo = '${objEdicaoNoticia.ativo}',
            dataPublicacao = '${objEdicaoNoticia.dataPublicacao}',
            textoNoticiaIngles = '${objEdicaoNoticia.textoNoticiaIngles}',
            textoNoticiaPortugues = '${objEdicaoNoticia.textoNoticiaPortugues}'
         WHERE idnoticias = ${objEdicaoNoticia.idnoticias}`;

        await NoticiasServices.editaNoticias(res, sql, objEdicaoNoticia);
    }

    static async desabilitaNoticias(req, res) {
        const idnoticias = req.body.objDesativado;
        const sql = `UPDATE intranet_noticias SET ativo = 0 WHERE idnoticias = ${idnoticias}`;
        await NoticiasServices.desabilitaNoticias(res, sql);
    }
}

module.exports = NoticiasController;
