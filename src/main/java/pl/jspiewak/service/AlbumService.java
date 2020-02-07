package pl.jspiewak.service;

import pl.jspiewak.domain.Album;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Album}.
 */
public interface AlbumService {

    /**
     * Save a album.
     *
     * @param album the entity to save.
     * @return the persisted entity.
     */
    Album save(Album album);

    /**
     * Get all the albums.
     *
     * @return the list of entities.
     */
    List<Album> findAll();

    /**
     * Get the "id" album.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Album> findOne(Long id);

    /**
     * Delete the "id" album.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
