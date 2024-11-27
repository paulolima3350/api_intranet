const md5 = require('md5'); // Importa a biblioteca md5 para hash de senhas.
const conexao = require('../BD/config'); // Importa a configuração do banco de dados principal.
const ConnectionTbscorp = require('../BD/config02'); // Importa a configuração para o segundo banco de dados.

const jwt = require('jsonwebtoken'); // Importa o JSON Web Token para autenticação baseada em tokens.

var sessao; // Declara uma variável para armazenar a sessão.

const usuariosProducao = (req, res, sql) => {
    conexao.acquire(function(err, con) { // Obtém uma conexão do pool.
        if (err) console.timeLog(err); // Loga erros ao adquirir a conexão.
        con.query(sql, function(err, result) { // Executa a consulta SQL.
            con.release(); // Libera a conexão.
            if (err || result.length === 0) {
                res.status(400).send({ mensagem: 'Erro de autenticação!' }); // Retorna erro se a consulta falhar.
            } else {
                let user = result[0]; // Obtém o primeiro usuário retornado.
                let tempoValidadeToken = 1000 * 60 * 30; // Define a validade do token (30 minutos).
                let token = {};

                if (user.idperfilusuario === 1 || user.idperfilusuario === 2 || user.idperfilusuario === 86) {
                    token = jwt.sign({ payload: user }, process.env.CHAVE_JWT, { expiresIn: tempoValidadeToken }); // Cria um token JWT se o perfil for permitido.
                } else {
                    token = ''; // Caso contrário, o token será vazio.
                }

                const idsessao = result[0].idusuario;
                sessao = req.session; // Define a sessão do usuário.
                sessao.userid = idsessao; // Armazena o ID do usuário na sessão.
                sessao.save();

                res.cookie('intranet_user_token', token); // Define o cookie com o token.

                res.status(200).json({ token, user, tempoValidadeToken }); // Retorna o token e os dados do usuário.
            }
        });
    });
};

const usuariosDesenvolvimento = (req, res, sql) => {
    conexao.query(sql, function(err, result) { // Executa a consulta diretamente no banco de dados.
        const retorno = [];
        retorno[0] = result;

        const idsessao = result[0].idusuario;
        sessao = req.session; // Define a sessão do usuário.
        sessao.userid = idsessao;

        res.status(200).json({ user: retorno[0], session: sessao }); // Retorna os dados do usuário e a sessão.
    });
};

const retornaUsuarioDesenvolvimento = (res, sql) => {
    conexao.query(sql, function(err, result) { // Executa a consulta diretamente no banco de dados.
        const retorno = [];
        try {
            retorno[0] = result;
            res.status(200).json(retorno[0]); // Retorna o resultado.
        } catch (error) {
            res.status(500).send({ message: `Erro ao retornar o usuário! ${err}` }); // Trata erros.
            throw new Error(`Erro ao retornar o usuário! ${err}`);
        }
    });
};

const retornaUsuarioProducao = (res, sql) => {
    conexao.acquire(function(err, con) { // Obtém uma conexão do pool.
        if (err) console.timeLog(err);
        con.query(sql, function(err, result) {
            con.release();
            const retorno = [];
            try {
                retorno[0] = result;
                res.status(200).json(retorno[0]); // Retorna o resultado.
            } catch (error) {
                res.status(400).send({ message: `Erro ao retornar o usuário! ${err}` });
                throw new Error(`Erro ao retornar o usuário! ${err}`);
            }
        });
    });
};

const retornaSchoolBudgetsDesenvolvimento = (res, sql) => {
    conexao.query(sql, function(err, result) {
        const retorno = [];
        try {
            retorno[0] = result;
            res.status(200).json(retorno[0]); // Retorna os budgets.
        } catch (error) {
            res.status(500).send({ message: `Erro ao retornar os budgets! ${err}` });
            throw new Error(`Erro ao retornar os budgets! ${err}`);
        }
    });
};

const retornaSchoolBudgetsProducao = (res, sql) => {
    ConnectionTbscorp.acquire(function(err, con) {
        if (err) console.timeLog(err);
        con.query(sql, function(err, result) {
            con.release();
            const retorno = [];
            try {
                retorno[0] = result;
                res.status(200).json(retorno[0]); // Retorna os budgets.
            } catch (error) {
                console.log(error);
                res.status(500).send({ message: `Erro ao retornar os budgets! ${err}` });
                throw new Error(`Erro ao retornar os budgets! ${err}`);
            }
        });
    });
};

class IntranetDAO {
    static retornarProcedimentos(req, res) {
        const sql = `SELECT * FROM intranet_procedures`;
        process.env.NODE_ENV === 'production'
            ? procedimentosProducao(res, sql)
            : procedimentosDesenvolvimento(res, sql);
    }

    static autenticaUsuario(req, res) {
        const userToken = req.cookies.intranet_user_token;
        const tokenDecodificado = jwt.verify(userToken, process.env.CHAVE_JWT, function(err, decoded) {
            return decoded;
        });

        try {
            res.status(200).json({ usuario: tokenDecodificado, perfil: tokenDecodificado.payload.idperfilusuario, userToken, sessao });
        } catch (error) {
            res.status(500).send({ message: `Erro ao retornar o usuário! ${err}` });
            throw new Error(`Erro ao retornar o usuário! ${err}`);
        }
    }

    static validaUsuario(req, res) {
        const usuario = req.body.userLogin;
        const senha = md5(req.body.userSenha);

        const sql = `SELECT usuarios.nomeusuario, usuarios.matricula, ... FROM usuarios INNER JOIN usuarios_intranet ON ...`;

        try {
            process.env.NODE_ENV === 'production'
                ? usuariosProducao(req, res, sql)
                : usuariosDesenvolvimento(req, res, sql);
        } catch (error) {
            res.status(500).send({ message: `Erro de autenticação! ${err}` });
            throw new Error(`Erro de autenticação! ${err}`);
        }
    }

    static retornaSchoolBudgets(req, res) {
        const sql = `SELECT ... FROM user_approve_budget INNER JOIN orcamento ...`;
        process.env.NODE_ENV === 'production'
            ? retornaSchoolBudgetsProducao(res, sql)
            : retornaSchoolBudgetsDesenvolvimento(res, sql);
    }

    static retornaColaboradores(req, res) {
        const sql = `SELECT ... FROM usuarios INNER JOIN usuarios_intranet ...`;
        process.env.NODE_ENV === 'production'
            ? retornaUsuarioProducao(res, sql)
            : retornaUsuarioDesenvolvimento(res, sql);
    }

    static logout(req, res) {
        req.session.destroy(); // Destroi a sessão do usuário.
        return res.sendStatus(200); // Retorna sucesso.
    }

    static cadastraNoticias(req, res) {
        res.json({ info: 'Notícia Cadastrada' }); // Retorna mensagem de sucesso.
    }
}

module.exports = IntranetDAO; // Exporta a classe para ser usada em outros módulos.
