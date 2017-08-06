package com.busyzero.efamily.repository;

/**
 * Created by 11456 on 2017/6/15.
 */

import com.busyzero.efamily.domain.Course;

/**
 * 课程表操作对象
 */
public interface CourseRepository {
    /**
     * 根据课程名获取课程信息
     * @param courseId
     * @return
     */
    Course getCourseByCourseId(Integer courseId);

    /**
     * TODO 其它功能暂时不提供实现
     */
}
