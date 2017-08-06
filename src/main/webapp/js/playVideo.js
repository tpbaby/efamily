
    
    $(function(){
		var video = $("#player");

        var args = getUrlParamObj();
        var video1 = args["video"];
        var courseId = video1.substring(0,video1.indexOf("/"));
        var videoId = video1.substring(video1.indexOf("/")+1, video1.length);

        console.log(video1+"-"+courseId+"-"+videoId);

        $.ajax({
			type:"get",
			url:"./video/"+videoId,
			dataType:"json",
			success:function (data) {
                $("#player").attr("src","/efamily"+data.videoLink);
				$("#videoname").text(data.videoName);
            },
			error:function () {
				alert("error!");
            }
		})
        
        
        /*这里发送ajax请求*/

            
        
        //初始化动作
        /*$("#player").attr("src",json.src);
      
        var curtime = json.curTime;
        */
        
        
        

        /*正则表达式解析地址栏传过来的参数*/
        function getUrlParamObj(){
            var obj = [];
            //获取url的参数部分
            var params = window.location.search.substr(1);
            //[^&=]+ 表示不含&或=的连续字符，加上()就是提取对应字符串
            //提取括号里面的内容，每个括号里面的内容对应一个$,replace是提取液出来的结果
            params.replace(/([^&=]+)=([^&=]*)/gi,function(rs,$1,$2){
                obj[$1] = $2;
            });

            return obj;
        }
        
		//转圈圈，加载
		//$(".loading").fadeIn(500);
		video.on("loadedmetadata", function(){
            

			$("#duration").text(timeFormat1(video[0].duration));
           // updatebar1(json.curTime);
			updateVolume(0,0.7);
			
			//延迟150ms启动缓存
			setTimeout(startBuffer, 150);
			
			$("section")
			.append("<div id='init'></div>")
			.on("click", function(){
				$("#init").remove();
				$("#video-btn").addClass("paused");
				//解绑
				$(this).unbind("click");
				video[0].play();
			});
			
			$("#init").fadeIn(200);
		});
		
        //获取视频的总时长以及当前时间
		video.on("timeupdate", function(){
			var currentPos = video[0].currentTime;
			var maxduration = video[0].duration;
			var perc = 100*currentPos/maxduration;
			$(".timeBar").css("width",perc+"%");
            $('.yuandian').css({"margin-left":perc-0.2+'%'});
			$("#current").text(timeFormat1(currentPos));
            
            if(video[0].currentTime == video[0].duration){
                $("#video-btn").removeClass("paused");
				video[0].pause();
            }
		});
		
		//直接电视视频对象和点击播放按钮是相同的效果
		video.on("click",function(){ playpause();});
		$("#video-btn").on("click", function(){ playpause(); });
		
		//播放事件
		var playpause = function(){
			if(video[0].paused || video[0].ended){
				$("#video-btn").addClass("paused");
				video[0].play();
				
			}else{
				$("#video-btn").removeClass("paused");
				video[0].pause();
			}
		};
		
		
		
		//全屏点击
            var flag = 1;        
        $(".btnFS").on("click", function(){
            if(flag == 1){    
                flag = 0;
                // alert(1);
                showbig();
            }else{

                flag = 1;
                showsmall();
                
            }
                     
        });
    
        function showbig(){
            var height =window.innerHeight ;
            $("header").hide();
            $("section").css({"marginTop":"0px","height":height+"px"});
            $(".video_box").css({"width":"100%"});
            $("#player").css({"height":"100%"});
            $(".contrels").css({"position":"fixed"});//,"display":"none"
            $(".contrels").slideUp();
            $(".controls2").show();

            /*绑定显示事件*/
             $(".controls2").mouseover(function(){
                $(".contrels").slideDown();
                $(this).hide();
                $(".sudubox").hide();
            });

            $(".contrels").mouseleave(function(){
                $("this").slideUp();
                $(".controls2").show();
            })
        }

        function showsmall(){
            var height =window.innerHeight ;
            $("header").show();
            $("section").css({"marginTop":"50px","height":(height-47)+"px"});
            $(".video_box").css({"width":"80%"});
            $("#player").css({"height":"94%"});
            $(".contrels").css({"position":"absolute"});//,"display":"none"
            $(".contrels").show();

            /*解绑*/
            $(".controls2").unbind("mouseover");
            $(".contrels").unbind("mouseleave");
        }
        
        
		
		//改变音量
		$(".sound").click(function(){
			video[0].muted = !video[0].muted;
			$(this).toggleClass("muted");
			if(video[0].muted){
				$(".volumeBar").css("width", 0);
			}else{
				$(".volumeBar").css("width",video[0].volume*100+"%");
			}
		});
        
        
        $(".sudu").mouseover(function(){
            $(".sudubox").show();
        });
        $(".sudubox").mouseleave(function(){
            $(".sudubox").hide();
        });
        
        //改变播放速度
        $('.btnx1').on('click', function() { 
            fastSpd(this);
            $(".sudubox").hide();
        });
        
        $('.btnx2').on('click', function() { 
            fastSpd(this);
            $(".sudubox").hide();
        });
        
        function fastSpd(obj){
            var spd = $(obj).text();
            var spdtext = spd.substring(1);
            //alert(spdtext);
            var sudu_first = $(".sudu").html();
            $(".sudu").html(spd);
            $(obj).html(sudu_first);
            video[0].playbackRate = spdtext;
		    video[0].play();
        }
       
		
		//视频可以播放时，让loading消失
		video.on("canplay", function(){
			$(".loading").fadeOut(100);
		});
		
		var completeloaded = false;
		
		video.on("canplaythrough", function(){
			completeloaded = true;
		});
		
		video.on("ended", function(){
			$(".btnPlay").removeClass("paused");
			video[0].pause();
		});
		
		//seeking-->寻找即要加载缓存时，显示转圈圈
		video.on("seeking", function(){
			if(!completeloaded){
				$(".loading").fadeIn(200);
			}
		});
		
		//已经找到
		video.on("seeked", function(){});
		
		//等待时让loading显示
		video.on("waiting", function(){
			$(".loading").fadeIn(200);
		});
		
		var timeDrag = false;	/* check for drag event */
		$('.progress').on('mousedown', function(e) {
			timeDrag = true;
			
			//alert(e.pageX+"-->"+$(".progress").offset().left);
			updatebar(e.pageX);
		});
		$(document).on('mouseup', function(e) {
			if(timeDrag) {
				timeDrag = false;
				updatebar(e.pageX);
			}
		});
		$(document).on('mousemove', function(e) {
			if(timeDrag) {
				updatebar(e.pageX);
			}
		});
		
		//更新进度条
		var updatebar = function(x) {
			var progress = $('.progress');
			
			var maxduration = video[0].duration;
			var position = x - progress.offset().left;
			var percentage = 100 * position / progress.width();
			if(percentage > 100) {
				percentage = 100;
			}
			if(percentage < 0) {
				percentage = 0;
			}
			$('.timeBar').css('width',percentage+'%');	
            $('.yuandian').css({"margin-left":percentage-0.2+'%'});
			video[0].currentTime = maxduration * percentage / 100;
			
		};
        
        
        //根据已播放的时间设置进度条
        var updatebar1 = function(curtime){
			
			var maxduration = video[0].duration;
            var percentage = 100 * curtime / maxduration;
            if(percentage > 100) {
				percentage = 100;
			}
			if(percentage < 0) {
				percentage = 0;
			}
            $('.timeBar').css('width', percentage + '%'),
            $('.yuandian').css({"margin-left": percentage-0.2+'%'});
            video[0].currentTime = curtime;
            
        }
        
		
		//改变播放速度
		var updatefastfowrd = function(obj, speed){
			$(".text").removeClass("selected");
			$(obj).addClass("selected");
			video[0].playbackRate = speed;
			video[0].play();
		}
		
		/*改变播放视频按钮的样式*/
		var volumeDrag = false;
		$('.volume').on('mousedown', function(e) {
			volumeDrag = true;
			video[0].muted = false;
			$('.sound').removeClass('muted');
			
			//alert(e.pageX+"-->"+$(".volume").offset().left);
			updateVolume(e.pageX);
		});
		$(document).on('mouseup', function(e) {
			if(volumeDrag) {
				volumeDrag = false;
				updateVolume(e.pageX);
			}
		});
		$(document).on('mousemove', function(e) {
			if(volumeDrag) {
				updateVolume(e.pageX);
			}
		});
        
        
		//设置音量的大小
		var updateVolume = function(x, vol){
			var volum = $(".volume");
			var percentage;
			
			if(vol){
				percentage = vol * 100;
			}else{
				var position1 = x - volum.offset().left;
//                alert(position1);
				percentage = 100*position1 / volum.width();
			}
			
			if(percentage > 100) {
				percentage = 100;
			}
			if(percentage < 0) {
				percentage = 0;
			}
			
			$('.volumeBar').css('width',percentage+'%');	
			video[0].volume = percentage / 100;
			
			//change sound icon based on volume
			if(video[0].volume == 0){
				$('.sound').removeClass('sound2').addClass('muted');
			}
			else if(video[0].volume > 0.5){
				$('.sound').removeClass('muted').addClass('sound2');
			}
			else{
				$('.sound').removeClass('muted').removeClass('sound2');
			}
		};
		
		
		
		//视频缓存
		var startBuffer = function() {
			var currentBuffer = video[0].buffered.end(0);
			var maxduration = video[0].duration;
			var perc = 100 * currentBuffer / maxduration;
			$('.bufferBar').css('width',perc+'%');
				
			if(currentBuffer < maxduration) {
				setTimeout(startBuffer, 500);
			}
		};
		
		//将时间规范化
		var timeFormat1 = function(seconds){
			var m = Math.floor(seconds / 60)<10 ? "0"+Math.floor(seconds/60) : Math.floor(seconds/60);
			var s = Math.floor(seconds-(m*60))<10 ? "0"+Math.floor(seconds-(m*60)) : Math.floor(seconds-(m*60));
			return m+":"+s;
		};
		
	});
    
    
        
    
    //屏幕可用工作区高度-------------//
    var height =window.innerHeight ;
    var h = (height-47);
   // alert(height+"-->"+h);
    $("section").css({"height":h+"px"});
    

    $("#btn_back").click(function () {
		history.back();
    })


    //当屏幕的大小发生改变时
    window.onresize = function(){
        var height =window.innerHeight ;
//        var header_height = $("header").height();
//        var footer_box1 = $(".box1").height();ss
//        var deleteheight = header_height+footer_box1;
        var h = (height-47);
       // alert(height+"-->"+h);
        $("section").css({"height":h+"px"});
    }