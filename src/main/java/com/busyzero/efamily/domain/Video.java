package com.busyzero.efamily.domain;

/**
 * Created by 11456 on 2017/6/15.
 */

import org.apache.ibatis.type.Alias;

/**
 * 模型：视频
 */
@Alias("video")
public class Video {
    /**
     * 视频编号
     */
    private Long videoId;

    /**
     * 所属课程编号
     */
    private Integer courseId;

    /**
     * 视频名称
     */
    private String videoName;

    /**
     * 视频地址链接
     */
    private String videoLink;

    public Long getVideoId() {
        return videoId;
    }

    public void setVideoId(Long videoId) {
        this.videoId = videoId;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public String getVideoLink() {
        return videoLink;
    }

    public void setVideoLink(String videoLink) {
        this.videoLink = videoLink;
    }

    public String getVideoName() {
        return videoName;
    }

    public void setVideoName(String videoName) {
        this.videoName = videoName;
    }
}
