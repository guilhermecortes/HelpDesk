$(document).ready(function() {

    $(window).load(function(){
        setTimeout(function(){
            $('span.loader').hide();
            $('div.maskLoader').hide();
            $('#usuarios, #faturamento, #pedidos').removeAttr('style');
        }, 3000);
    });
    //datetime picker
    var dt_inicial, dt_final, dt_inicial_hid, dt_final_hid;
    $(".date-picker1").datetimepicker({
        language: 'pt-BR',
        format: "dd/mm/yyyy",
        autoclose: true,
        minuteStep: 30,
        minView: 2
    }).on('hide', function(e){
        if($('input[name="data_inicial"]').val() != "")
            $(".date-picker2").datetimepicker('setStartDate', $('input[name="data_inicial"]').val());
        $('input[name="data_final"]').focus();
    }).on('change', function(e){
        dt_inicial = $(this).find('input').val().split("/");
        dt_inicial = dt_inicial[2] + "-" + dt_inicial[1] + "-" + dt_inicial[0];
        dt_inicial_hid =$( ".DateRangeSelector-item:eq(0)").find('input');
        $(dt_inicial_hid).val(dt_inicial);
        $(dt_inicial_hid).trigger('change');
    });

    $(".date-picker2").datetimepicker({
        language: 'pt-BR',
        format: "dd/mm/yyyy",
        autoclose: true,
        minuteStep: 30,
        minView: 2
    }).on('change', function(e){
        dt_final = $(this).find('input').val().split("/");
        dt_final = dt_final[2] + "-" + dt_final[1] + "-" + dt_final[0];
        dt_final_hid = $( ".DateRangeSelector-item:eq(1)").find('input');
        $(dt_final_hid).val(dt_final);
        $(dt_final_hid).trigger('change');
    });

    $(".date-picker3").datetimepicker({
        language: 'pt-BR',
        format: "dd/mm/yyyy",
        autoclose: true,
        minuteStep: 30,
        minView: 2
    }).on('hide', function(e){
        if($('input[name="data_inicial_chart_valor"]').val() != "")
            $(".date-picker4").datetimepicker('setStartDate', $('input[name="data_inicial_chart_valor"]').val());
        $('input[name="data_final_chart_valor"]').focus();
    });

    $(".date-picker4").datetimepicker({
        language: 'pt-BR',
        format: "dd/mm/yyyy",
        autoclose: true,
        minuteStep: 30,
        minView: 2
    });


    //$('a[href="#usuarios"]').click(function (){
    //    //console.log("opa");
    //});

    //Atualizar gráfico de valores
    var dt_inicial_chart_valor, dt_final_chart_valor;
    $('.atualizaChartValor').click(function(){
        $('span.loader').show();
        $('div.maskLoader').show();
        dt_inicial_chart_valor = $('input[name=data_inicial_chart_valor]').val().split("/");
        dt_inicial_chart_valor = dt_inicial_chart_valor[2] + "-" + dt_inicial_chart_valor[1] + "-" + dt_inicial_chart_valor[0];
        dt_final_chart_valor = $('input[name=data_final_chart_valor]').val().split("/");
        dt_final_chart_valor = dt_final_chart_valor[2] + "-" + dt_final_chart_valor[1] + "-" + dt_final_chart_valor[0];
        rangeValor(dt_inicial_chart_valor, dt_final_chart_valor);
    });


} );

var plot3;

//Gráfico de usuários
function chartUsuarios(total, novos){
    var dadosUsuarios = [['Total de usuários', total], ['Novos usuários', novos]];
    var plot1 = $.jqplot('chartUsuarios', [dadosUsuarios], {
        animate: true,
        animateReplot: true,
        grid: {
            drawBorder: false,
            shadow: false,
            background: '#fff'
        },
        //title: 'Total de Usuários vs. Novos Usuários (últimos 30 dias)',
        series:[{renderer:$.jqplot.BarRenderer}],
        seriesDefaults: {
            renderer: $.jqplot.BarRenderer,
            rendererOptions:{
                barMargin: 25,
                barWidth: 100
            },
            pointLabels:{show:true, stackedValue: true},
            color: '#3DA6D3'
        },
        axesDefaults: {
            tickRenderer: $.jqplot.CanvasAxisTickRenderer ,
            tickOptions: {
                angle: 0,
                fontSize: '12pt'
                //showGridline: false
            }
        },
        axes: {
            xaxis: {
                renderer: $.jqplot.CategoryAxisRenderer
            }
        }
    });
}

//Gráfico de pedidos
function chartPedidos(proc, transp, ent, canc, rep){
    var dadosPedidos = [['Processando', proc], ['Transportadora', transp], ['Entregue', ent], ['Cancelado', canc], ['Reprovado', rep]];

    plot3 = jQuery.jqplot('chartPedidos', [dadosPedidos], {
            grid: {
                drawBorder: false,
                shadow: false,
                background: '#fff'
            },
            //title: 'Pedidos',
            seriesDefaults: {
                shadow: false,
                renderer: jQuery.jqplot.PieRenderer,
                rendererOptions: {
                    sliceMargin: 4,
                    showDataLabels: true
                }
            },
            legend: {show: true, location: 'e'}
        }
    );
}

//var line1=[['23-May-14', 578.55], ['20-Jun-14', 566.5], ['25-Jul-14', 480.88], ['22-Aug-14', 509.84],
//    ['26-Sep-14', 454.13], ['24-Oct-14', 379.75], ['21-Nov-14', 303], ['26-Dec-14', 308.56],
//    ['23-Jan-14', 299.14], ['20-Feb-14', 346.51], ['20-Mar-14', 325.99], ['24-Apr-14', 386.15]];
function chartValores(dados1){

    var plot1 = $.jqplot('chartValores', [dados1], {
        animate: true,
        animateReplot: true,
        grid: {
            drawBorder: false,
            shadow: false,
            background: '#fff'
        },
        //title: 'Valor Arrecadado',
        axes:{
            xaxis:{
                renderer:$.jqplot.DateAxisRenderer,
                tickOptions:{
                    formatString:'%#d&nbsp;%b'
                }
            },
            yaxis:{
                tickOptions:{
                    formatString:'R$%.2f'
                }
            }
        },
        highlighter: {
            show: true,
            sizeAdjust: 7.5
        },
        cursor: {
            show: false
        }
    });
    plot1.replot( {resetAxes: true } );
}

function rangeValor(dt_inicial, dt_final){
    $.ajax({
        url: '/admin/relatorios/dados_chart_valores',
        type: 'GET',
        data: { data_inicial: dt_inicial, data_final: dt_final}
    }).done(function(data){
        if(data.length > 0){
            chartValores(data);
        }
        else{
            $('#chartValores').html('<span class="semRegistroChart">Não existe nenhum registro para o período escolhido.</span>')
        }
        $('span.loader').hide();
        $('div.maskLoader').hide();
    }).fail(function(){
        console.log("Erro ao listar valores");
    });
}