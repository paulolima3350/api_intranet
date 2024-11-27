<?php 

	$acao = $_POST['acao'];
	

	if('atualizarContato' === $acao){

		atualizarContato();
	}

	function atualizarContato(){

		include ("conectaBanco.php");		

		$id = $_POST['id'];
		//$sqldesativa = "UPDATE contatos_ict set desativado = 1 where id=".$idusuario.";";

		$vetDados = json_decode($_POST['vetDados']);		

		foreach ($vetDados as $obj) {				
			//echo $obj->name; echo ' ';echo $obj->value;echo "\n";\
			$sqlAtualiza = "update contatos set ".$obj->name."='".$obj->value."' where id = ".$id.";";
			mysqli_query($_SG['link'],$sqlAtualiza);
		}

		//recuperaTodosContatos();
		echo json_encode("atualizado");
	}

	function recuperaTodosContatos(){

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

	}
	

?>


