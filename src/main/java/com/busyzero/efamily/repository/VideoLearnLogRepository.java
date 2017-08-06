package com.busyzero.efamily.repository;

/**
 * Created by 11456 on 2017/6/15.
 */

import com.busyzero.efamily.domain.VideoLearnLog;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 视频学习日志持久层操作对象
 */
public interface VideoLearnLogRepository {

    List<VideoLearnLog> listAllLearned(@Param("userId") int userId,@Param("courseId") int courseId);
}
