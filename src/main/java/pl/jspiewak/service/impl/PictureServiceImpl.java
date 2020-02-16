package pl.jspiewak.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.jspiewak.domain.Picture;
import pl.jspiewak.repository.PictureRepository;
import pl.jspiewak.service.PictureService;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Picture}.
 */
@Service
@Transactional
public class PictureServiceImpl implements PictureService {

    private final Logger log = LoggerFactory.getLogger(PictureServiceImpl.class);

    private final PictureRepository pictureRepository;

    public PictureServiceImpl(PictureRepository pictureRepository) {
        this.pictureRepository = pictureRepository;
    }

    /**
     * Save a picture.
     *
     * @param picture the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Picture save(Picture picture) {
        log.debug("Request to save Picture : {}", picture);
        return pictureRepository.save(picture);
    }

    /**
     * Get all the pictures.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Picture> findAll() {
        log.debug("Request to get all Pictures");
        return pictureRepository.findAll();
    }

    /**
     * Get one picture by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Picture> findOne(Long id) {
        log.debug("Request to get Picture : {}", id);
        return pictureRepository.findById(id);
    }

    /**
     * Delete the picture by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Picture : {}", id);
        pictureRepository.deleteById(id);
    }

    @Override
    public Page<Picture> getPageByAlbumId(Long id, Pageable pageable) {
        log.debug("Request to get page : {} of album id : {}", pageable.getPageNumber(), id);
        return pictureRepository.findAllByAlbum_Id(id, pageable);
    }
}
