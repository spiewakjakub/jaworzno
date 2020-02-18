package pl.jspiewak.web.rest;

import pl.jspiewak.domain.Slider;
import pl.jspiewak.service.SliderService;
import pl.jspiewak.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link pl.jspiewak.domain.Slider}.
 */
@RestController
@RequestMapping("/api")
public class SliderResource {

    private final Logger log = LoggerFactory.getLogger(SliderResource.class);

    private static final String ENTITY_NAME = "slider";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SliderService sliderService;

    public SliderResource(SliderService sliderService) {
        this.sliderService = sliderService;
    }

    /**
     * {@code POST  /sliders} : Create a new slider.
     *
     * @param slider the slider to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new slider, or with status {@code 400 (Bad Request)} if the slider has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sliders")
    public ResponseEntity<Slider> createSlider(@RequestBody Slider slider) throws URISyntaxException {
        log.debug("REST request to save Slider : {}", slider);
        if (slider.getId() != null) {
            throw new BadRequestAlertException("A new slider cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Slider result = sliderService.save(slider);
        return ResponseEntity.created(new URI("/api/sliders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sliders} : Updates an existing slider.
     *
     * @param slider the slider to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated slider,
     * or with status {@code 400 (Bad Request)} if the slider is not valid,
     * or with status {@code 500 (Internal Server Error)} if the slider couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sliders")
    public ResponseEntity<Slider> updateSlider(@RequestBody Slider slider) throws URISyntaxException {
        log.debug("REST request to update Slider : {}", slider);
        if (slider.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Slider result = sliderService.save(slider);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, slider.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sliders} : get all the sliders.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sliders in body.
     */
    @GetMapping("/sliders")
    public ResponseEntity<List<Slider>> getAllSliders(Pageable pageable) {
        log.debug("REST request to get a page of Sliders");
        Page<Slider> page = sliderService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /sliders/:id} : get the "id" slider.
     *
     * @param id the id of the slider to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the slider, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sliders/{id}")
    public ResponseEntity<Slider> getSlider(@PathVariable Long id) {
        log.debug("REST request to get Slider : {}", id);
        Optional<Slider> slider = sliderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(slider);
    }

    /**
     * {@code DELETE  /sliders/:id} : delete the "id" slider.
     *
     * @param id the id of the slider to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sliders/{id}")
    public ResponseEntity<Void> deleteSlider(@PathVariable Long id) {
        log.debug("REST request to delete Slider : {}", id);
        sliderService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
