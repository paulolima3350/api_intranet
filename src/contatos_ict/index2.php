<?php 

	session_start();
	
	
	if(!isset($_SESSION['contato_matricula']) || 10 !== (integer)$_SESSION['contato_id_perfil_sistema']){
        header("Location: /contatos_ict/");
  }

?>

<!DOCTYPE html>
<html>
<head>
	<title>Extensions - Ramais - British School</title>
	<link rel="stylesheet" type="text/css" href="external/css/bootstrap.min.css">
	<script type="text/javascript" src="external/js/jquery-1.11.3.min.js"></script>
	<script type="text/javascript" src="external/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="external/js/jquery.mask.min.js"></script>

	<style type="text/css">

		  .table>tbody>tr>th, .table>tfoot>tr>th, .table>thead>tr>td, .table>tbody>tr>td, .table>tfoot>tr>td{
		      padding: 0px 5px 0px 5px;
		  }

		  .table>thead>tr>th{
		  	background-color: #0054A9;
		  	color: white;
		  	font-size: 16px;
		  	font-weight: bold;
		  }

		  .table>tbody>tr>td{		  	
		  	font-size: 11px;
		  }

		  tr:nth-child(even) {
  				background-color: #AAD4FF;
		  }

		  .myButton {
		    background-color:#44c767;
		    -moz-border-radius:42px;
		    -webkit-border-radius:42px;
		    border-radius:42px;
		    border:12px solid #18ab29;
		    display:inline-block;
		    cursor:pointer;
		    color:#ffffff;
		    font-family:Arial;
		    font-size:28px;
		    font-weight:bold;
		    padding:16px 31px;
		    text-decoration:none;
		    text-shadow:-4px 2px 21px #2f6627;
		  }
		  .myButton:hover {
		    background-color:#5cbf2a;
		  }
		  .myButton:active {
		    position:relative;
		    top:1px;
		  }
	</style>
</head>
<body>

<div class="container">
	<div class="row">
	 		<div class="col-sm-2">
	 		 		<img src="logo 1.jpg" width="200" height="100">
	 		</div>

	 		<div class="col-sm-8 text-center" >
	 			<div style="margin-top:35px;">
	 				<h2>Contatos ADM-ICT</h2>
	 			</div>
	 		</div>
			<div class="col-sm-2">
	 		 	<div class="dropdown" style="margin-top:20px;" >
				  <button  style="display: inline-block;vertical-align: middle;float: none;" class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
				    Outras Opções
				    <span class="caret"></span>
				  </button>
				  <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">				    
				    <li role="separator" class="divider"></li>
				    <li><a href="/contatos_ict/php/logout.php">Sair do Sistema</a></li>
				  </ul>
				</div>
	 		</div>
	 </div>
</div>


<div class="container" style="margin-top:10px;width:95%;">
	<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
	  <div class="panel panel-info">
	    <div class="panel-heading" role="tab" id="headingOne">
	      <h4 class="panel-title text-center">
	        <a role="button" data-toggle="collapse"  href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
	          Cadastrar Novo Contato
	        </a>
	      </h4>
	    </div>
	    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
	      <div class="panel-body">
	      <form id="cadastrarContato">
	       		<div class="row">
	       			<div class="col-sm-4">
	       				<input type="text" class="form-control" placeholder=" Nome" name="nome">
	       			</div>
	       			<div class="col-sm-4">
	       				<input type="text" class="form-control" placeholder=" Empresa" name="empresa" required>
	       			</div>
	       			<div class="col-sm-4">
	       				<input type="text" class="form-control" placeholder=" Cargo" name="cargo">
	       			</div>
	       		</div>
	       		<div class="row" style="margin-top:15px;">
	       			<div class="col-sm-4">
	       				<input type="email" class="form-control" placeholder=" Email" name="email">
	       			</div>
	       			<div class="col-sm-4">
	       				<input type="text" class="form-control" placeholder=" Telefone 1" name="tel1" id="tel1" required>
	       			</div>
	       			<div class="col-sm-4">
	       				<input type="text" class="form-control" placeholder=" Telefone 2" name="tel2" id="tel2">
	       			</div>
	       		</div>

	       		<div class="row" align="center" style="margin-top:20px;">
	       			<input type="submit" value="Salvar Novo Contato">
	       		</div>
		  </form>
	      </div>
	    </div>
	  </div>
	  <div class="panel panel-info">
	    <div class="panel-heading" role="tab" id="headingTwo">
	      <h4 class="panel-title text-center">
	        <a class="collapsed" role="button" data-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" onclick="listarContatos();">
	          Contatos Cadastrados
	        </a>
	      </h4>
	    </div>
	    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
	      <div class="panel-body">
	      	<div class="row">
	        	<div style="margin:0 auto;width:500px;">
					<input type="text" class="form-control"  id="pesquisaContato" name="pesquisaContato" placeholder="Pesquisar Contato">
				</div>
			</div>
			<div class="row" style="margin-top:10px;">
				<table id="tabelaRamais" class="table table-bordered table-striped" style="width:95%;margin:0 auto;"></table>
			</div>
	      </div>
	    </div>
	  </div>

	</div>
