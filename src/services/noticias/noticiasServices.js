const conexao = require('../../BD/config');

class NoticiasServices {

    static buscaNoticias(res, sql) {

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

    static insereNoticias(res, objNoticiaNoticia, sql) {

        conexao.acquire(function(err,con){
            if(err) console.timeLog(err);
            con.query(sql, objNoticiaNoticia, function(err, result) {
                con.release();

                if(err) {

                    res.status(500).send({ message: 'Não foi possível cadastrar os procedimentos!' });

                }

                res.status(201).send();

            });
        });

    }

    static editaNoticias(res, sql, objEdicaoEdicao) {

        console.log(objEdicaoEdicao)

        conexao.acquire(function(err,con){
            if(err) console.timeLog(err);
            con.query(sql, objEdicaoEdicao, function(err, result) {
                con.release();

                if(err) {
					
					console.log(err)

                    res.status(500).send({ message: 'Não foi possível editar os procedimentos!' });

                }

                res.status(201).send(result);

            });
        });

    }

    static desabilitaNoticias(res, sql) {
        conexao.acquire(function(err,con){
            if(err) console.timeLog(err);
            con.query(sql, function(err, result) {
                con.release();

                if(err) {

                    console.log(err);

                    res.status(500).send({ message: 'Não foi possível desabilitar a notícia!' });

                }

                res.status(201).send(result);

            });
        });

    }

}
module.exports = NoticiasServices;