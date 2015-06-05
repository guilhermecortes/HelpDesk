$(function (){
    if($('input[name=redirect]').val() == "true")
    {
        $('span.loader').show();
        $('div.maskLoader').show();
        window.location.href = "/admin/produtos";
    }

    jQuery.validator.setDefaults({
      debug: true,
      success: "valid"
    });
    //validação form
    var form = $( ".formValidate" );
    form.validate({
        rules: {
            'admin_produto[nome]': 'required',
            'admin_produto[codigo_interno]': 'required',
            'admin_produto[quantidade]': {
                required: true,
                min: 1
            },
            'admin_produto[descricao]': 'required'
        },
        messages: {
            'admin_produto[nome]':{
              required: "Por favor, insira o nome"
            },
            'admin_produto[codigo_interno]':{
              required: "Por favor, insira o código interno"
            },
            'admin_produto[quantidade]': {
                required: 'Por favor, insira a quantidade',
                min: 'O menor valor permitido é 1'
            },
            'admin_produto[descricao]': 'Por favor, insira uma descrição'
        },
        errorPlacement: function(error, element) {
            if (element.attr("name") == "admin_produto[qtd_minima]" )
                $(element).closest('div#spinner2').parent().append(error);
            else
                error.insertAfter(element);
        }
    });

    //spinner
    $('#spinner1').spinner2({value:1, min: 1});
    $('#spinner2').spinner2({value:1, min: 1});

    //upload imagem
    var produto_id = $('input[name=id]').val();
    var result;
    var uploadObj = $("#fileuploader").uploadFile({
        url: "/admin/imagens/" + produto_id,
        allowedTypes:"png,gif,jpg,jpeg",
        multiple: true,
        autoSubmit:false,
        fileName:"imagens",
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        showDelete: true,
        showAbort: false,
        showFileCounter: false,
        showProgress: true,
        showDone: false,
        dragDropStr: "<span><b>Drag&Drop Imagens</b></span>",
        cancelStr:"Cancelar",
        doneStr:"Pronto",
        deletelStr: "",
        multiDragErrorStr: "Múltiplos arquivos Drag &amp; Drop não são permitidos.",
        extErrorStr: "não é permitido. Extensões permitidas: ",
        sizeErrorStr: "não é permitido. Tamanho máximo permitido: ",
        uploadErrorStr: "Upload não permitido",
        onSelect:function(files)
        {
            $(files).each(function(index, el) {
                //preview de img
                if (/^image/.test( el.type)){ // only image file
                    var reader = new FileReader(); // instance of the FileReader
                    reader.readAsDataURL(el); // read the local file
         
                    reader.onloadend = function(){ // set image data as background of div
                        result = this.result;
                        $('.ajax-file-upload-filename').each(function (index, val){
                            if($(val).text() == el.name){
                                $(val).parent().prepend('<img class="previewImg" src="'+result+'" />');
                                return false;
                            }
                        });
                    }
                }
            });
            return true; //to allow file submission.
        },
        onSuccess:function(files,data,xhr)
        {
            // console.log("sucesso");
            // console.log(data);
            // console.log(xhr);
        },
        deleteCallback: function (data, pd) {
            // console.log("delete callback");
            // console.log(data);
            // console.log(pd);
            $.ajax({
                url: '/admin/imagens/' + data.id,
                type: 'DELETE',
                data: {produto_id: data.produto_id},
            })
            .done(function() {
                pd.statusbar.remove(); //remove div do anexo.
            })
            .fail(function() {
                console.log("erro ao excluir imagem");
            });
        }
    });

    $.ajaxSetup({
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
    });

    $("#startUpload").click(function()
    {
        uploadObj.startUpload();
    });

    $('.btn-submit').click(function(event) {
        if(form.valid()){
            $('span.loader').show();
            $('div.maskLoader').show();
        }
    });

    var id;
    var prod;
    var div_excluir;
    $('.btn-exclui-imagem').click(function(event) {
        id = $(this).attr('id');
        prod = $(this).attr('produto');
        div_excluir = $(this).closest('div.ajax-file-upload-statusbar');

        $.ajax({
            url: '/admin/imagens/' + id,
            type: 'DELETE',
            data: {produto_id: prod},
        })
        .done(function() {
            console.log("success");
            $(div_excluir).remove();
        })
        .fail(function() {
            console.log("erro ao excluir imagem");
        });
        
    });

    var target;
    $(".btn-continuar-img").click(function() {
        target = $('.panel-heading .nav.nav-tabs').find('li.active');
        $(target).removeClass('active');
        $('.panel-heading .nav.nav-tabs').find('a#tab-img').parent().addClass('active');
    });


});
