  //当前是否是歌单页面
        var isList = false;
        var audio = document.createElement("audio");
        var isMax = false;
        var isMin = false;
        var showVoice = false;
        var reg = /^(\[\d{2}:\d{2}.\d{2}\])+.+/;
        var lrcStrArray = new Array();
        //歌曲的数组
        var currentSongIndex = 0;
        var song_lists = null;
        //main
        $(function () {
            initLoad(1);
            endListener = setInterval(function () {
                if (audio.ended) {
                    PlayById(song_lists[(++currentSongIndex) % song_lists.length]);
                }
            }, 1000);
        });
        //监听事件 歌曲播放
        function timeUpdateByStep() {
            TotalLength = audio.duration;
            if (!isNaN(TotalLength)) {
                currentTime = audio.currentTime;
                //当前显示歌词的下标
                var index = searchLrcIndexByTime(currentTime);
                var target1 = $(".mb_lrc");
                var target2 = $(".pc_lrc");
                
                showLrc2Render(target1, index);
                showLrc2Render(target2, index);
                updateMusicProgress(TotalLength, currentTime);
            }
        }

        function updateMusicProgress(TotalLength, currentTime) {
            percent = currentTime / TotalLength * 100;
            var currentTStr = getTimeStr(currentTime);
            var allTStr = getTimeStr(TotalLength);
            $(".currentTime").text(currentTStr);
            $(".totalTime").text(allTStr);
            // 缓存进度条
            dealBuffer();
            $(".ui-slider-range").css({
                "width": percent + "%"
            });
            $(".ui-slider-handle").css({
                "left": percent + "%"
            });
        }

        function showLrc2Render(target, index) {
        
            if (index != undefined && hasLrc) {
                    var mid = Math.floor(parseFloat(target.css("height").replace("px", "")) / (parseFloat(target.find("p").css("height").replace("px", "")) + parseFloat(target.find("p").css("margin-top").replace("px", ""))) / 2);
                $(".mblrc p").text(target.children("p").eq(index).text()); //更新小歌词
                target.children("p").eq(index).siblings().addClass("hide-gradual").removeClass("normal").removeClass("current-lrc");
                target.children("p").eq(index).prev().addClass("normal").removeClass("hide-gradual").removeClass("current-lrc");
                target.children("p").eq(index).next().addClass("normal").removeClass("hide-gradual").removeClass("current-lrc");
                target.children("p").eq(index).prev().prev().addClass("normal").removeClass("hide-gradual").removeClass("current-lrc");
                target.children("p").eq(index).next().next().addClass("normal").removeClass("hide-gradual").removeClass("current-lrc");
                target.children("p").eq(index).prev().prev().prev().addClass("normal").removeClass("hide-gradual").removeClass("current-lrc");
                target.children("p").eq(index).next().next().next().addClass("normal").removeClass("hide-gradual").removeClass("current-lrc");
                target.children("p").eq(index).addClass("current-lrc").removeClass("normal").removeClass("hide-gradual");
                var origin = target.children("p").eq(1).offset().top - target.children("p").eq(0).offset().top;
                if (index >= mid) {
                    var length = origin * (index - mid);
                    
                  target.stop(true).animate( { scrollTop:length}, 200);
                }
                else {
                    target.scrollTop(0);
                }
            }
        }
        //通过列表播放歌曲
        $(document).on("dblclick", "#song_list tr", function () {
            var index = $('#song_list tr').index(this);
            PlayById(song_lists[index]);
        });
        //初始化加载歌曲
        function initLoad(i) {
            $.ajax({
                url: "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=" + i + "&size=20&offset=0&callback="
                , type: "GET"
                , dataType: "jsonp"
                , jsoup: "calback"
                , jsonpCallback: "preInitSongList"
                , success: function (data) {
                    PlayById(song_lists[0]); //默认播放第一条
                }
                , error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest.status + "," + textStatus + "," + errorThrown);
                }
            });
        };
        //加载歌曲列表
        function preInitSongList(data) {
            //清空列表
            emptyList();
            var arr = new Array();
            $(data.song_list).each(function () {
                var song_item = "<tr><td>" + "<div class=\"pull-left\">" + this.title + "</div>" + "<div class=\"each_operation\" style=\"display:none\">" + "<a targetid=" + this.song_id + " href=\"javascript:;;\"><span class=\"glyphicon glyphicon-play\"></span></a> " + "<a href=\"\"><span class=\"glyphicon glyphicon-plus\"></span></a>" + "<a href=\"http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid=" + this.song_id + "\"><span class=\"glyphicon glyphicon-download-alt\"></span></a>" + "<a href=\"\"><span class=\"glyphicon glyphicon-comment\"></span></a> " + "</div></td>" + "<td class=\"hidden-xs\">" + this.author + "</td>" + "<td class=\"hidden-xs\">" + this.album_title + "</td></tr>";
                //添加到播放列表中去        
                var songId = this.song_id;
                arr.push(songId);
                $("#song_list").append(song_item);
            });
            song_lists = arr;
        }
        //加载之前清空音乐列表
        function emptyList() {
            $("#song_list").empty();
            songs_list = null;
        };
        //为歌曲列表添加悬停事件
        $("#song_list").on("mouseover mouseout", "tr", function () {
            if (event.type == "mouseover") {
                $(this).find(".each_operation").show();
                $(this).siblings().find(".each_operation").hide();
            }
        });
        //播放事件
        $("#song_list").on("click", "a[targetid]", function () {
            PlayById($(this).attr("targetid"));
        });
        //加载指定音乐
        function PlayById(songId) {
            $.ajax({
                url: "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid=" + songId
                , type: "GET"
                , dataType: "jsonp"
                , jsoup: "calback"
                , jsonpCallback: "prePlayerMusic"
                , success: function (data) {
                    //当前播放歌曲的下标
                    currentSongIndex = song_lists.indexOf(songId);
                    var songid = data.songinfo.song_id;
                    song_link  = data.bitrate.file_link;
                    //加载歌词
                    $.ajax({
                        url: "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.lry&songid=" + songid
                        , type: "GET"
                        , dataType: "jsonp"
                        , jsoup: "calback"
                        , jsonpCallback: "preLrc"
                        , success: function (data) {
                            //初始化
                            initPlay(song_link);//加载歌词
                        }
                        , error: function (XMLHttpRequest, textStatus, errorThrown) {
                            console.log(XMLHttpRequest.status + ", " + textStatus + ", " + errorThrown);
                        }
                    });
                }
                , error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest.status + "," + textStatus + "," + errorThrown);
                }
            });
        }
        //初始化歌词列表
        function initPlay(link) {
            
            $(".pc_lrc").empty();
            $(".mb_lrc").empty();
            if(hasLrc){
                for (var i = 0; i < lrcStrArray.length; i++) {
                    $(".pc_lrc").append("<p class=\"pp normal\">" + lrcStrArray[i].substring(10) + "</p>");
                    $(".mb_lrc").append("<p class=\"pp normal\">" + lrcStrArray[i].substring(10) + "</p>");
                }    
            }else{
                $(".pc_lrc").append("<p class=\"pp normal\">本歌曲暂无歌词</p>");
                $(".mb_lrc").append("<p class=\"pp normal\"> 本歌曲暂无歌词</p>");
                $(".mblrc p").text("本歌曲暂无歌词");
            }
            
            audio.remove("timeupdate", timeUpdateByStep, false);
            audio.src = link; //换歌曲    
            audio.currentTime = 0;
            aPlay();    
            //添加播放时间
            audio.addEventListener("timeupdate", timeUpdateByStep, false);
        }

        function prePlayerMusic(data) {
            //清空缓冲条
            $("#progressSlider.ui-slider-horizontal .ui-slider-progressbar").css({
                "width": 0
            });
            //清空时间
            $(".currentTime").text("00:00");
            $(".totalTime").text("00:00");
            $(".download").attr({
                "href": data.bitrate.file_link
            });
            //修改图片
            $(".middleimg").attr({
                "src": data.songinfo.pic_premium
            });
            $(".underimg").attr({
                "src": data.songinfo.pic_small
            });
            if (null != data.songinfo.pic_huge && "" != data.songinfo.pic_huge) {
                $(".s-isindex-wrap").css({
                    "background-image": "url(" + data.songinfo.pic_huge + ")"
                });
            }else{
                  $(".s-isindex-wrap").css({
                    "background-image": "url(images/defaultbg.jpg)"
                });
            }
            //修改其他歌曲信息 歌曲名  歌手 专辑名
            $(".songname").text(data.songinfo.title);
            $(".artist").text(data.songinfo.author);
            $(".album").text(data.songinfo.album_title);
         
        }
        //对歌词进行预处理
        function preLrc(data) {
    
            if(null != data.lrcContent && "" != data.lrcContent && data.lrcContent != undefined){
                    lrcStrArray = data.lrcContent.split("\n");
                for (var i = 0; i < lrcStrArray.length; i++) {
                    //获取当前歌词的时间信息
                    if (!reg.test(lrcStrArray[i])) {
                        lrcStrArray.splice(i, 1);
                        i--;
                    }
                }
                hasLrc = true;
            }else{
                hasLrc = false;
            }
        }
        //根据id搜索对应歌词
        function searchLrcIndexByTime(currentTime) {
            for (var i = 0; i < lrcStrArray.length; i++) {
                if (currentTime >= parseLrcTime(lrcStrArray[lrcStrArray.length - 1].substring(1, 9))) {
                    return lrcStrArray.length - 1;
                }
                if (i < lrcStrArray.length - 1 && parseLrcTime(lrcStrArray[i].substring(1, 9)) <= currentTime && currentTime < parseLrcTime(lrcStrArray[i + 1].substring(1, 9))) {
                    return i;
                }
            }
        }
        
        function parseLrcTime(timeStr) {
            var timeStr1 = timeStr.split(":");
            var minue = parseInt(timeStr1[0]);
            var timeStr2 = timeStr1[1].split(".");
            var second = parseInt(timeStr2[0]);
            var na = parseInt(timeStr2[1]);
            var totalSeconds = minue * 60 + second + na / 100;
            return totalSeconds;
        }
        //处理时间格式化
        function getTimeStr(time) {
            var totalTime = parseInt(time);
            var min = parseInt(totalTime / 60);
            var second = totalTime - min * 60;
            var minstr = "";
            var secondstr = "";
            if (min < 10) {
                minstr = "0" + min;
            }
            else {
                minstr = min + "";
            }
            if (second < 10) {
                secondstr = "0" + second;
            }
            else {
                secondstr = second + "";
            }
            return minstr + ":" + secondstr;
        }
        //处理缓存
        function dealBuffer() {
            var buffered, percent;
            // 已缓冲部分
            audio.readyState == 4 && (buffered = audio.buffered.end(0));
            // 已缓冲百分百
            audio.readyState == 4 && (percent = Math.round(buffered / audio.duration * 100) + '%');
            $("#progressSlider.ui-slider-horizontal .ui-slider-progressbar").css({
                "width": percent
            });
        }
        //播放与暂停
        $(".play a,mb_controller .start").click(function () {
            if (!audio.paused) {
                aPause();
            }
            else {
                aPlay();
            }
        });

        function aPlay() {
            audio.play();
            //旋转图标添加class
            $(".mb_im").addClass("run");
            $(".mb_controller .underimg").addClass("run");
            $(".play a").addClass("stop").removeClass("start");
        }

        function aPause() {
            //旋转图标删除class
            audio.pause();
            $(".mb_im").removeClass("run");
            $(".mb_controller .underimg").removeClass("run");
            $(".play a").addClass("start").removeClass("stop");
        }
        //下一首
        $(".next ").click(function () {
            PlayById(song_lists[++currentSongIndex % song_lists.length]);
        });
        //上一首
        $(".prev ").click(function () {
            if (--currentSongIndex < 0) {
                currentSongIndex = song_lists.length - 1;
            }
            PlayById(song_lists[(currentSongIndex) % song_lists.length]);
        });
        //音量列表
        $(".voice_controller").click(function () {
            if (!showVoice) {
                $(".voice_controller_wrapper").show();
                showVoice = true;
            }
            else {
                $(".voice_controller_wrapper").hide();
                showVoice = false;
            }
        });
        //PC 改变音量
        $(".voice-slider ").click(function (e) {
            var position = e.pageY;
            var startpoint = $(this).offset().top; //总长度
            var length = $(this).outerWidth();
            var percent = (1 - (position - startpoint) / length) * 100;
            if (percent < 0) {
                percent = 0;
            }
            if (percent > 100) {
                percent = 100;
            }
            $(".voice-slider-range").css({
                width: percent + "%"
            });
            $(".voice-slider-handle").css({
                "left": percent + "%"
            });
        });
        $(".voice-slider-handle").mousedown(function (e) {
            //开启记录
            $(".voice-slider").mousemove(function (e) {
                e.preventDefault();
                var position = e.pageY;
                var startpoint = $(this).offset().top; //总长度
                var length = $(this).outerWidth();
                var percent = (1 - (position - startpoint) / length) * 100;
                if (percent < 0) {
                    percent = 0;
                }
                if (percent > 100) {
                    percent = 100;
                }
                $(".voice-slider-range").css({
                    width: percent + "%"
                });
                $(".voice-slider-handle").css({
                    "left": percent + "%"
                });
                //修改音量
                audio.volume = percent / 100;
                if (audio.volume == 0) {
                    $(".voice_controller span").removeClass().addClass("glyphicon glyphicon-volume-off");
                }
                else if (audio.volume > 0.8) {
                    $(".voice_controller span").removeClass().addClass("glyphicon glyphicon-volume-up");
                }
                else {
                    $(".voice_controller span").removeClass().addClass(" glyphicon glyphicon-volume-down ");
                }
            });
        });
        $(".voice-slider-handle,.voice-slider-range ").focusout(function () {
            $(".voice-slider").unbind("mousemove");
        });
        $(document).mouseup(function (e) {
            e.preventDefault();
            $(".voice-slider").unbind("mousemove"); //立即结束事件？
        });