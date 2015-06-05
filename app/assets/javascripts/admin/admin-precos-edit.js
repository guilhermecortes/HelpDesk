$(function (){

    var count = 1;
    $(document).on('click', '.btn-add-linha', function(event) {
        addLinha(count);
        startAutocomplete(count);
        dateTimePicker(count);
        checkLinesRemoveBtn(10);
        count++;
    });

	var buscaProduto;
    $(document).on('keyup', 'input.autocomplete', function(event) {
		buscaProduto = $(this).val();
	});

    $(document).on('click', '.btn-excluir-preco', function(event) {
        $(this).closest('tr').remove();
        checkLinesAddBtn(10);
    });

    var inp;
    $(document).on('click', '.checkbox', function(event) {
        inp = $(this).closest('tr').find('input[name="admin_preco[data_fim]"]');
        if($(this).is(':checked')) {
            $(inp).addClass('require');
        } else {
            $(inp).removeClass('require');
            $(inp).removeClass('error-input');
        }
    });

    dateTimePicker(0);
    startAutocomplete(0);

    //verifica qtd de linhas p/ remover
    function checkLinesRemoveBtn(qtd)
    {
        if($('#table-preco tbody tr').size() >= qtd){
            $('.btn-add-linha').remove();
            $('#msgAlertaQtd').removeAttr('style');
            $('#msgAlertaQtd span').text("Você pode cadastrar no máximo " + qtd + " preços de uma única vez.");
        }
    }

    //verifca qtd de linhas p/ add
    function checkLinesAddBtn(qtd)
    {
        if($('#table-preco tbody tr').size() < qtd){
            $('.btn-add').html('<a class="btn btn-shadow btn-info btn-add-linha" style="margin-bottom:10px;"> Adicionar mais </a>');
            $('#msgAlertaQtd').hide();
        }
    }

    function startAutocomplete(i)
    {
        //autocomplete
    	$( "#produto_"+i ).autocomplete({
    		 source: function( request, response ) {
    			$.ajax({
    				type: "GET",
    				url: "/admin/produtos/json/" + buscaProduto,
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
    		minLength: 2,
    		select: function(event, ui) {
    			$('input[id="admin_preco_produto_id_'+i+'"]').val(ui.item.id);
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
    }


    function dateTimePicker(i)
    {
        //datetime picker
        $(".date-picker1_"+i).datetimepicker({
            language: 'pt-BR',
            format: "dd/mm/yyyy",
            autoclose: true,
            startDate: new Date(),
            minuteStep: 30,
            minView: 2
        }).on('hide', function(e){
            if($('input[id="admin_preco_data_inicio_'+i+'"]').val() != "")
                $(".date-picker2_"+i).datetimepicker('setStartDate', $('input[id="admin_preco_data_inicio_'+i+'"]').val());
            $('input[id="admin_preco_data_fim_'+i+'"]').focus();
        });
        $(".date-picker2_"+i).datetimepicker({
            language: 'pt-BR',
            format: "dd/mm/yyyy",
            autoclose: true,
            startDate: new Date(),
            minuteStep: 30,
            minView: 2
        });        
    }

    var str;
    function addLinha(i)
    {
        str = "";
        str =  '<tr linha="'+i+'">'+
                    '<td>'+
                        '<input id="admin_preco_produto_id_'+i+'" type="hidden" class="require" name="admin_preco[produto_id]">'+
                        '<input id="produto_'+i+'" class="form-control autocomplete require" type="text" required="required" name="produto">'+
                    '</td>'+
                    '<td style="max-width:70px">'+
                        '<input id="admin_preco_preco_'+i+'" class="form-control require" type="text" required="required" name="admin_preco[preco]">'+
                    '</td>'+
                    '<td class="center" style="max-width:135px">'+
                        '<div class="input-group date date-picker1_'+i+'">'+
                            '<input id="admin_preco_data_inicio_'+i+'" class="form-control parsley-error require" required="required" type="text" size="16" name="admin_preco[data_inicio]">'+
                            '<div class="input-group-btn">'+
                                '<button type="button" class="btn btn-primary date-set"><i class="fa fa-calendar"></i></button>'+
                            '</div>'+
                        '</div>'+
                    '</td>'+
                    '<td class="center" style="max-width:135px">'+
                        '<div class="input-group date date-picker2_'+i+'">'+
                            '<input id="admin_preco_data_fim_'+i+'" class="form-control parsley-error" type="text" size="16" name="admin_preco[data_fim]">'+
                            '<div class="input-group-btn">'+
                                '<button type="button" class="btn btn-primary date-set"><i class="fa fa-calendar"></i></button>'+
                            '</div>'+
                        '</div>'+
                    '</td>'+
                    '<td>'+
                        '<input id="admin_preco_promocao_'+i+'" class="checkbox" type="checkbox" value="true" name="admin_preco[promocao]">'+
                    '</td>'+
                    '<td class="center">'+
                        '<a class="btn btn-excluir-preco"><i class="fa fa-trash-o fa-lg"></i></a>'+
                    '</td>'+
                '</tr>';
        $('#table-preco tbody').append(str);
    }

    //converte string para data
    function convertToDate(data)
    {
        var dt = data.split("/");
        return new Date(dt[1]+"/"+dt[0]+"/"+dt[2]);
    }

    function validaPrecoTela(precos)
    {
        var str = "validação ok";
        preco:
        for (var i = 0; i < precos.length; i++) {
            // console.log("i------", precos[i]);
            for (var j = i+1; j < precos.length; j++) {
                // console.log("j------", precos[j]);
                if (precos[i].produto_id == precos[j].produto_id) { //se o produto for o mesmo
                    if (!precos[i].promocao && !precos[j].promocao) { //dois produtos iguais sem ser promoção (não pode)
                        str = "Erro! Existe mais de um preço cadastrado para o mesmo produto. Por favor, verifique abaixo."
                        erroProdutoIgual(precos[i].produto_id, str); //destaca linha
                        break preco;
                    } else if (precos[i].promocao && precos[j].promocao) { //produtos iguais mas com promoção
                        // console.log("pode inserir se for com datas diferentes");

                        //se as datas forem coincidentes, break
                        if (!(validaDataPromocao(convertToDate(precos[i].data_inicio), convertToDate(precos[i].data_fim), convertToDate(precos[j].data_inicio), convertToDate(precos[j].data_fim))))
                        {
                            str = "Erro! Promoção cadastrada para o mesmo período."
                            erroPromocaoCoincidente(precos[i].produto_id, str);
                            // return false
                            break preco;
                        } else {
                            str = "validação ok";
                        }
                        
                    }
                } else {
                    str = "validação ok";
                }
            };
        };
        return str;
    }

    //funcao para validar data de mesmo produto em promoção
    function validaDataPromocao(i_data_inicio, i_data_fim, j_data_inicio, j_data_fim)
    {
        if (j_data_inicio > i_data_fim || j_data_fim < i_data_inicio) {
            // console.log("datas permitidas");
            return true;
        } else {
            // console.log("DATAS COINCIDENTES");
            return false;
        }
    }

    //erro quando os produtos são iguais, sem ser promoção
    function erroProdutoIgual(produto_1_id, str)
    {
        $('#table-preco tbody tr').each(function(index, el) {
            //se o produto for igual e não for promoção
            if(produto_1_id.toString() == $(el).find('input[name="admin_preco[produto_id]"]').val() && !$(el).find('input[name="admin_preco[promocao]"]').is(':checked'))
                $(this).addClass('erroValidacaoPreco');
        });
        $('#msgErroValidacao').removeAttr('style');
        $('#msgErroValidacao span').text(str);
    }

    //erro quando os produtos são iguais e a promoção está na mesma data
    function erroPromocaoCoincidente(produto_1_id, str)
    {
        $('#table-preco tbody tr').each(function(index, el) {
            //se os produtos coincidirem a data da promoçao
            if(produto_1_id.toString() == $(el).find('input[name="admin_preco[produto_id]"]').val() && $(el).find('input[name="admin_preco[promocao]"]').is(':checked'))
                $(this).addClass('erroValidacaoPreco');
        });
        $('#msgErroValidacao').removeAttr('style');
        $('#msgErroValidacao span').text(str);
    }

    //erro quando os produtos são iguais e a promoção está na mesma data
    function erroPromocaoCoincidenteDB(produto_1_id, str, produto_1_data_inicio)
    {
        $('#table-preco tbody tr').each(function(index, el) {
            //se os produtos coincidirem a data da promoçao
            if(produto_1_id.toString() == $(el).find('input[name="admin_preco[produto_id]"]').val() && 
                $(el).find('input[name="admin_preco[promocao]"]').is(':checked') &&
                produto_1_data_inicio == $(el).find('input[name="admin_preco[data_inicio]"]').val()) {
                    $(this).addClass('erroValidacaoPreco');
            }
        });
        $('#msgErroValidacao').removeAttr('style');
        $('#msgErroValidacao span').text(str);
    }

    function removeClassError()
    {
        $('#table-preco tbody tr').each(function(index, el) {
            $(el).removeClass('erroValidacaoPreco');
        });
        $('#msgErroValidacao').hide();
    }

    //exibe erro se não salvar os preços
    function erroCreate(str)
    {
        $('#msgErroValidacao').removeAttr('style');
        $('#msgErroValidacao span').text(str);
    }

    //valida campos
    function validaForm()
    {
        $('input.require').each(function(index, el) {
            if(!$.trim($(el).val())){
                $(el).addClass('error-input');
            } else {
                $(el).removeClass('error-input');
            }
        });

        if($('input.error-input').length > 0){
            return false;
        } else {
            return true
        }

    }

    var inp_produto_id;
    var inp_preco;
    var inp_data_inicio;
    var inp_data_fim;
    var inp_promocao;
    var obj_preco = {};
    var array_precos = [];
    var row;
    var id;
    $('.btn-submit-preco').click(function(event) {
        
        removeClassError();
        if(validaForm())
        {
            $('span.loader').show();
            $('div.maskLoader').show();

            obj_preco = {};
            array_precos = [];

            $('#table-preco tbody tr').each(function(index, el) {
                row = $(this);
                obj_preco = {
                    produto_id: parseInt($(row).find('input[name="admin_preco[produto_id]"]').val(), 10),
                    preco: $(row).find('input[name="admin_preco[preco]"]').val(),
                    data_inicio: $(row).find('input[name="admin_preco[data_inicio]"]').val(),
                    data_fim: $(row).find('input[name="admin_preco[data_fim]"]').val(),
                    promocao: JSON.parse($(row).find('input[name="admin_preco[promocao]"]').val())
                };
                array_precos.push(obj_preco);
            });
            id = $('input[name="admin_preco[id]"]').val();
            console.log(array_precos)

            // if (validaPrecoTela(array_precos) == "validação ok")
            // {
            //     //submit ajax
                enviaPrecos(array_precos, id);

            // } else
            // {
            //     //erro, não enviar
            //     console.log("Erro na validação da tela");
            //     $('span.loader').hide();
            //     $('div.maskLoader').hide();
            // }
        }
        return false;
    });


    function enviaPrecos(obj_params, id)
    {
        $.ajax({
            url: '/admin/precos/enviaPrecosEdit/' + id,
            type: 'POST',
            data: {admin_preco: JSON.stringify(obj_params)},
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        })
        .done(function(data) {
            if(data.erro_produto_igual){
                erroProdutoIgual(data.produto_id, data.erro_produto_igual);
                $('span.loader').hide();
                $('div.maskLoader').hide();
            }
            else if(data.erro_promocao_data){
                erroPromocaoCoincidenteDB(data.produto_id, data.erro_promocao_data, data.data_inicio);
                $('span.loader').hide();
                $('div.maskLoader').hide();
            }
            else if(data.sucesso){
                window.location.href = "/admin/precos?estado=Atualizado-sucesso"
            }
            else if(data.erro){
                erroCreate(data.erro);
                $('span.loader').hide();
                $('div.maskLoader').hide();
            }
        })
        .fail(function() {
            console.log("Erro ao enviar preços");
            $('span.loader').hide();
            $('div.maskLoader').hide();
        });
        $.ajaxSetup({
          headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
          }
        });
        
    }

});

