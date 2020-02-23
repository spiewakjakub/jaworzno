package pl.jspiewak.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pl.jspiewak.domain.Video;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Video}.
 */
public interface VideoService {

    /**
     * Save a video.
     *
     * @param video the entity to save.
     * @return the persisted entity.
     */
    Video save(Video video);

    /**
     * Get all the videos.
     *
     * @return the list of entities.
     */
    List<Video> findAll();

    /**
     * Get the "id" video.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Video> findOne(Long id);

    /**
     * Delete the "id" video.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);


    Page<Video> findAll(Pageable pageable);
}
