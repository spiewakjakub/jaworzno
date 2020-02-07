package pl.jspiewak.web.rest;

import pl.jspiewak.JaworznoApp;
import pl.jspiewak.domain.Place;
import pl.jspiewak.repository.PlaceRepository;
import pl.jspiewak.service.PlaceService;
import pl.jspiewak.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static pl.jspiewak.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PlaceResource} REST controller.
 */
@SpringBootTest(classes = JaworznoApp.class)
public class PlaceResourceIT {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LINK = "AAAAAAAAAA";
    private static final String UPDATED_LINK = "BBBBBBBBBB";

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private PlaceService placeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPlaceMockMvc;

    private Place place;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlaceResource placeResource = new PlaceResource(placeService);
        this.restPlaceMockMvc = MockMvcBuilders.standaloneSetup(placeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Place createEntity(EntityManager em) {
        Place place = new Place()
            .date(DEFAULT_DATE)
            .name(DEFAULT_NAME)
            .link(DEFAULT_LINK);
        return place;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Place createUpdatedEntity(EntityManager em) {
        Place place = new Place()
            .date(UPDATED_DATE)
            .name(UPDATED_NAME)
            .link(UPDATED_LINK);
        return place;
    }

    @BeforeEach
    public void initTest() {
        place = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlace() throws Exception {
        int databaseSizeBeforeCreate = placeRepository.findAll().size();

        // Create the Place
        restPlaceMockMvc.perform(post("/api/places")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(place)))
            .andExpect(status().isCreated());

        // Validate the Place in the database
        List<Place> placeList = placeRepository.findAll();
        assertThat(placeList).hasSize(databaseSizeBeforeCreate + 1);
        Place testPlace = placeList.get(placeList.size() - 1);
        assertThat(testPlace.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testPlace.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPlace.getLink()).isEqualTo(DEFAULT_LINK);
    }

    @Test
    @Transactional
    public void createPlaceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = placeRepository.findAll().size();

        // Create the Place with an existing ID
        place.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlaceMockMvc.perform(post("/api/places")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(place)))
            .andExpect(status().isBadRequest());

        // Validate the Place in the database
        List<Place> placeList = placeRepository.findAll();
        assertThat(placeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPlaces() throws Exception {
        // Initialize the database
        placeRepository.saveAndFlush(place);

        // Get all the placeList
        restPlaceMockMvc.perform(get("/api/places?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(place.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].link").value(hasItem(DEFAULT_LINK)));
    }
    
    @Test
    @Transactional
    public void getPlace() throws Exception {
        // Initialize the database
        placeRepository.saveAndFlush(place);

        // Get the place
        restPlaceMockMvc.perform(get("/api/places/{id}", place.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(place.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.link").value(DEFAULT_LINK));
    }

    @Test
    @Transactional
    public void getNonExistingPlace() throws Exception {
        // Get the place
        restPlaceMockMvc.perform(get("/api/places/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlace() throws Exception {
        // Initialize the database
        placeService.save(place);

        int databaseSizeBeforeUpdate = placeRepository.findAll().size();

        // Update the place
        Place updatedPlace = placeRepository.findById(place.getId()).get();
        // Disconnect from session so that the updates on updatedPlace are not directly saved in db
        em.detach(updatedPlace);
        updatedPlace
            .date(UPDATED_DATE)
            .name(UPDATED_NAME)
            .link(UPDATED_LINK);

        restPlaceMockMvc.perform(put("/api/places")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlace)))
            .andExpect(status().isOk());

        // Validate the Place in the database
        List<Place> placeList = placeRepository.findAll();
        assertThat(placeList).hasSize(databaseSizeBeforeUpdate);
        Place testPlace = placeList.get(placeList.size() - 1);
        assertThat(testPlace.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testPlace.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPlace.getLink()).isEqualTo(UPDATED_LINK);
    }

    @Test
    @Transactional
    public void updateNonExistingPlace() throws Exception {
        int databaseSizeBeforeUpdate = placeRepository.findAll().size();

        // Create the Place

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlaceMockMvc.perform(put("/api/places")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(place)))
            .andExpect(status().isBadRequest());

        // Validate the Place in the database
        List<Place> placeList = placeRepository.findAll();
        assertThat(placeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlace() throws Exception {
        // Initialize the database
        placeService.save(place);

        int databaseSizeBeforeDelete = placeRepository.findAll().size();

        // Delete the place
        restPlaceMockMvc.perform(delete("/api/places/{id}", place.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Place> placeList = placeRepository.findAll();
        assertThat(placeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
