$(function(){
    var datas=[],date=[],min=[],max=[],temptab=[[],[],[],[]];
    var minT,cityName;   //minT是最低温度里的最小值,避免图的下半部分都是空的 
    $("#basic-addon2").click(function(){
        $("min_tab").empty();
        $.ajax({
            type:"post",
            url:"http://www.tuling123.com/openapi/api",
            data:{"key":"0a243fea66484f6daa4234f5f83d7207","info":$(".form-control").val()+"天气", "userid":"123456789"},
            success:function(data){
                //alert(data.text);
/*                var data={
                    text:"南京:6月7号 周六,19-29° 27° 雪 东南风4-5级;6月18号 周日,21-29° 晴 东南风3-4级;6月19号 周一,22-27° 多云 东南风3-4级;6月20号 周二,21-28° 阴 东风3-4级;"
                }*/
                var str=data.text;
                cityName=str.substring(0,str.indexOf(':')); datas=str.substring(str.indexOf(':')+1,str.lastIndexOf(';')).split(';');    //除去城市
                if($(document).width() < 768){      //移动端
                    if(data.text.indexOf('哪个') != -1){      //输入信息有误
                        alert(data.text);
                    }else{
                        //解析数据
                        for(var i=0;i<datas.length;i++){
                            temptab[i][0]=datas[i].substring(0,datas[i].indexOf(" "));
                            temptab[i][1]=datas[i].substring(datas[i].indexOf(",")+1,datas[i].indexOf("°")+1);
                            temptab[i][2]=datas[i].substring(datas[i].lastIndexOf("°")+2,datas[i].indexOf(" ",datas[i].lastIndexOf("°")+2));
                            temptab[i][3]=datas[i].substr(datas[i].lastIndexOf(" ")+1);
                            if(datas[i].indexOf("°") != datas[i].lastIndexOf("°")){
                                temptab[i][4]=datas[i].substring(datas[i].indexOf("°")+2,datas[i].lastIndexOf("°")+1);
                            }
                        }
                        var imgPath="w1",weamsg;
                        for(var i=0;i<temptab.length;i++){
                            if(temptab[i][2].indexOf("云") != -1){
                                imgPath="w1";
                            }else if(temptab[i][2].indexOf("阴") != -1){
                                imgPath="w2";
                            }else if(temptab[i][2].indexOf("晴") != -1){
                                imgPath="w19";
                            }else if(temptab[i][2].indexOf("雨") != -1){
                                imgPath="w18";
                            }else if(temptab[i][2].indexOf("霾") != -1){
                                imgPath="w14";
                            }else if(temptab[i][2].indexOf("雷") != -1){
                                imgPath="w7";
                            }else if(temptab[i][2].indexOf("雪") != -1){
                                imgPath="w6";
                            }
                            if(i == 0){     //为今天天气赋值
                                weamsg="<div class='min_tabone'><div class='msgone'><span>"+temptab[0][4]+"</span><span><div>"+temptab[0][0]+"</div><div>"+temptab[0][2]+"</div><div><span>"+temptab[0][1]+"</span></div></span><div>"+temptab[0][3]+"</div></div><img src='images/weather/"+imgPath+".png'></div>";
                            }else{          //为剩下三天天气赋值
                                weamsg+="<div class='min_tabs'><span>"+temptab[i][0]+"</span><img width='100%' src='images/weather/"+imgPath+".png'><span>"+temptab[i][3]+"</span><span>"+temptab[i][1]+"</span></div>";
                            }
                        }
                        $(".min_tab").html(weamsg);
                    }
                }else{                              //PC端
                    if(data.text.indexOf('哪个') != -1){      //输入信息有误
                        //alert(data.text);
                        for(var i=0;i<datas.length;i++){
                            console.log(datas[i]);
                            date[i]=datas[i].substr(0,5);
                        }
                    }else{                                  //获取天气后解析
                        for(var i=0;i<datas.length;i++){
                            date[i]=datas[i].substring(0,datas[i].indexOf(" ")); min[i]=datas[i].substring(datas[i].indexOf(',')+1,datas[i].indexOf('-'));
                            max[i]=datas[i].substring(datas[i].indexOf('-')+1,datas[i].indexOf('°'));
                        }
                        //获取最低温度里的最小值
                        minT=min[0];
                        for(var i=0;i<min.length;i++){
                            if(min[i]<minT){
                                minT=min[i];
                            }
                        }
                        //显示天气折线图
                        showWeather(data);
                    }
                }
            },
            error:function(){
                alert("weather error");
            }
        });
    });

    
    function showWeather(data){
        $("#weachart").css({"height":"90%","width":"100%"});
        var myChart=echarts.init(document.getElementById("weachart"));
        option={
/*            title:{
                text:cityName+"天气"
            },*/
            tooltip:{
                trigger:'axis'
            },
            legend:{
                data:['最高气温','最低气温']
            },
            xAxis:  {
                type: 'category',   //该类型时必须通过data设置类目数据
                data: [date[0],date[1],date[2],date[3]]
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} °C'
                },
                min: minT-3
            },
            series: [
                {
                    name:'最高气温',
                    type:'line',
                    data:[max[0], max[1], max[2], max[3]],
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                },
                {
                    name:'最低气温',
                    type:'line',
                    data:[min[0], min[1], min[2], min[3]],
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'},
                        ]
                    }
                }
            ]
        };
        myChart.setOption(option);
        $("#weather").css({"display":"none"});
        //报表自适应
        window.onresize=myChart.resize;
        $("#wechart").resize(myChart.resize);
        myChart.setOption(option);
    }
    
});