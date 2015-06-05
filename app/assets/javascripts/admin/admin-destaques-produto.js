$(function (){

    jQuery.validator.setDefaults({
      debug: true,
      success: "valid"
    });

    //validação form
    var formProduto = $( ".formValidateProduto" );
    formProduto.validate({
        rules: {
            'admin_destaque_produto[produto_id]': 'required',
            'produto': 'required'
        },
        messages: {
            'admin_destaque_produto[produto_id]': '',
            'produto': ''
        }
    });

    // var buscaProduto;
    // $('input.autocomplete').keyup(function(){
    //     buscaProduto = $(this).val();
    // });
    // //autocomplete
    // $( ".autocomplete" ).autocomplete({
    //      source: function( request, response ) {
    //         $.ajax({
    //             type: "GET",
    //             url: "/admin/produtos/json/" + buscaProduto,
    //             dataType: "json",
    //             success: function( data ) {
    //                 response( $.map( data, function( item ) {
    //                     return {
    //                         label: item.nome,
    //                         value: item.nome,
    //                         id: item.id
    //                     }
    //                 }));
    //             }
    //         });
    //     },
    //     // minLength: 2,
    //     select: function(event, ui) {
    //         $('input[name="admin_destaque_produto[produto_id]"]').val(ui.item.id);
    //     },
    //     response: function(event, ui) {
    //         if (ui.content.length === 0) {
    //             // console.log("not found");
    //         } else {
    //             // console.log("else");
    //         }
    //     },
    //     open: function() {
    //         $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
    //     },
    //     close: function() {
    //         $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
    //     }
    // });

	//cria/edita produto em destaque
	var obj_params = {};
	var valor_id;
	var destaque_id;
	var produto_id;
	var action;
	var url;
	var type;
    $('.btn-submit-produto').click(function(event) {
        if(formProduto.valid()){
            $('span.loader').show();
            $('div.maskLoader').show();
            obj_params = {};

            destaque_id = parseInt($('input[name="admin_destaque_produto[destaque_id]"]').val(), 10);
            produto_id = parseInt($('input[name="admin_destaque_produto[produto_id]"]').val(), 10);

            obj_params = {destaque_id: destaque_id, produto_id: produto_id};

            // console.log(obj_params);
            action = $('input[name=action]').val();

            if(action == "new")
            {
            	url = '/admin/destaque_produtos';
            	type = 'POST';
            } else
            {
            	url = '/admin/destaque_produtos/' + valor_id;
            	type = 'PATCH';
            }

            $.ajax({
            	url: url,
            	type: type,
            	data: {admin_destaque_produto: obj_params},
                beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))}
            })
            .done(function(data) {
            	$('#gridProduto').html(data);
            	$('#modalProduto').modal('hide');
            	atualizaInput("", "");
            })
            .fail(function() {
            	console.log("Erro!! Produto!!");
            })
            .always(function() {
	            $('span.loader').hide();
	            $('div.maskLoader').hide();
            });
            $.ajaxSetup({
              headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
              }
            });

        }
        // return false;
    });

    // add produto
	$(document).on('click', '.btn-novo-produto', function(event) {
		$('input[name=action]').val("new");
    	atualizaInput("", "", "");
	});

	//edita produto
    var prod_id;
	$(document).on('click', '.btn-edita-produto', function(event) {
        $('span.loader').show();
        $('div.maskLoader').show();
    	atualizaInput("", "", "");
		$('input[name=action]').val("update");
        prod_id = $(this).closest('tr').attr('id-prod');
		valor_id = $(this).closest('tr').attr('id');

		$.ajax({
			url: '/admin/destaque_produtos/retornaProduto',
			type: 'POST',
			data: {id_produto: prod_id},
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))}
		})
		.done(function(data) {
            $('span.loader').hide();
            $('div.maskLoader').hide();
			atualizaInput(data.produto_id, data.nome);
		})
		.fail(function() {
			console.log("erro ao listar produto");
		});
        $.ajaxSetup({
          headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
          }
        });


	});

	//exclui produto
	var id_excluir;
	$(document).on('click', '.btn-exclui-produto', function(event) {
		if(confirm("Você tem certeza que deseja excluir?"))
		{
			id_excluir = $(this).closest('tr').attr('id');
			$.ajax({
				url: '/admin/destaque_produtos/' + id_excluir,
				type: 'DELETE',
                beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))}
			})
			.done(function(data) {
            	$('#gridProduto').html(data);
            	atualizaInput("", "");
			})
			.fail(function() {
				console.log("erro ao excluir produto");
			});
            $.ajaxSetup({
              headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
              }
            });
		}
		
	});

	function atualizaInput(valor_produto_id, valor_produto)
	{
		$('input[name="admin_destaque_produto[produto_id]"]').val(valor_produto_id);
		$('input[name=produto]').val(valor_produto);
	}

});