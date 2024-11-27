<?php session_start(); ?>

<!DOCTYPE html>
<html lang="en" >
    <head>
        <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE" />
		<link rel="stylesheet" href="external/css/bootstrap.min.css" />
    </head>
    <body style="background-color:#ddd">
            <div class="container" style="margin-top:30px;width:500px;" id="conteudoPrincipal">
              <form class="form-signin" role="form" action="php/autenticaLogin.php" method="post" id="formAutentica">

                  <div class="panel panel-default">

                      <div class="panel-body">

                        <h2 class="form-signin-heading" style="text-align:center;"><img src="external/img/logo_british.png" width="300px" /></h2>

                        <h2 class="form-signin-heading" style="text-align:center;">Contatos ICT</h2>

                      </div>

                      <div class="panel-footer">
                        <div id="result">
                        </div>
						            Login:
                        <input type="number" class="form-control" required autofocus name="usuario">
                        Password:
		                    <input type="password" id="senha" class="form-control" required name="senha">
                        <br />
                        <input type="submit" class="btn btn-lg btn-primary btn-block" value="Entrar" type="submit" style="margin-top:5px;">
                      </div>
                  </div>
              </form>

            </div>
      <script src="external/js/jquery-1.11.3.min.js"></script>

      <script>

      $("#formAutentica").on("submit", function(e) {

                e.preventDefault();

                var dataSend = $(this).serializeArray();

                $.ajax({

                  url: 'php/autenticaLogin.php',
                  type: 'POST',
                  data: dataSend,
                  dataType:'json',
                  success: function(data) {
                    debugger;
                    if('nao' === data.logou){
                        //nao se autenticou - usuario e/ou senha incorreta
                        $('#result').html('<div class="alert alert-danger alert-dismissible" role="alert"><b>Usuário / Senha Incorreto(s).</b></div>');

                    }else if('sim' === data.logou){

                        if(0 === parseInt(data.primeiroacesso)){

                          var novaSenha = prompt('Olá, primeira vez no sistema?\n\n Digite uma nova senha:');

                          var dataSend = [];
                          dataSend.push({name:'novaSenha',value:novaSenha});

                          $.ajax({

                            url: 'php/trocaSenha.php',
                            type: 'POST',
                            data: dataSend,
                            dataType:'json',
                            success: function(data2) {
                              debugger;
                              eval(data.redireciona);
                            }
                          });

                        }else{
                            //logou e já tem senha
                            eval(data.redireciona);
                        }
                    }

                  }

                });

        });




      </script>
    </body>
</html>
