package pl.jspiewak.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import pl.jspiewak.domain.Album;
import pl.jspiewak.service.PlaceService;
import pl.jspiewak.domain.Place;
import pl.jspiewak.repository.PlaceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Place}.
 */
@Service
@Transactional
public class PlaceServiceImpl implements PlaceService {

    private final Logger log = LoggerFactory.getLogger(PlaceServiceImpl.class);

    private final PlaceRepository placeRepository;

    public PlaceServiceImpl(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    /**
     * Save a place.
     *
     * @param place the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Place save(Place place) {
        log.debug("Request to save Place : {}", place);
        return placeRepository.save(place);
    }

    /**
     * Get all the places.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Place> findAll() {
        log.debug("Request to get all Places");
        return placeRepository.findAll();
    }

    /**
     * Get one place by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Place> findOne(Long id) {
        log.debug("Request to get Place : {}", id);
        return placeRepository.findById(id);
    }

    /**
     * Delete the place by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Place : {}", id);
        placeRepository.deleteById(id);
    }

    @Override
    public List<Place> getByPage(PageRequest pageRequest) {
        return placeRepository.findAll(pageRequest).stream().collect(Collectors.toList());
    }
}
