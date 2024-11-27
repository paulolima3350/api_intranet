const conexao = require('../../BD/config');

class UsuariosService {

    static serviceAniversarianteMes(res, sql) {

        conexao.acquire(function(err,con){
            if(err) console.timeLog(err);
            con.query(sql, function(err, result) {
                con.release();
    
                const retorno = [];
    
                try {
    
                    retorno[0] = result;

                    console.log(retorno);

                    res.status(200).json(retorno[0]);
    
                } catch (error) {
    
                    res.status(400).send({ message: `Erro ao retornar o usuário! ${err}`}) ;
                    throw new Error(`Erro ao retornar o usuário! ${err}`);
                }
            });
        });

    }

    static serviceInsereDataDeNascimento(res, sql) {

        conexao.acquire(function(err,con){
            if(err) console.timeLog(err);
            con.query(sql, function(err, result) {
                con.release();

                if(err) {

                    console.log(err);

                    res.status(500).send({ message: 'Não foi possível inserir a data de nascimento!' });

                }

                res.status(201).send(result);

            });
        });

    }

    static serviceDepartamentoHibrido(res, sql) {

        conexao.acquire(function(err,con){
            if(err) console.timeLog(err);
            con.query(sql, function(err, result) {
                con.release();

                if(err) {

                    res.status(500).send({ message: 'Não foi possível inserir a data de nascimento!' });

                }

                res.status(201).send(result);

            });
        });

    }

}
module.exports = UsuariosService;