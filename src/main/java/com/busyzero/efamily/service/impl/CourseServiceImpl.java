package com.busyzero.efamily.service.impl;

import com.busyzero.efamily.domain.Course;
import com.busyzero.efamily.domain.Video;
import com.busyzero.efamily.domain.VideoLearnLog;
import com.busyzero.efamily.dto.CourseVideoInfo;
import com.busyzero.efamily.dto.VideoInfo;
import com.busyzero.efamily.repository.CourseRepository;
import com.busyzero.efamily.repository.VideoLearnLogRepository;
import com.busyzero.efamily.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by 11456 on 2017/6/15.
 */
/**
 * 课程服务实现类
 */
@Service
public class CourseServiceImpl implements CourseService {
    /**
     * 课程信息访问对象
     */
    @Autowired
    private CourseRepository courseRepository;
    /**
     * 视频日志查看对象
     */
    @Autowired
    private VideoLearnLogRepository videoLearnLogRepository;

    /**
     * 获取视频信息，包含已经查看视频信息
     * @param courseId
     * @param userId
     * @return
     */
    @Override
    public CourseVideoInfo getVideoInfo(int courseId, int userId) {
        Course course=courseRepository.getCourseByCourseId(courseId);
        List<VideoLearnLog> videoLearnLogList=videoLearnLogRepository.listAllLearned(userId,courseId);
        CourseVideoInfo info=new CourseVideoInfo(course);
        List<Video> videoList=course.getVideoList();
        // TODO 这里采用了java8的Stream 在之前版本可能会失效
        List<VideoInfo> videoInfoList=videoList.stream()
                .map(video-> {
                    if(videoLearnLogList.stream().anyMatch(log->log.getVideoId().equals(video.getVideoId()))) {
                        return new VideoInfo(video.getVideoName(),video.getVideoId(),true);
                    }else {
                        return new VideoInfo(video.getVideoName(), video.getVideoId(), false);
                    }
                }).collect(Collectors.toList());
        info.setVideoList(videoInfoList);
        return info;
    }
}
