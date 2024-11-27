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

?>