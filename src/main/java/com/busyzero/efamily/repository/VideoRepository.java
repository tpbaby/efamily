package com.busyzero.efamily.repository;

/**
 * Created by 11456 on 2017/6/15.
 */

import com.busyzero.efamily.domain.Video;

/**
 * 视频表操作对象
 */
public interface VideoRepository {

    /**
     * 根据视频id获取对象视频信息
     * @param videoId
     * @return
     */
    Video getVideoById(long videoId);
    /**
     * TODO  其它暂时用不到，不提供实现
     */
}
