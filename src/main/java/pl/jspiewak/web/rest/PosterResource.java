package pl.jspiewak.web.rest;

import pl.jspiewak.domain.Poster;
import pl.jspiewak.service.PosterService;
import pl.jspiewak.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link pl.jspiewak.domain.Poster}.
 */
@RestController
@RequestMapping("/api")
public class PosterResource {

    private final Logger log = LoggerFactory.getLogger(PosterResource.class);

    private static final String ENTITY_NAME = "poster";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PosterService posterService;

    public PosterResource(PosterService posterService) {
        this.posterService = posterService;
    }

    /**
     * {@code POST  /posters} : Create a new poster.
     *
     * @param poster the poster to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new poster, or with status {@code 400 (Bad Request)} if the poster has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/posters")
    public ResponseEntity<Poster> createPoster(@RequestBody Poster poster) throws URISyntaxException {
        log.debug("REST request to save Poster : {}", poster);
        if (poster.getId() != null) {
            throw new BadRequestAlertException("A new poster cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Poster result = posterService.save(poster);
        return ResponseEntity.created(new URI("/api/posters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /posters} : Updates an existing poster.
     *
     * @param poster the poster to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated poster,
     * or with status {@code 400 (Bad Request)} if the poster is not valid,
     * or with status {@code 500 (Internal Server Error)} if the poster couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/posters")
    public ResponseEntity<Poster> updatePoster(@RequestBody Poster poster) throws URISyntaxException {
        log.debug("REST request to update Poster : {}", poster);
        if (poster.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Poster result = posterService.save(poster);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, poster.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /posters} : get all the posters.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of posters in body.
     */
    @GetMapping("/posters")
    public List<Poster> getAllPosters() {
        log.debug("REST request to get all Posters");
        return posterService.findAll();
    }

    /**
     * {@code GET  /posters/:id} : get the "id" poster.
     *
     * @param id the id of the poster to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the poster, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/posters/{id}")
    public ResponseEntity<Poster> getPoster(@PathVariable Long id) {
        log.debug("REST request to get Poster : {}", id);
        Optional<Poster> poster = posterService.findOne(id);
        return ResponseUtil.wrapOrNotFound(poster);
    }

    /**
     * {@code DELETE  /posters/:id} : delete the "id" poster.
     *
     * @param id the id of the poster to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/posters/{id}")
    public ResponseEntity<Void> deletePoster(@PathVariable Long id) {
        log.debug("REST request to delete Poster : {}", id);
        posterService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
