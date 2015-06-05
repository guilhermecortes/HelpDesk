$(function (){
    // if($('input[name=redirect]').val() == "true")
    // {
    //     $('span.loader').show();
    //     $('div.maskLoader').show();
    //     window.location.href = "/admin/destaques";
    // }

    // jQuery.validator.setDefaults({
    //   debug: true,
    //   success: "valid"
    // });
    //validação form
    // var form = $( ".formValidate" );
    $( ".formValidate" ).validate({
        rules: {
            'admin_destaque[nome]': 'required',
            'admin_destaque[data_inicio]': 'required',
            'admin_destaque[data_fim]': 'required'
            // 'admin_destaque[imagem]': {
            //     required: true,
            // }
        },
        messages: {
            'admin_destaque[nome]':{
              required: "Por favor, insira o nome"
            },
            'admin_destaque[data_inicio]': 'Por favor, insira uma data início',
            'admin_destaque[data_fim]': 'Por favor, insira uma data fim'
            // 'admin_destaque[imagem]': 'Por favor, insira uma imagem'
        },
        errorPlacement: function(error, element) {
          if (element.attr("name") == "admin_destaque[data_inicio]" || element.attr("name") == "admin_destaque[data_fim]" )
              $(element).closest('div.col-sm-2').append(error);
          else if ( element.attr("name") == "admin_destaque[imagem]")
              $(element).closest('div.col-sm-5').append(error);
          else
              error.insertAfter(element);
        }
    });

    //datetime picker
    $(".date-picker1").datetimepicker({
        language: 'pt-BR',
        format: "dd/mm/yyyy",
        autoclose: true,
        startDate: new Date(),
        minuteStep: 30,
        minView: 2
    }).on('hide', function(e){
        if($('input[name="admin_destaque[data_inicio]"]').val() != "")
            $(".date-picker2").datetimepicker('setStartDate', $('input[name="admin_destaque[data_inicio]"]').val());
        $('input[name="admin_destaque[data_fim]"]').focus();
    });
    $(".date-picker2").datetimepicker({
        language: 'pt-BR',
        format: "dd/mm/yyyy",
        autoclose: true,
        minuteStep: 30,
        minView: 2
    }); 


    // var id;
    // var prod;
    // var div_excluir;
    // $('.btn-exclui-imagem').click(function(event) {
    //     id = $(this).attr('id');
    //     prod = $(this).attr('produto');
    //     div_excluir = $(this).closest('div.ajax-file-upload-statusbar');

    //     $.ajax({
    //         url: '/admin/imagens/' + id,
    //         type: 'DELETE',
    //         data: {produto_id: prod},
    //     })
    //     .done(function() {
    //         console.log("success");
    //         $(div_excluir).remove();
    //     })
    //     .fail(function() {
    //         console.log("erro ao excluir imagem");
    //     });
        
    // });

    // var target;
    // $(".btn-continuar-img").click(function() {
    //     target = $('.panel-heading .nav.nav-tabs').find('li.active');
    //     $(target).removeClass('active');
    //     $('.panel-heading .nav.nav-tabs').find('a#tab-img').parent().addClass('active');
    // });

    // $('.btn-submit').click(function(event) {
    //     if(form.valid()){
    //         $('span.loader').show();
    //         $('div.maskLoader').show();
    //         form.submit();
    //     }
    // });

    $('#fancybox-posicao').fancybox(function(event) {
        
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
        // minLength: 2,
        select: function(event, ui) {
            $('input[name="admin_destaque[produto_id]"]').val(ui.item.id);
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

        //animaçao hover excluir imagem
        $('.thumbnail').hover(function () {
          $('.descricao', this).stop().animate({
              bottom: 0
          }, 200);
        }, function () {
          $('.descricao', this).stop().animate({
              bottom: '-100%'
          }, 200);
        });
        
        //não recarregar a página inteira se excluir imagem
        $('.excluirImagem').on('click', function () {
            $('span.loader').show();
            $('div.maskLoader').show();
            $.post(this.href, $(this).serialize(), null, 'script');
            return false;
        });

});
