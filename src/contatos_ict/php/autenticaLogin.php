<?php

	$_SG['servidor'] = '192.168.4.54';    // Servidor MySQL
	$_SG['usuario'] = 'root';          // Usuário MySQL
	$_SG['senha'] = 'british@admin';                // Senha MySQL
	$_SG['banco'] = 'thebritishschool';            // Banco de dados MySQL
	$_SG['tabela'] = 'usuarios';       // Nome da tabela onde os usuários são salvos
	$_SG['conectaServidor'] = true;

    if ($_SG['conectaServidor'] == true) {

        $_SG['link'] = mysqli_connect($_SG['servidor'], $_SG['usuario'], $_SG['senha']) or die("MySQL: Não foi possível conectar-se ao servidor [".$_SG['servidor']."].");
        mysqli_select_db($_SG['link'],$_SG['banco']) or die("MySQL: Não foi possível conectar-se ao banco de dados [".$_SG['banco']."].");

    }

    function validaUsuario($usuario, $senha) {

        global $_SG;

        $usuario = addslashes($usuario);
        $senha = addslashes($senha);
				$logarNoSistema = "contatos_ict";

				$sql = "SELECT
									u.idusuario,
									u.nomeusuario,
									u.email,
									u.id_departamento,
									u.matricula,
									u.primeiroacesso,
									s.idsistema,
									uca.usuario_acessa,
									uca.id_perfil_sistema
									FROM
									sistemas AS s
									Inner Join usuarios AS u
									Inner Join usuario_controle_acesso AS uca
									ON s.idsistema = uca.id_sistema
									AND uca.id_usuario = u.idusuario
									WHERE
									u.matricula =  ".$usuario." AND
									u.senha =  md5('".$senha."') AND
									s.nomesistema = '".$logarNoSistema."' AND
									uca.usuario_acessa =  1;";
									//idsistema = 1 = registro_atendimento_fornecedor
									//usuario_acessa // 1 = acessa | 0 = nao acessa

        // echo $sql;
        // echo "\n";
        // exit();

        $query = mysqli_query($_SG['link'],$sql);

        $resultado = mysqli_fetch_assoc($query);

        if (empty($resultado)) {
          // echo "entrei sem logar";
          // exit();
            return false;

        } else {
            
            session_start();

            $_SESSION['contato_idusuario'] = $resultado['idusuario'];
            $_SESSION['contato_nomeusuario'] = $resultado['nomeusuario'];
            $_SESSION['contato_email'] = $resultado['email'];
            $_SESSION['contato_id_departamento'] = $resultado['id_departamento'];
            $_SESSION['contato_matricula'] = $resultado['matricula'];
            $_SESSION['contato_primeiroacesso'] = $resultado['primeiroacesso'];
						$_SESSION['contato_id_perfil_sistema'] = $resultado['id_perfil_sistema'];

            // echo "entrei logando";
            // exit();
						// echo "perfil : " .$_SESSION['id_perfil_sistema'];
						// exit();
            // echo "\n";


            return true;
        }
    }

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $usuario = (isset($_POST['usuario'])) ? $_POST['usuario'] : '';
        $senha = (isset($_POST['senha'])) ? $_POST['senha'] : '';

        if (true == validaUsuario($usuario, $senha)) {


            if(10 === (integer)$_SESSION['contato_id_perfil_sistema']){

              // echo $_SESSION['idusuario'];
              // exit();

               $registro = array(
                 "logou" => "sim",
                 "redireciona" => "location.href='index2.php'",
                 "primeiroacesso"  => $_SESSION['contato_primeiroacesso']
               );

               mysqli_close($_SG['link']);

               echo json_encode($registro);

            }

        } else {
          // ususario / senha errado.
          $registro = array(
            "logou" => "nao"
          );

          mysqli_close($_SG['link']);

          echo json_encode($registro);
        }
    }

?>
