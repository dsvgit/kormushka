$(document).ready(function () {

    var template = $("#test-chart-template");
    if (!template[0]) return;
    var listChartContainer = template.find("#test-linechart");

    var lineChartData = {
        labels : [],
        datasets : [
            {
                label: "My First dataset",
                fillColor : "rgba(151,187,205,0.2)",
                strokeColor : "rgba(151,187,205,1)",
                pointColor : "rgba(151,187,205,1)",
                pointStrokeColor : "#fff",
                pointHighlightFill : "#fff",
                pointHighlightStroke : "rgba(220,220,220,1)",
                data : []
            },
        ]
    };

    var ctx = listChartContainer[0].getContext("2d"); //https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
    var chart = new Chart(ctx);
    var lineChart = chart.Line(lineChartData, {
        responsive: true,
    });

    function costsLineChart(data,labels,result){
        if(result){
            //  select template and inner elements for work


            //  http://www.chartjs.org/docs/#line-chart
            // https://github.com/nnnick/Chart.js/blob/master/samples/line.html

            //  check selected element

            lineChartData.labels = labels;
            lineChartData.datasets[0].data = data;

            lineChart.initialize(lineChartData);


        }
        
    }

    function getHtmlDetail(Days, Months, Years){
        var strHtml = "";
        if(Days){
            strHtml = strHtml + '<a class="detail-stat-day step-detail" data-type="day" data-toggle="modal" href="#">День</a>';
        }
        if(Months){
            strHtml = strHtml + '<a class="detail-stat-month step-detail" data-type="month" data-toggle="modal" href="#">Месяц</a>';
        }
        if(Years){
            strHtml = strHtml + '<a class="detail-stat-year step-detail" data-type="year" data-toggle="modal" href="#">Год</a>';
        }
        return strHtml;
    }


    function getDataGraph(data){
        App.sumOnСostsPaid = data['sumOnСostsPaid'];
        App.sumOnСostsNotPaid = data['sumOnСostsNotPaid'];
        App.sumOnСostsAll = data['sumOnСostsAll'];
        App.labels =  data['labels'];
        App.result = data['result'];
    }
    function personalStatistics(typeDetailStat){
        if(typeDetailStat == "first"){
            $('.personal-costs-paid').html("");
            $('.personal-costs-not-paid').html("");
            $('.personal-costs-all').html("");
            $('.for-personal-costs-all').html("");
            $('.personal-number-paid').html("");
            $('.personal-number-not-paid').html("");
            $('.personal-number-all').html("");
            $('.for-personal-number-all').html("");
        }
        resGraph();

        start_date = $('#datetimepicker1').data('date');
        end_date = $('#datetimepicker2').data('date');
        data = {
        'csrfmiddlewaretoken' : csrf_token,
        'typeUser': 'personal',
        'typeStat': 'personal-stat',
        'typeDetailStat': typeDetailStat,
        'date1': start_date,            
        'date2': end_date
        };
        $.ajax({
            url: "/get-data-for-stat/",
            type: "POST",
            dataType: "json",
            data: data,
            success: function(data) {
                $('.personal-costs-paid').html(data['СostsPaid']);
                $('.personal-costs-not-paid').html(data['СostsNotPaid']);
                $('.personal-costs-all').html(data['СostsAll']);
                $('.for-personal-costs-all').html(data['ForСostsAll']);
                $('.personal-number-paid').html(data['NumberPaid']);
                $('.personal-number-not-paid').html(data['NumberNotPaid']);
                $('.personal-number-all').html(data['NumberAll']);
                $('.for-personal-number-all').html(data['ForAllNumber']);
                
                getDataGraph(data);//запись в глобальную переменную данных для графика

                costsLineChart(App.sumOnСostsPaid,App.labels,App.result);
                $(".linechart-text").html("С " + data['start_date'] + " по " + data['end_date']);
                $('.detail-stat').html(getHtmlDetail(data['detailByDays'],data['detailByMonths'],data['detailByYears']));
                addClickDetail();
                $('#personal-statistics').find(".show-graph:nth(2)").removeClass("glyphicon-eye-open").addClass("glyphicon-eye-close active")
            },
        });
    }

    function usersStatistics(){
        if(typeDetailStat == "first"){
            $('.user-costs-paid').html("");
            $('.user-costs-not-paid').html("");
            $('.user-costs-all').html("");
            $('.for-user-all').html("");
            $('.user-number-paid').html("");
            $('.user-number-not-paid').html("");
            $('.user-number-all').html("");
            $('.for-user-number-all').html("");
        }
        resGraph();

        user = $('#user-stat').attr("data-id");
        if(user){
            data = {
                'csrfmiddlewaretoken' : csrf_token,
                'date1': $('#datetimepicker1').data('date'),            
                'date2': $('#datetimepicker2').data('date'),
                'typeUser': 'users',
                'typeStat': 'personal-stat',
                'typeDetailStat': typeDetailStat,
                'userid': user,
            };
            $.ajax({
                url: "/get-data-for-stat/",
                type: "POST",
                dataType: "json",
                data: data,
                success: function( data ) {
                    $('.user-costs-paid').html(data['СostsPaid']);
                    $('.user-costs-not-paid').html(data['СostsNotPaid']);
                    $('.user-costs-all').html(data['СostsAll']);
                    $('.for-user-all').html(data['ForСostsAll']);  
                    $('.user-number-paid').html(data['NumberPaid']);
                    $('.user-number-not-paid').html(data['NumberNotPaid']);
                    $('.user-number-all').html(data['NumberAll']);
                    $('.for-user-number-all').html(data['ForAllNumber']); 

                    getDataGraph(data);//запись в глобальную переменную данных для графика

                    costsLineChart(App.sumOnСostsPaid,App.labels,App.result);
                    $(".linechart-text").html("С " + data['start_date'] + " по " + data['end_date']);
                    $('.detail-stat').html(getHtmlDetail(data['detailByDays'],data['detailByMonths'],data['detailByYears']));
                    addClickDetail();
                    $('#users-statistics').find(".show-graph:nth(2)").removeClass("glyphicon-eye-open").addClass("glyphicon-eye-close active")
                }
            });
        }
        costsLineChart(App.sumOnСostsPaid,App.labels,App.result);
    }

    function departsStatistics(){
        if(typeDetailStat == "first"){
            $('.depart-costs-paid').html("");
            $('.depart-costs-not-paid').html("");
            $('.depart-costs-all').html("");
            $('.for-depart-all').html("");
            $('.depart-number-paid').html("");
            $('.depart-number-not-paid').html("");
            $('.depart-number-all').html("");
        }
        resGraph();

        depart = $('#depart-stat').attr("data-id");
        if(depart){
            data = {
            'csrfmiddlewaretoken' : csrf_token,
            'date1': $('#datetimepicker1').data('date'),            
            'date2': $('#datetimepicker2').data('date'),
            'typeStat': 'depart-stat',
            'typeDetailStat': typeDetailStat,
            'departid': depart,
            };
            $.ajax({
                url: "/get-data-for-stat/",
                type: "POST",
                dataType: "json",
                data: data,
                success: function( data ) {
                    $('.depart-costs-paid').html(data['СostsPaid']);
                    $('.depart-costs-not-paid').html(data['СostsNotPaid']);
                    $('.depart-costs-all').html(data['СostsAll']);
                    $('.for-depart-all').html(data['ForСostsAll']);
                    $('.depart-number-paid').html(data['NumberPaid']);
                    $('.depart-number-not-paid').html(data['NumberNotPaid']);
                    $('.depart-number-all').html(data['NumberAll']);
                    
                    getDataGraph(data);//запись в глобальную переменную данных для графика
                    
                    costsLineChart(App.sumOnСostsPaid,App.labels,App.result);
                    $(".linechart-text").html("С " + data['start_date'] + " по " + data['end_date']);
                    $('.detail-stat').html(getHtmlDetail(data['detailByDays'],data['detailByMonths'],data['detailByYears']));
                    addClickDetail();
                    $('#departs-statistics').find(".show-graph:nth(2)").removeClass("glyphicon-eye-open").addClass("glyphicon-eye-close active")
                }
            });
        }else{
            costsLineChart(App.sumOnСostsPaid,App.labels,App.result);
        }
    }

    function organizationStatistics(){
        if(typeDetailStat == "first"){
            $('.costs-paid').html("");
            $('.costs-not-paid').html("");
            $('.costs-all').html("");
            $('.number-paid').html("");
            $('.number-not-paid').html("");
            $('.number-all').html("");
        }
        resGraph();

        data = {
            'csrfmiddlewaretoken' : csrf_token,
            'date1': $('#datetimepicker1').data('date'),            
            'date2': $('#datetimepicker2').data('date'),
            'typeStat': 'organization-stat',
            'typeDetailStat': typeDetailStat,
        };
        $.ajax({
            url: "/get-data-for-stat/",
            type: "POST",
            dataType: "json",
            data: data,
            success: function( data ) {
                $('.costs-paid').html(data['СostsNotPaid']);
                $('.costs-not-paid').html(data['СostsPaid']);
                $('.costs-all').html(data['СostsAll']);
                $('.number-paid').html(data['NumberNotPaid']);
                $('.number-not-paid').html(data['NumberPaid']);
                $('.number-all').html(data['NumberAll']);
                
                getDataGraph(data);//запись в глобальную переменную данных для графика

                costsLineChart(App.sumOnСostsPaid,App.labels,App.result);
                $(".linechart-text").html("С " + data['start_date'] + " по " + data['end_date']);
                $('.detail-stat').html(getHtmlDetail(data['detailByDays'],data['detailByMonths'],data['detailByYears']));
                addClickDetail();
                $('#organization-statistics').find(".show-graph:nth(2)").removeClass("glyphicon-eye-open").addClass("glyphicon-eye-close active")
            }
        });
    }

    function conditionStatistics (href,typeDetailStat){
        //Статистика личная
        if(href=='#personal-statistics'){ personalStatistics(typeDetailStat); }

        //Статистика пользователя
        if(href=='#users-statistics'){ usersStatistics(typeDetailStat); }

        //Статистика отдела
        if(href=='#departs-statistics'){ departsStatistics(typeDetailStat);  }

        //Статистика организации
        if(href=='#organization-statistics'){ organizationStatistics(typeDetailStat); }
    }

	$('#statistics-tab a').click(function (e) {
        e.preventDefault();
        if($(this).parent().attr('class')!='active') {
            typeDetailStat = "first";
            clerEye();
            $(this).tab('show');
            var href = $(this).attr('href');
            conditionStatistics(href,typeDetailStat);
        }	
	})

    $('#button-show').click(function (e){
        typeDetailStat = "first";
        e.preventDefault()
        clerEye();
        var href = $('#statistics-tab li.active a').attr('href');
        conditionStatistics(href,typeDetailStat);
    })
	
	$( "#user-stat").autocomplete({
        source: function( request, response ) {
        data = {
            'csrfmiddlewaretoken' : csrf_token,
            name: request.term,
            type: 'all',
        },
        $.ajax({
            url: "/get-users-by-name/",
            type: "POST",
            dataType: "json",
            data: data,
            success: function( data ) {
                arr = [];
                _.each(data,function(el){
                    arr.push({
                        "value": el.label,
                        "label": el.label,
                        "userid":el.userid,
                        "departid":el.departid,
                    });
                });
                response(arr);
            }
        });
        },
        minLength: 3,
        select: function( event, ui ) { //Выбор пункта
        	$("#user-stat").attr("data-id",ui.item.userid);
        },
        open: function() { //открытие списка
        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
        },
        close: function() {
        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
        }
    });

	$( "#depart-stat").autocomplete({
        source: function( request, response ) {
        data = {
            'csrfmiddlewaretoken' : csrf_token,
            depart: request.term,
        },
        $.ajax({
            url: "/get-depart-by-name/",
            type: "POST",
            dataType: "json",
            data: data,
            success: function( data ) {
                arr = [];
                _.each(data,function(el){
                    arr.push({
                        "value": el.label,
                        "label": el.label,
                        "departid":el.departid,
                    });
                });
                response(arr);
            }
        });
        },
        minLength: 0,
        select: function( event, ui ) { //Выбор пункта
        	$("#depart-stat").attr("data-id",ui.item.departid);
        },
        open: function() { //открытие списка
        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
        },
        close: function() {
        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
        }
    });

    $( ".period-purchase").click(function (){
        var type = $(this).attr('data-type');
        data = {
            'csrfmiddlewaretoken' : csrf_token,
            'type': type,
        };
        $.ajax({
            url: "/get-date-for-period/",
            type: "POST",
            dataType: "json",
            data: data,
            success: function( data ) {
                $('#datetimepicker1').data("DateTimePicker").date(data['date1']);
                $('#datetimepicker2').data("DateTimePicker").date(data['date2']);
            }
        });
    });

    $(".show-graph").click(function(){
        if(!$(this).hasClass("active")){
            $(this).parents("table").find("span.show-graph.active").removeClass("active glyphicon-eye-close").addClass("glyphicon-eye-open")
            $(this).removeClass("glyphicon-eye-open").addClass("glyphicon-eye-close active")
            var type = $(this).attr('data-type');
            var sum = [];
            if (type == "paid"){
               sum = App.sumOnСostsPaid;
            }else if(type == "not-paid"){
                sum = App.sumOnСostsNotPaid;
            }else if(type == "all"){
               sum = App.sumOnСostsAll;
            }
            costsLineChart(sum,App.labels,App.result);
        }
    })

	$(function () {
        $('#datetimepicker1').datetimepicker({
            locale: 'ru',
            format: 'DD/MM/YYYY',
            viewMode: 'days'
        });
    });

	$(function () {
        $('#datetimepicker2').datetimepicker({
            locale: 'ru',
            format: 'DD/MM/YYYY',
            viewMode: 'days'
        });
    });

    function clerEye(){
        $('.show-graph').removeClass("active glyphicon-eye-close").addClass("glyphicon-eye-open");
    }

    function addClickDetail(){
        $(".step-detail").click(function(e){
            typeDetailStat = $(this).attr('data-type');
            e.preventDefault()
            clerEye();
            var href = $('#statistics-tab li.active a').attr('href');
            conditionStatistics(href,typeDetailStat);
        });
    }

    var $range = $(".js-range-slider");

	personalStatistics("first"); // Select tab by name
});