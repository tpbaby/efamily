/**
 * Created by 11456 on 2017/6/11.
 */
var generatedId=0;

/**
 * 显示初始化页面
 */
function initPage() {
    //获取被点击itme
    var itemId=localStorage.getItem("choseItem");
    getUserInfoByName(itemId);
    //点击编辑之后进行跳转
    $("#u").click(function () {
        window.location.href="contact_neworupdate.html";
    });
}

/**
 * 初始化联系人列表的时候
 */
function initListPage(){
    var data=getAll();
    showListData(data);
    $("#add").click(function () {
        window.location.href="contact_neworupdate.html";
    });
}

/**
 * 显示数据
 */
function showData(data) {
    $("#username").html(data.name);
    $("#phone").html(data.phone);
    $("#sinaweibo").html(data.sina);
    $("#home").html(data.home);
    $("#birth").html(data.phone);
    $("#weixin").html(data.weixin);
    $("#qq").html(data.qq);
}

/**
 * 显示列表
 */
function showListData(data) {
    var len=data.rows.length,i;
    for(i=0;i<len;i++){
        var node="<div class='contact-card' onclick=\"onItemOnClick('"+data.rows.item(i).phone+"')\">";
        node+="<span>"+data.rows.item(i).name+"</span>";
        node+="</div>";
        //添加结点
        $(".contact-container").append(node);
    }
}

/**
 * 添加联系人
 */
function addUserInfo() {
    var name="";
    var addr="";
    var sina="";
    var qq="";
    var weixin="";
    var home="";
    var birth="";
    var phone="";
    var sql="insert into userinfo(name,phone,addr,sina,qq,weixin,home,birth) values (?,?,?,?,?,?,?,?)";
    var db=getCurrentDb();
    db.transaction(function (tx) {
        tx.executeSql(sql, [phone], function (tx, results) {
            showData(results.rows.item(0));
        }, null);
    });
}
/**
 * 删除联系人
 */
function delteUserInfo() {
    var sql="DELETE FROM userinfo WHERE phone=?";
    var db=getCurrentDb();
    db.transaction(function (tx) {
        tx.executeSql(sql, [phone], function (tx, results) {
            showData(results.rows.item(0));
        }, null);
    });
}
/**
 * 更新联系人
 */
function updateUserInfo() {
    var name="";
    var addr="";
    var sina="";
    var qq="";
    var weixin="";
    var home="";
    var birth="";
    var phone="";
    var sql="update userinfo set name=?,set addr=?,set sina=?,set qq=?,set weixin=?,set home=?,set birth=? where phone=?";
    var db=getCurrentDb();
    db.transaction(function (tx) {
        tx.executeSql(sql, [], function (tx, results) {
            showData(results.rows.item(0));
        }, null);
    });
}
/**
 * 根据用户查出所有数据
 */
function getUserInfoByName(phone) {
    var db=getCurrentDb();
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM userinfo where phone=?', [phone], function (tx, results) {
            showData(results.rows.item(0));
        }, null);
    });
}
/**
 * 查出所有用户名 手机号
 */
function getAll() {
    var db=getCurrentDb();
    db.transaction(function (tx) {
        tx.executeSql('SELECT name,phone FROM userinfo', [], function (tx, results) {
            showListData(results);
        }, null);
    });
}

/**
 * 插入初始化数据
 * @param trans
 */
function addInitUserInfo(trans) {
    var sql="insert into userinfo(name,phone,addr,sina,qq,weixin,home,birth) values (?,?,?,?,?,?,?,?)";
    trans.executeSql(sql,["王小东","165 79876 456","HangzhouZhejiang","katey2658","1145690746","katey2658","浙江 绍兴","96/05/05"],function (ts,data) {
    },function (ts,message) {
    });
    trans.executeSql(sql,["晓东","16579876456","zhejianghangzhou","katey2658","1145690746","katey2658","浙江绍兴","96/05/05"],function (ts,data) {
    },function (ts,message) {
    });
    trans.executeSql(sql,["张军","16579876411","zhejianghangzhou","katey2658","1145690746","katey2658","浙江绍兴","96/05/05"],function (ts,data) {
    },function (ts,message) {
    });
    trans.executeSql(sql,["天天","16579876459","zhejianghangzhou","katey2658","1145690746","katey2658","浙江绍兴","96/05/05"],function (ts,data) {
    },function (ts,message) {
    });
    trans.executeSql(sql,["坏蛋","16579876458","zhejianghangzhou","katey2658","1145690746","katey2658","浙江绍兴","96/05/05"],function (ts,data) {
    },function (ts,message) {
    });
    trans.executeSql(sql,["好人","16579876457","zhejianghangzhou","katey2658","1145690746","katey2658","浙江绍兴","96/05/05"],function (ts,data) {
    },function (ts,message) {
    });
    trans.executeSql(sql,["路人甲","16579876456","zhejianghangzhou","katey2658","1145690746","katey2658","浙江绍兴","96/05/05"],function (ts,data) {
    },function (ts,message) {
    });
    trans.executeSql(sql,["奔跑","16579876455","zhejianghangzhou","katey2658","1145690746","katey2658","浙江绍兴","96/05/05"],function (ts,data) {
    },function (ts,message) {
    });
    trans.executeSql(sql,["小航","16579876454","zhejianghangzhou","katey2658","1145690746","katey2658","浙江绍兴","96/05/05"],function (ts,data) {
    },function (ts,message) {
    });
    trans.executeSql(sql,["小宏","16579876453","zhejianghangzhou","katey2658","1145690746","katey2658","浙江绍兴","96/05/05"],function (ts,data) {
    },function (ts,message) {
    });
    trans.executeSql(sql,["老王","16579876452","zhejianghangzhou","katey2658","1145690746","katey2658","浙江绍兴","96/05/05"],function (ts,data) {
    },function (ts,message) {
    });
    trans.executeSql(sql,["宁妹子","16579996451","zhejianghangzhou","katey2658","1145690746","katey2658","浙江绍兴","96/05/05"],function (ts,data) {
    },function (ts,message) {
    });
}

/**
 * 初始化数据库
 */
function initDatabase() {
    var db=getCurrentDb();
    if (!db){
        alert("您的浏览器不支持HTML5本地存储");return;
    }
    //启动一个事务，并设置回掉函数
    db.transaction(function (trans) {
        var sql="create table if not exists userinfo(name,phone unique,addr null,sina null,qq null,weixin null,home null,birth null,qrcode null);"
        //执行创建表的sql 脚本
        trans.executeSql(sql);
        addInitUserInfo(trans);
    });
}
/**
 * 获得当前数据库
 * @returns {Database}
 */
function getCurrentDb() {
    var db=openDatabase("contact","1.0","contacts list database",1024*1024*5);
    return db;
}

/**
 * 电话被点击的时候:打出电话
 */
function callphone(){
    window.location.href = "tel:"+$("#phone").innerHTML;
}

/**
 * 当页面被点击的时候
 */
function onItemOnClick(name) {
    //存储被点击数据
    localStorage.setItem("choseItem",name);
    window.location.href="contact_detail.html";
}



