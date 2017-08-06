package com.busyzero.efamily.controller;

import com.busyzero.efamily.domain.Course;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by 11456 on 2017/6/15.
 */

/**
 * 视频功能前端控制器
 */
@RestController
@RequestMapping("/course")
public class CourseController {
    /**
     * 根据类型和给出的页号返回相应的数据
     * @param courseType
     * @param page
     * @return
     */
    @RequestMapping(value = "/list",method = RequestMethod.GET)
    public List<Course> listAllCourse(String courseType,Integer page){
        List<Course> courseList=null;
        return courseList;
    }

}
