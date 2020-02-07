package pl.jspiewak.web.rest;

import pl.jspiewak.domain.Sponsor;
import pl.jspiewak.service.SponsorService;
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
 * REST controller for managing {@link pl.jspiewak.domain.Sponsor}.
 */
@RestController
@RequestMapping("/api")
public class SponsorResource {

    private final Logger log = LoggerFactory.getLogger(SponsorResource.class);

    private static final String ENTITY_NAME = "sponsor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SponsorService sponsorService;

    public SponsorResource(SponsorService sponsorService) {
        this.sponsorService = sponsorService;
    }

    /**
     * {@code POST  /sponsors} : Create a new sponsor.
     *
     * @param sponsor the sponsor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sponsor, or with status {@code 400 (Bad Request)} if the sponsor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sponsors")
    public ResponseEntity<Sponsor> createSponsor(@RequestBody Sponsor sponsor) throws URISyntaxException {
        log.debug("REST request to save Sponsor : {}", sponsor);
        if (sponsor.getId() != null) {
            throw new BadRequestAlertException("A new sponsor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Sponsor result = sponsorService.save(sponsor);
        return ResponseEntity.created(new URI("/api/sponsors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sponsors} : Updates an existing sponsor.
     *
     * @param sponsor the sponsor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sponsor,
     * or with status {@code 400 (Bad Request)} if the sponsor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sponsor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sponsors")
    public ResponseEntity<Sponsor> updateSponsor(@RequestBody Sponsor sponsor) throws URISyntaxException {
        log.debug("REST request to update Sponsor : {}", sponsor);
        if (sponsor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Sponsor result = sponsorService.save(sponsor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sponsor.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sponsors} : get all the sponsors.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sponsors in body.
     */
    @GetMapping("/sponsors")
    public List<Sponsor> getAllSponsors() {
        log.debug("REST request to get all Sponsors");
        return sponsorService.findAll();
    }

    /**
     * {@code GET  /sponsors/:id} : get the "id" sponsor.
     *
     * @param id the id of the sponsor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sponsor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sponsors/{id}")
    public ResponseEntity<Sponsor> getSponsor(@PathVariable Long id) {
        log.debug("REST request to get Sponsor : {}", id);
        Optional<Sponsor> sponsor = sponsorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(sponsor);
    }

    /**
     * {@code DELETE  /sponsors/:id} : delete the "id" sponsor.
     *
     * @param id the id of the sponsor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sponsors/{id}")
    public ResponseEntity<Void> deleteSponsor(@PathVariable Long id) {
        log.debug("REST request to delete Sponsor : {}", id);
        sponsorService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
