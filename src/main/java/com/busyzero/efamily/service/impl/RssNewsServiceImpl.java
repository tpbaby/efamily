package com.busyzero.efamily.service.impl;

import com.busyzero.efamily.repository.cache.RedisDao;
import com.busyzero.efamily.service.RssNewsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
/**
 * Created by 11456 on 2017/6/15.
 */

/**
 * rss 新闻服务对象
 */
@Service
public class RssNewsServiceImpl implements RssNewsService{
    private Logger logger= LoggerFactory.getLogger(RssNewsServiceImpl.class);

    /**
     * 缓存操作对象
     */
    @Autowired
    private RedisDao redisDao;

    /**
     * 获得rss新闻字符串
     * @param type
     * @return
     */
    @Override
    public String getRssNewsXmlString(String type) {
        logger.debug("method getRssNewsXmlString invoked:"+type);
        // 先检查缓存
        Jedis client=redisDao.getJedis();
        String data=client.get(type);
        if (data==null){
            //如果缓存不存在就去请求
            data=requestXmlString(type);
            client.set(type,data);
            //设置一个小时失效
            client.expire(type,60*60);
            client.close();
        }
        return data;
    }
    /**
     * 根据请求类型向网络发起请求
     * @param type
     * @return
     */
    private String requestXmlString(String type){
        logger.debug("request a xml and type:"+type);
      //  String urlStr="http://www.xinhuanet.com/"+type+"/news_"+type+".xml";
        byte[] data=null;
        try {
            /*
            TODO 理论上是应该向网络请求的，但是这里采用向本地磁盘请求
            logger.debug("request urlstr:"+urlStr);
            URL url=new URL(urlStr);
            URLConnection urlConnection=url.openConnection();
            InputStream in=urlConnection.getInputStream();
            */
            data=new byte[1024*100];
            //获取当前项目路径+文件
            String path=this.getClass().getResource("/").getPath()+"/news/news_"+type+".xml";
            InputStream in=new FileInputStream(path);
            in.read(data);
            in.close();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        String dataStr= null;
        try {
            //变成字符串
            dataStr = new String(data, "utf8");
            logger.debug(dataStr);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        //去掉空格，不然会出现问题
        return dataStr.trim();
    }
}
