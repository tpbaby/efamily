/**
 * Created by 11456 on 2017/6/12.
 */
var scrollMenuflag=true;
//初始的值
/**
 * 显示菜单条：不显示滚动条
 */
function showMenuBlock(){
    var scrollMenu=document.getElementById("menu-scroll");
    var menuBlock=document.getElementById("menu-block");
    if (scrollMenuflag){
        menuBlock.style.display="block";
        scrollMenu.style.display="none";
        scrollMenuflag=false;
    }else{
        scrollMenu.style.display="block";
        menuBlock.style.display="none";
        scrollMenuflag=true;
    }
}

/**
 * ajax 发起ajax 请求
 */

//url请求前缀
var url_prefix="./rssNews/"
//url 请求资源
var Resources={
    politics:"politics",
    world:"world",
    local:"local",
    mil:"mil",
    finance:"finance",
    tw:"tw",
    ent:"net",
    sports:"sports",
    tech:"tech",
    auto:"auto",
    edu:"edu",
    legal:"legal"
};
requestXMl(Resources.world);


/**
 * 用发起一个xml
 */
function requestXMl(url_res) {
    var url=url_prefix+url_res;
    $.ajax({
        type:'GET',
        url:url,
        data:{},
        dataType:"xml",
        success:function (data) {
            parseXML(data);
        },
        error:function (error) {
            alert(error.message);
        }
    });
}

/**
 * 解析xml
 */
function parseXML(data) {
    $("#news-content-list").empty();
    var items="";

    $(data).find("item").each(function(){
        var item="";
        //取标题
        var title = $(this).children("title").text();
        //取链接
        var link=$(this).children("link").text();
        //取描述
        var desc=$(this).children("description").text();

        // var liNode=document.createElement("li");
        // var aLinkNode=document.createElement("a");
        // var h4Node=document.createElement("h4");
        // var pNode=document.createElement("p");
        // aLinkNode.src=link;
        // aLinkNode.className="new-info list-group-item";
        // pNode.innerHTML=desc;
        // pNode.className="new-desc";
        // h4Node.className="new-content";
        // liNode.appendChild(aLinkNode)

        item+="<li class='new-info'>";
        item+="<a href='"+link+"' class=''>";
        item+="<h4 class='new-content'>"+title+"</h4>";
        item+="</a>";
        item+="<p class='new-desc'>"+desc+"</p>";
        item+="</li>";
        items+=item;
    });
    $("#news-content-list").append(items);


    $("#btn-back").click(function () {
        history.back();
    })
}

