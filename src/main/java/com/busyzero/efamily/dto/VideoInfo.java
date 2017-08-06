package com.busyzero.efamily.dto;

/**
 * Created by 11456 on 2017/6/15.
 */

/**
 * 视频信息和用户相关
 */
public class VideoInfo {

    /**
     * 视频名字
     */
    private String videoName;

    /**
     * 视频编号
     */
    private Long videoId;

    /**
     * 是否已经学习
     */
    private Boolean hasLearned;

    public VideoInfo(String videoName, Long videoId, Boolean hasLearned) {
        this.videoName = videoName;
        this.videoId = videoId;
        this.hasLearned = hasLearned;
    }

    public String getVideoName() {
        return videoName;
    }

    public void setVideoName(String videoName) {
        this.videoName = videoName;
    }

    public Long getVideoId() {
        return videoId;
    }

    public void setVideoId(Long videoId) {
        this.videoId = videoId;
    }

    public Boolean getHasLearned() {
        return hasLearned;
    }

    public void setHasLearned(Boolean hasLearned) {
        this.hasLearned = hasLearned;
    }
}
