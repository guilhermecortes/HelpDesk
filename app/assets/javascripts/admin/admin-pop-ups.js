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
      if($('input[name="admin_pop_up[data_inicio]"]').val() != "")
        $(".date-picker2").datetimepicker('setStartDate', $('input[name="admin_pop_up[data_inicio]"]').val());
        $('input[name="admin_pop_up[data_fim]"]').focus();
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
      'admin_pop_up[nome]': 'required',
      'admin_pop_up[data_inicio]': 'required'
    },
    messages: {
      'admin_pop_up[nome]':{
        required: ""
      },
      'admin_pop_up[data_inicio]':{
        required: ""
      }
    },
    errorPlacement: function(error, element) {
      if (element.attr("name") == "admin_pop_up[data_inicio]" || element.attr("name") == "admin_pop_up[imagem]" )
          $(element).closest('div.col-lg-4').append(error);
      else
          error.insertAfter(element);
    }
  });

});
