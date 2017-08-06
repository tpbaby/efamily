package com.busyzero.efamily.controller;

import com.busyzero.efamily.domain.Video;
import com.busyzero.efamily.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by 11456 on 2017/6/15.
 */

/**
 * 视频访问控制器
 */
@RestController
@RequestMapping("/video")
public class VideoController {

    @Autowired
    private VideoService videoService;
    @RequestMapping(value = "/{videoId}",method = RequestMethod.GET)
    public Video getVideoUrl(@PathVariable("videoId")Long videoId){
        //TODO 继续偷懒 不做校验 哈哈
        return videoService.getVideoById(videoId);
    }
}
