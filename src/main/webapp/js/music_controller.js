
        
//----------------------------------控件---------------------------------------
        $(".max").click(function () {
            if (isMax) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
                else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                }
                else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
                else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                isMax = false;
            }
            else {
                var docElm = document.documentElement;
                //W3C  
                if (docElm.requestFullscreen) {
                    docElm.requestFullscreen();
                }
                //FireFox  
                else if (docElm.mozRequestFullScreen) {
                    docElm.mozRequestFullScreen();
                }
                //Chrome等  
                else if (docElm.webkitRequestFullScreen) {
                    docElm.webkitRequestFullScreen();
                }
                //IE11
                else if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen();
                }
                isMax = true;
            }
        });
        //PC 切换界面
        $("#change_View,.music_operation .underimg").click(function (e) {
            e.preventDefault();
            if (isList) {
                $(".wrapper").show();
                $(".content").show();
                $(".current_list").hide();
                $(".operation").show();
                $(".mb_controller").hide();
                $("#change_View").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down")
                isList = false;
            }
            else {
                $(".wrapper").hide();
                $(".content").hide();
                $(".current_list").show();
                //手机版的
                $(".operation").hide();
                $(".mb_controller").show();
                $("#change_View").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
                isList = true;
            }
        });
        //移动端切换界面
        $("#mb_change,.mb_controller .underimg").click(function () {
            if (isList) {
                $(".wrapper").show();
                $(".content").show();
                $(".operation").show();
                $(".current_list").hide();
                $(".mb_controller").hide();
                isList = false;
            }
            else {
                $(".wrapper").hide();
                $(".content").hide();
                $(".operation").hide();
                $(".current_list").show();
                $(".mb_controller").show();
                isList = true;
            }
        });
        
        //pc端修改播放进度
        $(".pc-progress").click(function(e){
            
                var position = e.pageX;
                var startpoint = $(this).offset().left;
                var length = $(this).outerWidth();
                var percent = (position - startpoint) / length ;
                audio.currentTime = audio.duration * percent;
            
         });
        //移动端改变播放进度
        function changeMusicProgress(ev) {
            if (ev.touches.length == 1) {
                position = ev.touches[0].clientX;
                startpoint = $("#progress_bar").offset().left;
                switch (ev.type) {
                case 'touchstart':
                    ev.preventDefault(); //阻止出现滚动条 
                    break;
                case 'touchend':
                    break;
                case 'touchmove':
                    var distance = position - startpoint;
                    var length = parseFloat($(".ui-slider-progressbar.ui-widget-header").css("width"));
                    if (distance < 0) {
                        distance = 0;
                    }
                    if (distance > length) {
                        distance = length;
                    }
                    $("#progress_bar").css({
                        width: distance / length * 100 + "%"
                    });
                    $("#process_controller").css({
                        left: distance / length * 100 + "%"
                    });
                    audio.currentTime = audio.duration * distance / length;
                    break;
                }
            }
        }
        $("#process_controller")[0].addEventListener('touchstart', changeMusicProgress, false);
        $("#process_controller")[0].addEventListener('touchend', changeMusicProgress, false);
        $("#process_controller")[0].addEventListener('touchmove', changeMusicProgress, false);

        
        //PC端修改音量
        function changeVoiceProgress(ev) {
            if (ev.touches.length == 1) {
                switch (ev.type) {
                case 'touchstart':
                    start1 = ev.touches[0].clientY;
                    ev.preventDefault(); //阻止出现滚动条 
                    break;
                case 'touchend':
                    break;
                case 'touchmove':
                    var percent = $(".voice-slider").offset().top + 100 - $(".voice-slider-handle").offset().top;
                    if (percent > 100) {
                        percent = 100;
                    }
                    var start2 = ev.touches[0].clientY;
                    var differ = start1 - start2;
                    percent = percent + differ
                    if (percent < 0) {
                        percent = 0;
                    }
                    if (percent > 100) {
                        percent = 100;
                    }
                    audio.volume = Math.round(percent / 100);
                    $(".voice-slider-range ").css({
                        width: percent + "%"
                    });
                    $(".voice-slider-handle").css({
                        left: percent + "%"
                    });
                    break;
                }
            }
        }
        $(".voice-slider-handle")[0].addEventListener('touchstart', changeVoiceProgress, false);
        $(".voice-slider-handle")[0].addEventListener('touchend', changeVoiceProgress, false);
        $(".voice-slider-handle")[0].addEventListener('touchmove', changeVoiceProgress, false);
        //选择歌曲类型
        $("#song_type li a").click(function () {
            var type = $(this).attr("type")
            $(this).parent().addClass("active");
            $(this).parent("li").siblings().removeClass("active");
            initLoad(type);
        });

        
        //移动端滑动播放列表
        function songListMove(ev) {
            if (ev.touches.length == 1) {
                switch (ev.type) {
                case 'touchstart':
                    liststart = ev.touches[0].clientY;
                    break;
                case 'touchend':
                        ev.preventDefault();
                        console.log(1);
                    break;
                case 'touchmove':
                    listend = ev.touches[0].clientY;
                    var ans = liststart - listend;
                    ori = $(".table-responsive").scrollTop();
                    //获取当前的滑块位置
                    console.log("ans" + ans);
                    console.log(ori);
                    if (ans > 0) {
                        $(".table-responsive").scrollTop(ans + ori);
                    }
                    else {
                        //向下滑小于0 应该向上跑
                        $(".table-responsive").scrollTop(ans + ori);
                    }
                    break;
                }
            }
        }
        //歌曲滚动
        $("#song_list")[0].addEventListener('touchmove', songListMove, false);
        $("#song_list")[0].addEventListener('touchstart', songListMove, false);
        $("#song_list")[0].addEventListener('touchend', songListMove, false);
        
        
        function changpane(ev) {
            //第一种快速滑动
            if (ev.touches.length == 1) {
                
                switch (ev.type) {
                        
                case 'touchstart':
                        //创建一个计时器
                        originTime = 0;        
                        time = setInterval(function(){
                            originTime++;
                        },1000);
                        startX = ev.touches[0].clientX;
                        console.log("start");
                    break;
                case 'touchend':
                        
                        console.log("end");
                        

                       
                    break;
                case 'touchmove':
                        endX = ev.touches[0].clientX;
                        
                            //快速滑动
                            var dis = endX - startX;
                            if(dis > 0){
                                console.log("left");
                                $(".changeable-pane").stop(true).animate( { left:"0%"}, 500);
                            }else{
                                console.log("right");
                                $(".changeable-pane").stop(true).animate( { left:"-100%"}, 500);
                            }
                            
                        
                        /*          
                    var  distance = liststart - listend;
                    ori = $(".table-responsive").scrollTop();
                    //获取当前的滑块位置
                    console.log("ans" + ans);
                    console.log(ori);
                    if (ans > 0) {
                        $(".table-responsive").scrollTop(ans + ori);
                    }
                    else {
                        //向下滑小于0 应该向上跑
                        $(".table-responsive").scrollTop(ans + ori);
                    }*/
                    break;
                }
            }
        }
        
        $(".changeable-pane")[0].addEventListener('touchend', changpane, true);
        $(".changeable-pane")[0].addEventListener('touchmove', changpane, false);
        $(".changeable-pane")[0].addEventListener('touchstart',changpane, false);
        
