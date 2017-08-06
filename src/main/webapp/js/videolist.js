
    $.ajax({
        type:"get",
        url:"./learn/1000?userId=1000",
        dataType:"json",
        success:function(data){
           // alert(data);
            var courseimg ="/efamily"+data.courseImg;

            $("#class-img").attr({"src":courseimg});
            $("#class-name").text(data.courseName);
            $("#class-author").text(data.courseAuthor);
            $("#class-num").text(data.videoList.length);


            //$("#peritem-box").html("");
            var $appendHTml = "";
            $.each(data.videoList,function(index,value){
                if(value.hasLearned){
                    $appendHTml += "<li class='list' role='"+data.courseId+"/"+value.videoId+"'>"+
                        "<span class='glyphicon glyphicon-minus-sign class-learned' aria-hidden='true'></span>"+
                        "<span>"+value.videoName+"</span>"+
                        "<span class='peritem-study'>开始学习</span></li>";
                }else{
                    $appendHTml += "<li class='list' role='"+data.courseId+"/"+value.videoId+"'>"+
                        "<span class='glyphicon glyphicon-minus-sign' aria-hidden='true'></span>"+
                        "<span>"+value.videoName+"</span>"+
                        "<span class='peritem-study'>开始学习</span></li>";
                }
            });



            $("#videolist").html($appendHTml);
        },
        error:function(){
            alert("error!");
        }
    })


    
    
    $(function(){
        //updateclass(json1);
        //初始化
        //updateclass1(json3)
        
         var flag = false;
        
        /*视频列表的点击效果*/
        $("#list-class li").click(function(){
            $(this).addClass("clickshow").siblings().removeClass("clickshow");
            /*小屏幕就隐藏*/
            if(window.innerWidth <= 768){
                flag = false;
                $(".video-catedory").slideUp();
            }
            var role = $(this).attr("role");

            console.log(role);
            
            /*ajax动态向数据库发送请求*/
            /*f(role == "js1"){
               // updateclass(json1);
            }
            else if(role == "jquery1"){
               // updateclass(json2);
            }*/

            $.ajax({
                type:"get",
                url:"./learn/"+role+"?userId=1000",
                dataType:"json",
                success:function(data){
                    // alert(data);
                    var courseimg ="/efamily"+data.courseImg;

                    $("#class-img").attr({"src":courseimg});
                    $("#class-name").text(data.courseName);
                    $("#class-author").text(data.courseAuthor);
                    $("#class-num").text(data.videoList.length);


                    //$("#peritem-box").html("");
                    var $appendHTml = "";
                    $.each(data.videoList,function(index,value){
                        if(value.hasLearned){
                            $appendHTml += "<li class='list' role='"+data.courseId+"/"+value.videoId+"'>"+
                                "<span class='glyphicon glyphicon-minus-sign class-learned' aria-hidden='true'></span>"+
                                "<span>"+value.videoName+"</span>"+
                                "<span class='peritem-study'>开始学习</span></li>";
                        }else{
                            $appendHTml += "<li class='list' role='"+data.courseId+"/"+value.videoId+"'>"+
                                "<span class='glyphicon glyphicon-minus-sign' aria-hidden='true'></span>"+
                                "<span>"+value.videoName+"</span>"+
                                "<span class='peritem-study'>开始学习</span></li>";
                        }
                    });



                    $("#videolist").html($appendHTml);
                },
                error:function(){
                    alert("error!");
                }
            })




        });

        //手机端显示选择课程
        $("#btn-show").click(function(){
            if(!flag){
                flag = true;
                $(".video-catedory").slideDown();
            }else{
                flag = false;
                $(".video-catedory").slideUp();
            }
        });
        
        //选择课程章节li的点击
        /*$("#videolist li").click(function(){
            //alert($(this).attr("role"));
            
            window.location.href = "playVideo.html?video="+$(this).attr("role");
        })*/
        $("#videolist").on("click",".list",function(){
            //alert($(this).attr("role"));

            console.log($(this).attr("role"));
            window.location.href = "playVideo.html?video="+$(this).attr("role");
        })


    })
   