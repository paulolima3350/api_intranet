const conexao = require('../../BD/config');

class ProcedimentosService {
    static buscaProcedimentos(res, sql) {

        conexao.acquire(function(err,con){
            if(err) console.timeLog(err);
             con.query(sql, function(err, result) {
                con.release();
                    
                if(err) {

                    res.status(500).send({ message: 'Não foi possível retornar os procedimentos!' });

                }

                res.status(200).json(result)
        
            });
        });

    }

    static insereProcedimentos(res, objInputProcedimento, sql) {

        conexao.acquire(function(err,con){
            if(err) console.timeLog(err);
            con.query(sql, objInputProcedimento, function(err, result) {
                con.release();

                if(err) {

                    res.status(500).send({ message: 'Não foi possível cadastrar os procedimentos!' });

                }

                res.status(201).send();

            });
        });

    }

    static editaProcedimentos(res, sql, objEdicaoProcedimento) {
        conexao.acquire(function(err,con){
            if(err) console.timeLog(err);
            con.query(sql, objEdicaoProcedimento, function(err, result) {
                con.release();

                if(err) {
					
					console.log(err)

                    res.status(500).send({ message: 'Não foi possível editar os procedimentos!' });

                }

                res.status(201).send(result);

            });
        });

    }

    static desabilitaProcedimentos(res, sql) {
        conexao.acquire(function(err,con){
            if(err) console.timeLog(err);
            con.query(sql, function(err, result) {
                con.release();

                if(err) {

                    console.log(err);

                    res.status(500).send({ message: 'Não foi possível desabilitar o procedimento!' });

                }

                res.status(201).send(result);

            });
        });

    }
}
module.exports = ProcedimentosService;