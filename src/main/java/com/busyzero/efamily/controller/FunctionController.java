package com.busyzero.efamily.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by 11456 on 2017/6/17.
 * 提供娱乐小功能控制器
 */
@Controller
@RequestMapping("/recreation")
public class FunctionController {
    /**
     * 提供音乐服务
     * @return
     */
    @RequestMapping(value = "/music",method = RequestMethod.GET)
    public String getMusicPage(){
        return "loadmusic";
    }
    /**
     * 成语接龙 游戏页面
     */
    @RequestMapping(value = "/idom",method = RequestMethod.GET)
    public String getIdomPage(){
        return "idioms";
    }
    /**
     * 小功能:星座
     */
    @RequestMapping(value = "/constellation",method = RequestMethod.GET)
    public String getConstellationPage(){
        return "twelve";
    }

    /**
     * 小功能：天气查询和走势图
     * @return
     */
    @RequestMapping(value = "/weather",method = RequestMethod.GET)
    public String getWeatherPage(){
        return "weather";
    }
}
