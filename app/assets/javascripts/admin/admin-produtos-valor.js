$(function (){

    jQuery.validator.setDefaults({
      debug: true,
      success: "valid"
    });

    //validação form
    var formValor = $( ".formValidateValor" );
    formValor.validate({
        rules: {
            'admin_valor[nome]': 'required',
            'admin_produto[quantidade]': {
                required: true,
                min: 1
            },
            'admin_produto[descricao]': 'required'
        },
        messages: {
            'admin_valor[nome]':{
              required: "Por favor, insira um valor"
            },
            'admin_produto[quantidade]': {
                required: 'Por favor, insira a quantidade',
                min: 'O menor valor permitido é 1'
            },
            'admin_produto[descricao]': 'Por favor, insira uma descrição'
        }
    });

    var buscaProduto;
    $('input.autocomplete').keyup(function(){
        buscaProduto = $(this).val();
    });
    //autocomplete
    $( ".autocomplete" ).autocomplete({
         source: function( request, response ) {
            $.ajax({
                type: "GET",
                url: "/admin/caracteristicas/json/" + buscaProduto,
                dataType: "json",
                success: function( data ) {
                    response( $.map( data, function( item ) {
                        return {
                            label: item.nome,
                            value: item.nome,
                            id: item.id
                        }
                    }));
                }
            });
        },
        // minLength: 2,
        select: function(event, ui) {
            $('input[name="admin_valor[caracteristica_id]"]').val(ui.item.id);
        },
        response: function(event, ui) {
            if (ui.content.length === 0) {
                // console.log("not found");
            } else {
                // console.log("else");
            }
        },
        open: function() {
            $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
        },
        close: function() {
            $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
        }
    });

	//cria/edita caracteristica
	var obj_params = {};
	var valor_id;
	var nome_valor;
	var produto_id;
	var caracteristica_id;
	var action;
	var url;
	var type;
    $('.btn-submit-valor').click(function(event) {
        if(formValor.valid()){
            $('span.loader').show();
            $('div.maskLoader').show();
            obj_params = {};

            nome_valor = $('input[name="admin_valor[nome]"]').val();
            produto_id = parseInt($('input[name="admin_valor[produto_id]"]').val(), 10);
            caracteristica_id = parseInt($('input[name="admin_valor[caracteristica_id]"]').val(), 10);

            obj_params = {nome: nome_valor, produto_id: produto_id, caracteristica_id: caracteristica_id};

            // console.log(obj_params);
            action = $('input[name=action]').val();

            if(action == "new")
            {
            	url = '/admin/valores';
            	type = 'POST';
            } else
            {
            	url = '/admin/valores/' + valor_id;
            	type = 'PATCH';
            }

            $.ajax({
            	url: url,
            	type: type,
            	data: {admin_valor: obj_params},
            })
            .done(function(data) {
            	// console.log(data);
            	$('#gridCaracteristica').html(data);
            	$('#modalCaracteristica').modal('hide');
            	atualizaInput("", "", "");
            })
            .fail(function() {
            	console.log("Erro!! Valor!!");
            })
            .always(function() {
	            $('span.loader').hide();
	            $('div.maskLoader').hide();
            });
            

        }
        // return false;
    });

	//add caracteristica
	$(document).on('click', '.btn-nova-caracteristica', function(event) {
		$('input[name=action]').val("new");
    	atualizaInput("", "", "");
	});

	//edita caracteristica
	$(document).on('click', '.btn-edita-caracteristica', function(event) {
        $('span.loader').show();
        $('div.maskLoader').show();
    	atualizaInput("", "", "");
		$('input[name=action]').val("update");
		valor_id = $(this).closest('tr').attr('id');

		$.ajax({
			url: '/admin/valores/retornaValor',
			type: 'POST',
			data: {id: valor_id},
		})
		.done(function(data) {
            $('span.loader').hide();
            $('div.maskLoader').hide();
			atualizaInput(data.nome_valor, data.caracteristica_id, data.caracteristica.nome);
		})
		.fail(function() {
			console.log("erro ao listar valor");
		});


	});

	//exclui caracteristica
	var id_excluir;
	$(document).on('click', '.btn-exclui-caracteristica', function(event) {
		if(confirm("Você tem certeza que deseja excluir?"))
		{
			id_excluir = $(this).closest('tr').attr('id');
			$.ajax({
				url: '/admin/valores/' + id_excluir,
				type: 'DELETE'
			})
			.done(function(data) {
            	$('#gridCaracteristica').html(data);
            	atualizaInput("", "", "");
			})
			.fail(function() {
				console.log("erro ao excluir valor");
			});
		}
		
	});

	function atualizaInput(valor_nome, valor_caracteristica_id, valor_caracteristica)
	{
		$('input[name="admin_valor[nome]"]').val(valor_nome);
		$('input[name="admin_valor[caracteristica_id]"]').val(valor_caracteristica_id);
		$('input[name=caracteristica]').val(valor_caracteristica);
	}

});