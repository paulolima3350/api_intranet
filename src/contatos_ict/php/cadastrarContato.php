<?php

	include ("conectaBanco.php");

	$nome = $_POST['nome'];
	$empresa = $_POST['empresa'];
	$cargo = $_POST['cargo'];
	$email = $_POST['email'];
	$tel1 = $_POST['tel1'];
	$tel2 = $_POST['tel2'];

	$sql = "insert into contatos(nome,email,cargo,empresa,telefone1,telefone2) values('".$nome."','".$empresa."','".$cargo."','".$email."','".$tel1."','".$tel2."');";
	
	mysqli_query($_SG['link'],$sql);

	mysqli_close();

	echo json_encode("Cadastrado com Sucesso !");

?>
