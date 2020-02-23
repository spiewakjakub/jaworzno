package pl.jspiewak.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import pl.jspiewak.domain.Album;
import pl.jspiewak.repository.AlbumRepository;
import pl.jspiewak.service.AlbumService;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Album}.
 */
@Service
@Transactional
public class AlbumServiceImpl implements AlbumService {

    private final Logger log = LoggerFactory.getLogger(AlbumServiceImpl.class);

    private final AlbumRepository albumRepository;

    public AlbumServiceImpl(AlbumRepository albumRepository) {
        this.albumRepository = albumRepository;
    }

    /**
     * Save a album.
     *
     * @param album the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Album save(Album album) {
        log.debug("Request to save Album : {}", album);
        return albumRepository.save(album);
    }

    /**
     * Get all the albums.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Album> findAll() {
        log.debug("Request to get all Albums");
        return albumRepository.findAll();
    }

    /**
     * Get one album by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Album> findOne(Long id) {
        log.debug("Request to get Album : {}", id);
        return albumRepository.findById(id);
    }

    /**
     * Delete the album by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Album : {}", id);
        albumRepository.deleteById(id);
    }

    @Override
    public Page<Album> findAll(Pageable pageable) {
        return albumRepository.findAll(pageable);
    }

    @Override
    public List<Album> getAllWithFirstPicture(Pageable pageable) {
        return albumRepository
            .findAll(pageable)
            .stream()
            .filter(album -> !CollectionUtils.isEmpty(album.getPictures()))
            .peek(album -> album.setPictures(Set.of(album.getPictures().iterator().next())))
            .collect(Collectors.toList());
    }

    @Override
    public Album getNewest() {
        return albumRepository.findFirstByOrderByDateDesc();
    }
}
