package com.busyzero.efamily.service;

/**
 * Created by 11456 on 2017/6/15.
 */

import com.busyzero.efamily.domain.Video;

/**
 * 视频接口
 */
public interface VideoService {
    /**
     * 根据视频Id 获取对应信息
     * //TODO 实际上在数据库层就不该取那么多数据
     * @param videoId
     * @return
     */
    Video getVideoById(long videoId);
}
