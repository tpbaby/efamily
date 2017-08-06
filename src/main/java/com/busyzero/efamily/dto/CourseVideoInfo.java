package com.busyzero.efamily.dto;

/**
 * Created by 11456 on 2017/6/15.
 */

import com.busyzero.efamily.domain.Course;

import java.util.List;

/**
 * 课程列表信息课程视频信息
 */
public class CourseVideoInfo {
    /**
     * 课程编号
     */
    private Integer courseId;

    /**
     * 课程名
     */
    private String courseName;
    /**
     * 地址
     */
    private String courseImg;
    /**
     * 课程作者
     */
    private String courseAuthor;
    /**
     * 课程列表
     */
    private List<VideoInfo>  videoList;

    public CourseVideoInfo(){

    }
    public CourseVideoInfo(Course course) {
        this.courseId=course.getCourseId();
        this.courseName=course.getCourseName();
        this.courseImg=course.getCourseImg();
        this.courseAuthor=course.getCourseAuthor();
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCourseAuthor() {
        return courseAuthor;
    }

    public String getCourseImg() {
        return courseImg;
    }

    public void setCourseImg(String courseImg) {
        this.courseImg = courseImg;
    }

    public void setCourseAuthor(String courseAuthor) {
        this.courseAuthor = courseAuthor;
    }

    public List<VideoInfo> getVideoList() {
        return videoList;
    }

    public void setVideoList(List<VideoInfo> videoList) {
        this.videoList = videoList;
    }
}
