package com.busyzero.efamily.domain;

/**
 * Created by 11456 on 2017/6/15.
 */

import org.apache.ibatis.type.Alias;

/**
 * 用户已经查看的视频
 */
@Alias("videoLearnLog")
public class VideoLearnLog {
    /**
     *  用户id;
     *  TODO 不写用户体系
     */
    private Integer userId;
    /**
     * 视频id
     */
    private Long videoId;
    /**
     * 课程Id
     * 注：虽然这里这个字段冗余了，但是减少了一次关联，这是值得的
     */
    private Integer courseId;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

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
}
