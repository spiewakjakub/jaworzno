package pl.jspiewak.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pl.jspiewak.domain.News;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link News}.
 */
public interface NewsService {

    /**
     * Save a news.
     *
     * @param news the entity to save.
     * @return the persisted entity.
     */
    News save(News news);

    /**
     * Get all the news.
     *
     * @return the list of entities.
     */
    List<News> findAll();

    /**
     * Get the "id" news.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<News> findOne(Long id);

    /**
     * Delete the "id" news.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Get "page" of news
     *
     * @param pageable pageable
     * @return the page of entities
     */
    Page<News> findAll(Pageable pageable);
}
