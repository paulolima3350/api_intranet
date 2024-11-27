const sharp = require('sharp');
const md5 = require('md5');
const fs = require('fs');
const path = require('path');
const conexao = require('../BD/config');

const retornaProcedimentosProducao = (res, sql) => {
    conexao.acquire(function(err,con){
        if(err) console.timeLog(err);
        con.query(sql, function(err, result) {
            con.release();
            try {

                console.log(result)

                res.status(200).json(result);
  
            } catch (error) {
                console.log(error);

                res.status(500).send({ message: `Não foi possível retornar os procedimentos! ${err}`}) ;
                throw new Error(`Não foi possível retornar os procedimentos! ${err}`);
            }

        });
    });

}

const retornaProcedimentosDesenvolvimento = (res, sql) => {
    conexao.query(sql, function(err, result) {
        try {

            console.log(result)

            res.status(200).json(result);
  
        } catch (error) {
                console.log(error);

            res.status(500).send({ message: `Não foi possível retornar os procedimentos! ${err}`}) ;
            throw new Error(`Não foi possível retornar os procedimentos! ${err}`);
        }

    });

}

const validaUsuarioProducao = (res, sql) => {

    conexao.acquire(function(err,con){
        if(err) console.timeLog(err);
        con.query(sql, function(err, result) {
            con.release();

            const retorno = [];

            try {
                
                retorno[0] = result;
                res.status(200).json(retorno[0]);

            } catch (error) {
                console.log(error);

                res.status(500).send({ message: `Erro de autenticação! ${err}`}) ;
                throw new Error(`Erro de autenticação! ${err}`);
            }
        });
    });

}

const validaUsuarioDesenvolvimento = (res, sql) => {

    conexao.query(sql, function(err, result) {

        const retorno = [];

        try {
            console.log(result);
              
            retorno[0] = result;
            res.status(200).json(retorno[0]);

        } catch (error) {
            console.log(error);

            res.status(500).send({ message: `Erro de autenticação! ${err}`}) ;
            throw new Error(`Erro de autenticação! ${err}`);
        }
    });

}

class IntranetDAO {

    static retornarProcedimentos(req, res) {

        const sql = `SELECT * FROM intranet_procedures`;

        process.env.NODE_ENV === 'production'
            ? retornaProcedimentosProducao(res, sql)
            : retornaProcedimentosDesenvolvimento(res, sql);

    }

    static validaUsuario(req, res) {

        const usuario = req.body.userLogin;
        const senha = md5(req.body.userSenha);

        /*const sql = `SELECT u.idusuario, u.matricula, u.Tipo,u.Purchasing_ID,u.nomeusuario, u.AttemptLogin, u.senha, 
            u.date_last_change_pass, u.primeiroacesso, s.idsistema, uca.id_perfil_sistema, unidades.idunidade, 
            unidades.unidade, departamentos.nomedepartamento, (SELECT valor FROM constantes WHERE nome = 60) 
            AS limitDaySamePassword FROM sistemas s INNER JOIN usuarios u INNER JOIN usuario_controle_acesso uca ON s.idsistema = 
            uca.id_sistema AND uca.id_usuario = u.idusuario INNER JOIN unidades ON u.id_site = unidades.idunidade INNER JOIN 
            departamentos ON u.id_departamento = departamentos.iddepartamento WHERE s.idsistema = 29 AND matricula = ${usuario} AND (uca.id_perfil_sistema = 83 OR uca.id_perfil_sistema = 82);`*/

        const sql = `SELECT * FROM usuarios WHERE matricula = ${usuario} AND senha = '${senha}' AND ativo = 1`;

        process.env.NODE_ENV === 'production'
            ? validaUsuarioProducao(res, sql)
            : validaUsuarioDesenvolvimento(res, sql);

    }

    static cadastraProcedimento(req, res) {


        res.json({ info: 'Procedimentos Recebidos' });

    }


    static cadastraDadosProcedimento(req, res) {

        const objInputProcedimento = req.body.objInputProcedimento;

        const diretorioArquivos = `${'../../temp'}`;
        const diretorioDestinoImagens = `${'../../public/imagens'}`;
        const diretorioDestinoArquivos = `${'../../public/procedimentos'}`;

        const localAtualImagem = path.resolve(__dirname, diretorioArquivos, `${objInputProcedimento.imagem}`);

        const localAtualArquivo = path.resolve(__dirname, diretorioArquivos, `${objInputProcedimento.arquivo}`);

        //const localAtualArquivoEng = path.resolve(__dirname, diretorioArquivos, `${objInputProcedimento.arquivoEng}`);

        const localImg = path.resolve(__dirname, diretorioDestinoImagens, `${objInputProcedimento.imagem}`);

        const localArquivo = path.resolve(__dirname, diretorioDestinoArquivos, `${objInputProcedimento.arquivo}`);

        {/*const localArquivoEng = path.resolve(__dirname, '../', '../', '../', 'dev_intranet_2023', 'intranet_2023-dev', 'public', 'procedimentos_eng', `${objInputProcedimento.arquivoEng}`);*/}


        const novoLocalImagem = `${diretorioDestinoImagens}/${objInputProcedimento.imagem}`;
        const novoLocalArquivo = `${diretorioDestinoArquivos}/${objInputProcedimento.arquivo}`;
        {/*const novoLocalArquivoEng = `/procedimentos_eng/${objInputProcedimento.arquivoEng}`;*/}

        const imagemTratada = sharp()
                                .resize(322, 300)
                                .png();
                               

        try {

            fs.createReadStream(localAtualImagem)
            .pipe(imagemTratada)
            .pipe(fs.createWriteStream(localImg))
            .on('finish', ()=> console.log('Arquivo gerado criada!'));
            
            fs.createReadStream(localAtualArquivo)
            .pipe(fs.createWriteStream(localArquivo))
            .on('finish', ()=> console.log('Arquivo gerado criada!'));

           {/*} fs.createReadStream(localAtualArquivoEng)
            .pipe(fs.createWriteStream(localArquivoEng))
        .on('finish', ()=> console.log('Arquivo gerado criada!'));*/}


            objInputProcedimento.imagem = novoLocalImagem;
            objInputProcedimento.arquivo = novoLocalArquivo;
           // objInputProcedimento.arquivoEng = novoLocalArquivoEng;

            
            const sql = `INSERT INTO intranet_procedures SET ?`;

            conexao.acquire(function(err,con){
                if(err) console.timeLog(err);
                con.query(sql, objInputProcedimento, function(err, result) {
                    con.release();
                    if(err) {

                        console.log(err);

                    } else {

                        console.log(result);

                    }

                });
            });

        } catch (error) {
            console.log(error);
        }

    }

}
module.exports = IntranetDAO;