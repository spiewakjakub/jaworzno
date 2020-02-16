package pl.jspiewak.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pl.jspiewak.domain.Picture;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Picture}.
 */
public interface PictureService {

    /**
     * Save a picture.
     *
     * @param picture the entity to save.
     * @return the persisted entity.
     */
    Picture save(Picture picture);

    /**
     * Get all the pictures.
     *
     * @return the list of entities.
     */
    List<Picture> findAll();

    /**
     * Get the "id" picture.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Picture> findOne(Long id);

    /**
     * Delete the "id" picture.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    Page<Picture> getPageByAlbumId(Long id, Pageable pageable);
}
