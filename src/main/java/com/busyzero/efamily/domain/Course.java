package com.busyzero.efamily.domain;

/**
 * Created by 11456 on 2017/6/15.
 */

import org.apache.ibatis.type.Alias;

import java.util.List;

/**
 * 模型：视频信息
 */
@Alias("course")
public class Course {
    /**
     * 课程编号
     */
    private Integer courseId;
    /**
     * 课程作者
     * TODO 这里没有认真做
     */
    private String courseAuthor;
    /**
     * 课程类型
     * TODO 这里也灭有认真
     */
    private String courseType;
    /**
     * 课程名字
     */
    private String courseName;
    /**
     * 图片地址
     */
    private String courseImg;

    /**
     * 视频列表
     */
    private List<Video> videoList;

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public String getCourseAuthor() {
        return courseAuthor;
    }

    public void setCourseAuthor(String courseAuthor) {
        this.courseAuthor = courseAuthor;
    }

    public String getCourseType() {
        return courseType;
    }

    public void setCourseType(String courseType) {
        this.courseType = courseType;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseame) {
        this.courseName = courseame;
    }

    public String getCourseImg() {
        return courseImg;
    }

    public void setCourseImg(String courseImg) {
        this.courseImg = courseImg;
    }

    public List<Video> getVideoList() {
        return videoList;
    }

    public void setVideoList(List<Video> videoList) {
        this.videoList = videoList;
    }
}
