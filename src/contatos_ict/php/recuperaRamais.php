<?php 

	include ("conectaBanco.php");

	$sql = "SELECT * FROM contatos where desativado = 0";

	$res = mysqli_query($_SG['link'],$sql);

	$registros = array();
	
	while ($row = mysqli_fetch_array($res)) {

			  $registro = array(
			  	"id" => $row['id'],
			  	"nome" => $row['nome'],
				"email" => $row['email'],
				"cargo"  => $row['cargo'],
				"empresa"  => $row['empresa'],
				"telefone1"  => $row['telefone1'],
				"telefone2"  => $row['telefone2']				
			  );
		
		$registros[] = $registro;
	}

	mysqli_close($_SG['link']);

	echo json_encode($registros);

?>