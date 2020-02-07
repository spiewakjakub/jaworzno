package pl.jspiewak.service.impl;

import pl.jspiewak.service.PosterService;
import pl.jspiewak.domain.Poster;
import pl.jspiewak.repository.PosterRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Poster}.
 */
@Service
@Transactional
public class PosterServiceImpl implements PosterService {

    private final Logger log = LoggerFactory.getLogger(PosterServiceImpl.class);

    private final PosterRepository posterRepository;

    public PosterServiceImpl(PosterRepository posterRepository) {
        this.posterRepository = posterRepository;
    }

    /**
     * Save a poster.
     *
     * @param poster the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Poster save(Poster poster) {
        log.debug("Request to save Poster : {}", poster);
        return posterRepository.save(poster);
    }

    /**
     * Get all the posters.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Poster> findAll() {
        log.debug("Request to get all Posters");
        return posterRepository.findAll();
    }

    /**
     * Get one poster by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Poster> findOne(Long id) {
        log.debug("Request to get Poster : {}", id);
        return posterRepository.findById(id);
    }

    /**
     * Delete the poster by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Poster : {}", id);
        posterRepository.deleteById(id);
    }
}
