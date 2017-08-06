package com.busyzero.efamily.controller;

/**
 * Created by 11456 on 2017/6/15.
 */
import com.busyzero.efamily.service.RssNewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * rss 新闻控制器
 */
@Controller
@RequestMapping("/rssNews")
public class RssNewsController {
    /**
     * rss新闻服务对象
     */
    @Autowired
    private RssNewsService rssNewsService;

    /**
     * 获得news 页面
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public String getNewsPage(){
        return "news";
    }

    /**
     * 处理处理对应请求的新闻:
     * 强制返回类型是xml
     * @param type
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/{newsType}",method = RequestMethod.GET,
            produces = {MediaType.APPLICATION_XML_VALUE})
    public String getRssNews(@PathVariable("newsType")String type){
        return rssNewsService.getRssNewsXmlString(type);
    }
}
