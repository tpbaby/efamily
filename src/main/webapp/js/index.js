
   
   
   /*加载笑话，接口*/

function addTxt(num){
    $.ajax({
        type : "post",
        url : "http://route.showapi.com/341-1",
        data : {
            "showapi_appid" : "39126",
            "showapi_sign" : "852025b7f899409c92314e4a8ffbbbed",
            "page" : num,
            "maxResult":2
        },
        dataType : "json",
        success : function(data){
            //alert(data.showapi_res_body.contentlist[0].text);
            $(".smail-txt").html(data.showapi_res_body.contentlist[0].text);
            var textlength = data.showapi_res_body.contentlist[0].text.length;
            if(textlength > 80){
                $(".smail-txt").css({"font-size":"13px"});
            }else if(textlength>110){
                $(".smail-txt").css({"font-size":"12px"});
            }/*else if(textlength>130){
                
            }*/
        },
        error : function(){
            alert("请求服务器资源失败");
            //$(".more-info-lucy").html("服务器开小差啦，请过会再来查看哦~");
        }
    })
}

var change = document.getElementById("changebtn");
    
change.addEventListener("click",changefun,false);
    
function changefun(){
    var a = Math.floor(Math.random()*(91)+10);
    //alert(a);
    addTxt(a);
}
    
/*初始化一个*/
addTxt(Math.floor(Math.random()*(91)+10));
   
function addWeather(){
    
    if(navigator.geolocation){
        //显示具体的城市
        var cityObj = new BMap.LocalCity();
        
        cityObj.get(getCurrentCity);
        
    }else{
        console.log("不支持定位");
    }
    
    var cityName = null;
    
    function getCurrentCity(cs){
        cityName = cs.name.substring(0,cs.name.length-1);
        
        $("#location").text(cityName);

        //alert("您所在城市是："+cityName);
        
         //请求图灵机器人的天气的数据
        $.post("http://www.tuling123.com/openapi/api", {
            "key" : "b8cdd918b4464327b751741801cf0691",
            info : cityName+"天气",
            userid : "123987a"
        }, function(data) {
            //alert(data.text); 
            var bindDatas = "";
            var msg = data.text;
            var cityName = msg.substring(0, msg.indexOf(":"));
            console.log("城市:"+cityName);
          
            var newstr = msg.substring(msg.indexOf(":") + 1);

            var datasArray = newstr.split(";");
            
            var day = datasArray[0].substring(0,datasArray[0].indexOf(","));
            var weather = datasArray[0].substring(datasArray[0].indexOf(",") + 1).split(" ");
            
            $("#date").text(day);
            
            $("#cur").text(weather[1]);
            
            $("#weather").text(weather[2]);
            
            $("#temperature").text(weather[0]);
            
            $("#direction").text(weather[3]);
            
            console.log(weather[2]);
            
            var choose = weather[2];
            
            
            
            if(choose.indexOf("晴")>-1){
                $(".weather-box").css({"background-image":"url(/efamily/images/main/weather/sun.jpg)"});
            }else if(choose.indexOf("多云")>-1){
                $(".weather-box").css({"background-image":"url(/efamily/images/main/weather/duoyun.jpg)"});
            }else if(choose.indexOf("雨")>-1){
                $(".weather-box").css({"background-image":"url(/efamily/images/main/weather/xiayu.gif)"});
            }else if(choose.indexOf("阴")>-1){
                $(".weather-box").css({"background-image":"url(/efamily/images/main/weather/yin.jpg)"});
            }

        }, "json");
        
    }
    
   
}

    addWeather();
       

    