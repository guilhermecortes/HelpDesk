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

  //validação form
  $(".formValidate").validate({
    rules: {
      'admin_banner[titulo]': 'required'
    },
    messages: {
      'admin_banner[titulo]':{
        required: "Por favor, insira um título"
      }
    }
  });

});
