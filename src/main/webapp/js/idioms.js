$(function(){
    $(".bg").height($(document).height());
    var idioms=["一诺千金","莺歌燕舞","星星点点","人来人往","毛手毛脚","一事无成","风和日丽","目中无人","各种各样","古往今来","回天无力","和风细雨","再三再四","南来北往","一表人才","五光十色","忘乎所以","张灯结彩","一五一十","鸟语花香","长年累月","天网恢恢","走马观花","张三李四","你追我赶","十指连心","先入为主","一团和气","安身立命","明明白白","贪生怕死","心直口快","取长补短","一路平安","自由自在","一心一意","骑马找马","头头是道","助人为乐","兴高采烈","自言自语","答非所问","念念不忘","天罗地网","千人一面","东山再起","自以为是","快言快语","旁若无人","舍己为人","面目全非","满面春风","万紫千红","落花流水","百花齐放","一马当先","三心二意","安居乐业","千军万马","瓜田李下","大吃大喝"];
    var num=Math.floor(Math.random()*idioms.length);
    
    stIdiom();
    
    /*页面加载获取第一个成语*/
    function stIdiom(){
        $.ajax({
            type:"post",
            url:"http://www.tuling123.com/openapi/api",
            data:{"key":"0a243fea66484f6daa4234f5f83d7207","info":"成语接龙"+idioms[num], "userid":"123456789"},
            success:function(data){
                console.log(data.text);
                if(data.text.indexOf("进入") == -1){      //没有获取到成语，再调用一次
                    stIdiom();
                }else{      //进入成语接龙模式xxxx
                    $(".idioms").append(data.text.substr(8,4)+"&nbsp;");
                }
            },
            error:function(){
                alert("idioms1 error");
            }
        });
    }
    
    var secidiom;
    /*点击发送成语进行匹配*/
    $("#basic-addon2").click(function(){
        var idiom=$(".form-control").val(); //获取输入框里的成语
        if(""!=idiom){                      //没有输入值
            $(".form-control").val("");         //清空输入的成语
            $(".idioms").append(idiom+"&nbsp;");         //显示输入框里的成语
            $.ajax({
                type:"post",
                url:"http://www.tuling123.com/openapi/api",
                data:{"key":"0a243fea66484f6daa4234f5f83d7207","info":"成语接龙"+idiom, "userid":"123456789"},
                success:function(data){
                    console.log(data.text);
                    if(data.text.indexOf("错了") != -1){
                        $(".over").slideDown();
                        $(".over").append("<span>答错啦</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class='restart'>再来一次</span>");
                        $(".over span").each(function(){
                            $(this).on("click",function(){
                                location.reload();
                            });
                        });
                    }else{
                        $(".idioms").append(data.text+"&nbsp;");
                    }
                },
                error:function(){
                    alert("idioms2 error");
                }
            });
        }else{
            alert("这样接不下去了");
        }
        
    });
    
});