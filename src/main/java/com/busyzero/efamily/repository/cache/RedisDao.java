package com.busyzero.efamily.repository.cache;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

/**
 * Created by 11456 on 2016/12/27.
 */
public class RedisDao {
    private Logger logger= LoggerFactory.getLogger(this.getClass());

    private final JedisPool jedisPool;

    public RedisDao(String ip, int port){
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        jedisPoolConfig.setMaxTotal(1024);
        jedisPoolConfig.setMaxIdle(100);
        jedisPoolConfig.setMaxWaitMillis(100);
        jedisPoolConfig.setTestOnBorrow(false);//jedis 第一次启动时，会报错
        jedisPoolConfig.setTestOnReturn(true);
        // 初始化JedisPool
        jedisPool = new JedisPool(jedisPoolConfig, ip, port, 2000);
    }

    public Jedis getJedis(){
        logger.debug("request a jedis");
        return jedisPool.getResource();
    }
}
