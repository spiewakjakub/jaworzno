package pl.jspiewak.service;

import pl.jspiewak.domain.Sponsor;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Sponsor}.
 */
public interface SponsorService {

    /**
     * Save a sponsor.
     *
     * @param sponsor the entity to save.
     * @return the persisted entity.
     */
    Sponsor save(Sponsor sponsor);

    /**
     * Get all the sponsors.
     *
     * @return the list of entities.
     */
    List<Sponsor> findAll();

    /**
     * Get the "id" sponsor.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Sponsor> findOne(Long id);

    /**
     * Delete the "id" sponsor.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