</div>

</body>

	<script type="text/javascript">

		$("#cadastrarContato").on("submit", function(e) {

		      e.preventDefault();

		      $.ajax({

		          url: 'php/cadastrarContato.php',
		          type: 'POST',
		          dataType:'json',
		          data: $(this).serialize(),
		          success: function(data) {
		          	$('#cadastrarContato').trigger("reset");
		             listarContatos();
		          }

		      });

        });

$('#tel1').mask('(00) 0000-00000');
$('#tel2').mask('(00) 0000-00000');

	function atualizarContato(element){

		var idELemento = $(element).closest('tr').attr('data-idcontato');

		var irmaos = $(element).closest('td').siblings();

		var vetDados = [];

		$(irmaos).each(function(){

			var nomeVariavel = $(this).attr('data-variavel');
			var valorVariavel = $(this).find('input').val();

			vetDados.push({name:nomeVariavel,value:valorVariavel});

		});
		vetDados = JSON.stringify(vetDados);

		var dataSend = [];

		dataSend.push({name:'id',value:idELemento});
		dataSend.push({name:'acao',value:'atualizarContato'});
		dataSend.push({name:'vetDados',value:vetDados});

		$.ajax({

		      url: 'php/atualizarContato.php',
		      type: 'POST',
		      dataType:'json',
		      data: dataSend,

		      success: function(data) {
		      		debugger;
	      			listarContatos();
		      }
		});

	}

	function desativarContato(element){

		var idELemento = $(element).closest('tr').attr('data-idcontato');

		var booleanConfirma = confirm('Tem certeza que deseja desativar contato?');

		if(true === booleanConfirma){

			var dataSend = {'acao':'removerContato','id':idELemento};

				$.ajax({

				      url: 'php/removerContato.php',
				      type: 'POST',
				      dataType:'json',
				      data: dataSend,

				      success: function(data) {
				      		alert('Contato removido com sucesso.');
				      		$('#tabelaRamais').html('');

								$('#tabelaRamais').append('<thead><tr>'+
									'<th class="text-center">Nome</th>'+
									'<th class="text-center">Empresa</th>'+
									'<th class="text-center">Cargo</th>'+
									'<th class="text-center">Email</th>'+
									'<th class="text-center">Tel1</th>'+
									'<th class="text-center">Tel2</th>'+
									'<th class="text-center" style="width: 88px;">Ações</th>'+
								'</tr></thead>');

							for(var i = 0; i< data.length; i++){

								var id = data[i].id;

								var btnEditar = '<button  type="button" class="btn btn-warning btn-sm" aria-label="Left Align" onclick="editarContato(this);" title="Editar Contato">'+
											  '<span class="glyphicon glyphicon-wrench" aria-hidden="true"></span>'+
											'</button>';

								var btnRemover = '<button type="button" class="btn btn-danger btn-sm" aria-label="Left Align" onclick="desativarContato(this);" title="Desativar Contato">'+
											  '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>'+
											 '</button>';

								var nome      = data[i].nome;
								var email     = data[i].email;
								var cargo     = data[i].cargo;
								var empresa   = data[i].empresa;
								var telefone1 = data[i].telefone1;
								var telefone2 = data[i].telefone2;

								$('#tabelaRamais').append('<tr data-idcontato="'+id+'">'+
									'<td style="padding-top: 5px;" data-variavel="nome">'+nome+'</td>'+
									'<td style="padding-top: 5px;" data-variavel="email">'+email+'</td>'+
									'<td style="padding-top: 5px;" data-variavel="cargo">'+cargo+'</td>'+
									'<td style="padding-top: 5px;" data-variavel="empresa">'+empresa+'</td>'+
									'<td style="padding-top: 5px;" data-variavel="telefone1">'+telefone1+'</td>'+
									'<td style="padding-top: 5px;" data-variavel="telefone2">'+telefone2+'</td>'+
									'<td class="text-center">'+btnRemover+'  '+btnEditar+'</td>'+
								'</tr>');
							}


							$("#pesquisaContato").keyup(function(){

		                        _this = this;
		                        // Show only matching TR, hide rest of them
		                        $.each($("#tabelaRamais").find("tbody tr"), function() {

		                            if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) == -1)
		                               $(this).hide();
		                            else
		                                 $(this).show();
		                        });
		                    });
				      }
				 });

		}else{
			return false;
		}
	}

	function editarContato(element){


		var btnEnviarDados = '<button  type="button" class="btn btn-success btn-sm" aria-label="Left Align" onclick="atualizarContato(this);" title="Atualizar Contato">'+
		  '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>'+
		'</button>';

		var irmaos = $(element).closest('td').siblings();

		$(irmaos).each(function(){

			var textoTD = $(this).text();
			var input = '<input type="text" value="'+textoTD+'" />';
			$(this).html(input);

		});

		$(element).closest('td').append(btnEnviarDados);
		$(element).remove();


	}


		function listarContatos(){

				var dataSend = {'recuperaRamais':'recuperaRamais'};

				$.ajax({

				      url: 'php/recuperaRamais.php',
				      type: 'POST',
				      dataType:'json',
				      data: dataSend,

				      success: function(data) {

						$('#tabelaRamais').html('');

								$('#tabelaRamais').append('<thead><tr>'+
									'<th class="text-center">Nome</th>'+
									'<th class="text-center">Empresa</th>'+
									'<th class="text-center">Cargo</th>'+
									'<th class="text-center">Email</th>'+
									'<th class="text-center">Tel1</th>'+
									'<th class="text-center">Tel2</th>'+
									'<th class="text-center" style="width: 88px;">Ações</th>'+
								'</tr></thead>');

							for(var i = 0; i< data.length; i++){

								var id = data[i].id;

								var btnEditar = '<button type="button" class="btn btn-warning btn-sm" aria-label="Left Align" onclick="editarContato(this);" title="Editar Contato">'+
											  '<span class="glyphicon glyphicon-wrench" aria-hidden="true"></span>'+
											'</button>';

								var btnRemover = '<button type="button" class="btn btn-danger btn-sm" aria-label="Left Align" onclick="desativarContato(this);" title="Desativar Contato">'+
											  '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>'+
											 '</button>';

								var nome      = data[i].nome;
								var email     = data[i].email;
								var cargo     = data[i].cargo;
								var empresa   = data[i].empresa;
								var telefone1 = data[i].telefone1;
								var telefone2 = data[i].telefone2;

								$('#tabelaRamais').append('<tr data-idcontato="'+id+'">'+

									'<td style="padding-top: 5px;" data-variavel="nome">'+nome+'</td>'+
									'<td style="padding-top: 5px;" data-variavel="email">'+email+'</td>'+
									'<td style="padding-top: 5px;" data-variavel="cargo">'+cargo+'</td>'+
									'<td style="padding-top: 5px;" data-variavel="empresa">'+empresa+'</td>'+
									'<td style="padding-top: 5px;" data-variavel="telefone1">'+telefone1+'</td>'+
									'<td style="padding-top: 5px;" data-variavel="telefone2">'+telefone2+'</td>'+

									'<td class="text-center">'+btnRemover+'  '+btnEditar+'</td>'+
								'</tr>');
							}


							$("#pesquisaContato").keyup(function(){

		                        _this = this;
		                        // Show only matching TR, hide rest of them
		                        $.each($("#tabelaRamais").find("tbody tr"), function() {

		                            if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) == -1)
		                               $(this).hide();
		                            else
		                                 $(this).show();
		                        });
		                    });

				      }

		      });
		}
		listarContatos();
	</script>
</html>
