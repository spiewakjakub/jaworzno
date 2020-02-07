package pl.jspiewak.service.impl;

import pl.jspiewak.service.VideoService;
import pl.jspiewak.domain.Video;
import pl.jspiewak.repository.VideoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Video}.
 */
@Service
@Transactional
public class VideoServiceImpl implements VideoService {

    private final Logger log = LoggerFactory.getLogger(VideoServiceImpl.class);

    private final VideoRepository videoRepository;

    public VideoServiceImpl(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    /**
     * Save a video.
     *
     * @param video the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Video save(Video video) {
        log.debug("Request to save Video : {}", video);
        return videoRepository.save(video);
    }

    /**
     * Get all the videos.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Video> findAll() {
        log.debug("Request to get all Videos");
        return videoRepository.findAll();
    }

    /**
     * Get one video by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Video> findOne(Long id) {
        log.debug("Request to get Video : {}", id);
        return videoRepository.findById(id);
    }

    /**
     * Delete the video by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Video : {}", id);
        videoRepository.deleteById(id);
    }
}
