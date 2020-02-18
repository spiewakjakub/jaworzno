package pl.jspiewak.service.impl;

import pl.jspiewak.service.SliderService;
import pl.jspiewak.domain.Slider;
import pl.jspiewak.repository.SliderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Slider}.
 */
@Service
@Transactional
public class SliderServiceImpl implements SliderService {

    private final Logger log = LoggerFactory.getLogger(SliderServiceImpl.class);

    private final SliderRepository sliderRepository;

    public SliderServiceImpl(SliderRepository sliderRepository) {
        this.sliderRepository = sliderRepository;
    }

    /**
     * Save a slider.
     *
     * @param slider the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Slider save(Slider slider) {
        log.debug("Request to save Slider : {}", slider);
        return sliderRepository.save(slider);
    }

    /**
     * Get all the sliders.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Slider> findAll(Pageable pageable) {
        log.debug("Request to get all Sliders");
        return sliderRepository.findAll(pageable);
    }

    /**
     * Get one slider by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Slider> findOne(Long id) {
        log.debug("Request to get Slider : {}", id);
        return sliderRepository.findById(id);
    }

    /**
     * Delete the slider by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Slider : {}", id);
        sliderRepository.deleteById(id);
    }
}
