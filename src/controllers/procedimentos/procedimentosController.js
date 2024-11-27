const ProcedimentosService = require('../../services/procedimentos/procedimentosService');

const arrayImagem = [];
const arrayArquivo = [];
const arrayArquivoEng = [];

const arrayEdicaoImagem = [];
const arrayEdicaoArquivo = [];
const arrayEdicaoArquivoEng = [];

class ProcedimentosController {
    static async retornaProcedimentos(req, res) {
        console.log("to aqui")

        const sql = `SELECT * FROM intranet_procedures WHERE ativo = 1`;

        await ProcedimentosService.buscaProcedimentos(res, sql);

    }

    static cadastraImagensProcedimentos(req, res) {

        arrayImagem[0] = req.files;

        if(req.files.length === 0) {
            res.status(500).send({ message: 'Imagens não recebidas!' });
        } else {
            res.status(201).json({ message: 'Imagens processadas com sucesso!' });
        }
    }

    static cadastraArquivoProcedimentos(req, res) {

        arrayArquivo[0] = req.files;

        if(req.files.length === 0) {
            res.status(500).send({ message: 'Arquivos não recebidas!' });
        } else {
            res.status(201).json({ message: 'Arquivos processadas com sucesso!' });
        }
    }

    static cadastraArquivoEngProcedimentos(req, res) {

        arrayArquivoEng[0] = req.files;

        res.status(201).json({ message: 'Arquivos processados com sucesso!' });
        
    }

    static async cadastraProcedimentos(req, res) {

       const objInputProcedimento = req.body.objInputProcedimento;

       let novoLocalImagemCadatrarProcedimento = arrayImagem[0]
                                    .length === 0? 
                                        `${objInputProcedimento.imagem}`
                                        :`/img/img_procedimentos/${arrayImagem[0][0].filename}`;


        let novoLocalArquivoCadatrarProcedimento = arrayArquivo[0]
                                    .length === 0? 
                                        `${objInputProcedimento.arquivo}`
                                        :`/procedimentos/${arrayArquivo[0][0].filename}`;

        let novoLocalArquivoEngCadatrarProcedimento = arrayArquivoEng[0]
                                    .length === 0? 
                                        ``
                                        :`/procedimentos/${arrayArquivoEng[0][0].filename}`;

        objInputProcedimento.imagem = novoLocalImagemCadatrarProcedimento;
        objInputProcedimento.arquivo = novoLocalArquivoCadatrarProcedimento;
        objInputProcedimento.arquivoENG = novoLocalArquivoEngCadatrarProcedimento;

        const sql = `INSERT INTO intranet_procedures SET ?`;

        await ProcedimentosService.insereProcedimentos(res, objInputProcedimento, sql);

    }

    static editaImagensProcedimentos(req, res) {

        arrayEdicaoImagem[0] = req.files;
        
        res.status(201).json({ message: 'Imagens processadas com sucesso!' });

    }
    

    static editaArquivoProcedimentos(req, res) {

        arrayEdicaoArquivo[0] = req.files;

        res.status(201).json({ message: 'Arquivos processados com sucesso!' });
        
    }

    static editaArquivoEngProcedimentos(req, res) {

        arrayEdicaoArquivoEng[0] = req.files;

        console.log(arrayEdicaoArquivoEng[0])

        res.status(201).json({ message: 'Arquivos processados com sucesso!' });
        
    }

    static async editarProcedimentos(req, res) {

        const objEdicaoProcedimento = req.body.objInputEditaProcedimento;

        console.log(objEdicaoProcedimento);
		
        let novoLocalImagem = arrayEdicaoImagem[0]
                                    .length === 0? 
                                        `${objEdicaoProcedimento.imagem}`
                                        :`/img/img_procedimentos/${arrayEdicaoImagem[0][0].filename}`;


        let novoLocalArquivo = arrayEdicaoArquivo[0]
                                    .length === 0? 
                                        `${objEdicaoProcedimento.arquivo}`
                                        :`/procedimentos/${arrayEdicaoArquivo[0][0].filename}`;

        let novoLocalArquivoEng = arrayEdicaoArquivoEng[0]
                                    .length === 0? 
                                        `${objEdicaoProcedimento.arquivoENG}`
                                        :`/procedimentos/${arrayEdicaoArquivoEng[0][0].filename}`;
 
         objEdicaoProcedimento.imagem = novoLocalImagem;
         objEdicaoProcedimento.arquivo = novoLocalArquivo;
         objEdicaoProcedimento.arquivoENG = novoLocalArquivoEng;

         const sql = `
         UPDATE intranet_procedures SET 
            departamento = ${objEdicaoProcedimento.departamento}, 
            tag = '${objEdicaoProcedimento.tag}', 
            tagENG = '${objEdicaoProcedimento.tagENG}', 
            titulo = '${objEdicaoProcedimento.titulo}',
            tituloENG = '${objEdicaoProcedimento.tituloENG}',
            descricao = '${objEdicaoProcedimento.descricao}',
            descricaoENG = '${objEdicaoProcedimento.descricaoENG}',
            datapublicacao = '${objEdicaoProcedimento.datapublicacao}',
            imagem = '${objEdicaoProcedimento.imagem}',
            arquivo = '${objEdicaoProcedimento.arquivo}',
            arquivoENG = '${objEdicaoProcedimento.arquivoENG}',
            acesso = '${objEdicaoProcedimento.acesso}'
         WHERE idprocedimentos = ${objEdicaoProcedimento.idprocedimentos}`;
 
         await ProcedimentosService.editaProcedimentos(res, sql, objEdicaoProcedimento);
 
     }

     static async desabilitaProcedimentos(req, res) {

        const idprocedimentos = req.body.objDesativado;

        const sql = `UPDATE intranet_procedures SET ativo = 0 WHERE idprocedimentos = ${idprocedimentos}`;

        await ProcedimentosService.desabilitaProcedimentos(res, sql);

    }
} 
module.exports = ProcedimentosController;