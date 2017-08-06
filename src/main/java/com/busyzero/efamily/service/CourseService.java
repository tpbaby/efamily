package com.busyzero.efamily.service;

import com.busyzero.efamily.dto.CourseVideoInfo;

/**
 * Created by 11456 on 2017/6/15.
 */

/**
 * 视频查看接口
 */
public interface CourseService {
    /**
     * 视频查看信息接口
     * @param courseId
     * @param userId
     * @return
     */
    CourseVideoInfo getVideoInfo(int courseId,int userId);
}
