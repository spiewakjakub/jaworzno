package pl.jspiewak.service;

import pl.jspiewak.domain.Poster;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Poster}.
 */
public interface PosterService {

    /**
     * Save a poster.
     *
     * @param poster the entity to save.
     * @return the persisted entity.
     */
    Poster save(Poster poster);

    /**
     * Get all the posters.
     *
     * @return the list of entities.
     */
    List<Poster> findAll();

    /**
     * Get the "id" poster.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Poster> findOne(Long id);

    /**
     * Delete the "id" poster.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
