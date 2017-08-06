package com.busyzero.efamily.controller;

import com.busyzero.efamily.dto.CourseVideoInfo;
import com.busyzero.efamily.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


/**
 * Created by 11456 on 2017/6/15.
 */

/**
 * 获取所有课程video视频
 */
@RestController
@RequestMapping("/learn")
public class CourseVideoController {
    /**
     * 注入课程服务对象bean
     */
    @Autowired
    private CourseService courseService;
    /**
     * 根据courseId获取相应的课程信息
     * @param courseId
     * @param userId
     * @return
     */
    @RequestMapping(value = "/{courseId}" ,method = RequestMethod.GET)
    public CourseVideoInfo listAllVideos(@PathVariable(name = "courseId")Integer courseId, Integer userId){
        //TODO 不做有效性校验了
        CourseVideoInfo info=courseService.getVideoInfo(courseId,userId);
        return info;
    }
}
