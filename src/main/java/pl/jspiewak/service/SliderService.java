package pl.jspiewak.service;

import pl.jspiewak.domain.Slider;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Slider}.
 */
public interface SliderService {

    /**
     * Save a slider.
     *
     * @param slider the entity to save.
     * @return the persisted entity.
     */
    Slider save(Slider slider);

    /**
     * Get all the sliders.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Slider> findAll(Pageable pageable);

    /**
     * Get the "id" slider.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Slider> findOne(Long id);

    /**
     * Delete the "id" slider.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
