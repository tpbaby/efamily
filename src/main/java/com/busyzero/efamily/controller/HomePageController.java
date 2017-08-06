package com.busyzero.efamily.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by 11456 on 2017/6/18.
 */

/**
 * 首页
 */
@Controller
@RequestMapping("/")
public class HomePageController {

    /**
     * 获取首页
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public String getHomePage(){
        return "index_xz";
    }
}
