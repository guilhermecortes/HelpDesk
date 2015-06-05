$(function (){

  //datetime picker
  $(".date-picker1").datetimepicker({
    language: 'pt-BR',
    format: "dd/mm/yyyy",
    autoclose: true,
    startDate: new Date(),
    minuteStep: 30,
    minView: 2
    }).on('hide', function(e){
      if($('input[name="admin_conteudo[data_inicio]"]').val() != "")
        $(".date-picker2").datetimepicker('setStartDate', $('input[name="admin_conteudo[data_inicio]"]').val());
        $('input[name="admin_conteudo[data_fim]"]').focus();
      });

  $(".date-picker2").datetimepicker({
    language: 'pt-BR',
    format: "dd/mm/yyyy",
    autoclose: true,
    minuteStep: 30,
    minView: 2
  });

  //validação form
  $(".formValidate").validate({
    rules: {
      'admin_conteudo[titulo]': 'required',
      'admin_conteudo[data_inicio]': 'required',
      'admin_conteudo[resumo]': 'required',
      'admin_conteudo[texto]': 'required'
    },
    messages: {
      'admin_conteudo[titulo]':{
        required: ""
      },
      'admin_conteudo[data_inicio]':{
        required: ""
      },
      'admin_conteudo[resumo]':{
        required: ""
      },
      'admin_conteudo[texto]':{
        required: ""
      }
    },
    errorPlacement: function(error, element) {
      if (element.attr("name") == "admin_conteudo[data_inicio]" )
          $(element).closest('div.col-lg-4').parent().append(error);
      else
          error.insertAfter(element);
    }
  });

});
