-- DDL
-- 创建数据库
CREATE database if NOT EXISTS efamily;
USE efamily;
-- 创建课程表
CREATE TABLE if NOT EXISTS course(
course_id INT PRIMARY KEY auto_increment COMMENT "课程编号" ,
course_author VARCHAR (20) NOT NULL COMMENT "课程作者",
course_type VARCHAR (10) NOT  NULL  COMMENT "课程类型",
course_name VARCHAR (50) NOT NULL UNIQUE COMMENT "课程名字",
course_img VARCHAR (100) COMMENT "课程图片",
KEY index_type(course_type)
) engine=innodb auto_increment=1000 DEFAULT charset=utf8  COMMENT "课程表";

-- 创建视频表
CREATE TABLE if NOT EXISTS video(
video_id BIGINT PRIMARY KEY  auto_increment COMMENT "视频编号",
course_id INT NOT NULL COMMENT "课程编号",
video_name VARCHAR (50) NOT NULL COMMENT "视频名称",
video_link VARCHAR (100) NOT NULL COMMENT "视频链接",
key index_courseid(course_id)
)engine=innodb auto_increment=1000 DEFAULT charset=utf8  COMMENT "视频表";

-- 观看记录表
CREATE TABLE if NOT EXISTS video_learn_log(
id BIGINT PRIMARY KEY  auto_increment COMMENT "编号",
user_id INT NOT NULL COMMENT "用户编号",
video_id BIGINT NOT NULL  COMMENT "视频编号",
course_id INT NOT NULL  COMMENT "课程编号" ,
KEY index_useid_course_id(course_id,user_id)
)engine=innodb  DEFAULT charset=utf8  COMMENT "视频观看记录表";


-- DML
-- course 表
INSERT INTO course(course_author,course_type,course_name,course_img)
VALUES ("三日","前端","javascript 入门","/images/course/1000.jpg");

INSERT INTO course(course_author,course_type,course_name,course_img)
VALUES ("三日","前端","jQuery 入门","/images/course/1001.jpg");

-- video 表
INSERT INTO video(course_id,video_name,video_link)
VALUES (1000,"01_入门","/video/1000/video1.mp4");
INSERT INTO video(course_id,video_name,video_link)
VALUES (1000,"02_js的类型","/video/1000/video2.mp4");
INSERT INTO video(course_id,video_name,video_link)
VALUES (1000,"0dddddddddddddd3_自增自减","/video/1000/video3");
INSERT INTO video(course_id,video_name,video_link)
VALUES (1000,"04_运算符","/video/1000/video4.mp4");
INSERT INTO video(course_id,video_name,video_link)
VALUES (1000,"05_分支循环","/video/1000/video5.mp4");
INSERT INTO video(course_id,video_name,video_link)
VALUES (1000,"06_switch","/video/1000/video6.mp4");
INSERT INTO video(course_id,video_name,video_link)
VALUES (1000,"07_数组","/video/1000/video7.mp4");
INSERT INTO video(course_id,video_name,video_link)
VALUES (1000,"08_for循环","/video/1000/video8.mp4");
INSERT INTO video(course_id,video_name,video_link)
VALUES (1000,"09_json","/video/1000/video9.mp4");
INSERT INTO video(course_id,video_name,video_link)
VALUES (1000,"10_函数定义","/video/1000/video10.mp4");

INSERT INTO video(course_id,video_name,video_link)
VALUES (1001,"01_jquery介绍","/video/1001/video1.mp4");
INSERT INTO video(course_id,video_name,video_link)
VALUES (1001,"02_jquery的使用","/video/1001/video2.mp4");
INSERT INTO video(course_id,video_name,video_link)
VALUES (1001,"03_初识jquery","/video/1001/video3.mp4");
INSERT INTO video(course_id,video_name,video_link)
VALUES (1001,"04_jquery运算","/video/1001/video4.mp4");
INSERT INTO video(course_id,video_name,video_link)
VALUES (1001,"05_jquery操作css1","/video/1001/video5.mp4");
INSERT INTO video(course_id,video_name,video_link)
VALUES (1001,"06_jquery操作css2","/video/1001/video6.mp4");









