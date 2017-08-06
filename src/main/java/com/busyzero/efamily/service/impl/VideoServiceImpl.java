package com.busyzero.efamily.service.impl;

import com.busyzero.efamily.domain.Video;
import com.busyzero.efamily.repository.VideoRepository;
import com.busyzero.efamily.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by 11456 on 2017/6/15.
 */
@Service
public class VideoServiceImpl implements VideoService {

    @Autowired
    private VideoRepository videoRepository;
    @Override
    public Video getVideoById(long videoId) {
        return videoRepository.getVideoById(videoId);
    }
}
