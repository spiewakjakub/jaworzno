package pl.jspiewak.web.rest;

import pl.jspiewak.JaworznoApp;
import pl.jspiewak.domain.Poster;
import pl.jspiewak.repository.PosterRepository;
import pl.jspiewak.service.PosterService;
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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static pl.jspiewak.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PosterResource} REST controller.
 */
@SpringBootTest(classes = JaworznoApp.class)
public class PosterResourceIT {

    private static final byte[] DEFAULT_DATA = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_DATA = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_DATA_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_DATA_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_LINK = "AAAAAAAAAA";
    private static final String UPDATED_LINK = "BBBBBBBBBB";

    @Autowired
    private PosterRepository posterRepository;

    @Autowired
    private PosterService posterService;

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

    private MockMvc restPosterMockMvc;

    private Poster poster;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PosterResource posterResource = new PosterResource(posterService);
        this.restPosterMockMvc = MockMvcBuilders.standaloneSetup(posterResource)
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
    public static Poster createEntity(EntityManager em) {
        Poster poster = new Poster()
            .data(DEFAULT_DATA)
            .dataContentType(DEFAULT_DATA_CONTENT_TYPE)
            .link(DEFAULT_LINK);
        return poster;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Poster createUpdatedEntity(EntityManager em) {
        Poster poster = new Poster()
            .data(UPDATED_DATA)
            .dataContentType(UPDATED_DATA_CONTENT_TYPE)
            .link(UPDATED_LINK);
        return poster;
    }

    @BeforeEach
    public void initTest() {
        poster = createEntity(em);
    }

    @Test
    @Transactional
    public void createPoster() throws Exception {
        int databaseSizeBeforeCreate = posterRepository.findAll().size();

        // Create the Poster
        restPosterMockMvc.perform(post("/api/posters")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(poster)))
            .andExpect(status().isCreated());

        // Validate the Poster in the database
        List<Poster> posterList = posterRepository.findAll();
        assertThat(posterList).hasSize(databaseSizeBeforeCreate + 1);
        Poster testPoster = posterList.get(posterList.size() - 1);
        assertThat(testPoster.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testPoster.getDataContentType()).isEqualTo(DEFAULT_DATA_CONTENT_TYPE);
        assertThat(testPoster.getLink()).isEqualTo(DEFAULT_LINK);
    }

    @Test
    @Transactional
    public void createPosterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = posterRepository.findAll().size();

        // Create the Poster with an existing ID
        poster.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPosterMockMvc.perform(post("/api/posters")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(poster)))
            .andExpect(status().isBadRequest());

        // Validate the Poster in the database
        List<Poster> posterList = posterRepository.findAll();
        assertThat(posterList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPosters() throws Exception {
        // Initialize the database
        posterRepository.saveAndFlush(poster);

        // Get all the posterList
        restPosterMockMvc.perform(get("/api/posters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(poster.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataContentType").value(hasItem(DEFAULT_DATA_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].data").value(hasItem(Base64Utils.encodeToString(DEFAULT_DATA))))
            .andExpect(jsonPath("$.[*].link").value(hasItem(DEFAULT_LINK)));
    }
    
    @Test
    @Transactional
    public void getPoster() throws Exception {
        // Initialize the database
        posterRepository.saveAndFlush(poster);

        // Get the poster
        restPosterMockMvc.perform(get("/api/posters/{id}", poster.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(poster.getId().intValue()))
            .andExpect(jsonPath("$.dataContentType").value(DEFAULT_DATA_CONTENT_TYPE))
            .andExpect(jsonPath("$.data").value(Base64Utils.encodeToString(DEFAULT_DATA)))
            .andExpect(jsonPath("$.link").value(DEFAULT_LINK));
    }

    @Test
    @Transactional
    public void getNonExistingPoster() throws Exception {
        // Get the poster
        restPosterMockMvc.perform(get("/api/posters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePoster() throws Exception {
        // Initialize the database
        posterService.save(poster);

        int databaseSizeBeforeUpdate = posterRepository.findAll().size();

        // Update the poster
        Poster updatedPoster = posterRepository.findById(poster.getId()).get();
        // Disconnect from session so that the updates on updatedPoster are not directly saved in db
        em.detach(updatedPoster);
        updatedPoster
            .data(UPDATED_DATA)
            .dataContentType(UPDATED_DATA_CONTENT_TYPE)
            .link(UPDATED_LINK);

        restPosterMockMvc.perform(put("/api/posters")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPoster)))
            .andExpect(status().isOk());

        // Validate the Poster in the database
        List<Poster> posterList = posterRepository.findAll();
        assertThat(posterList).hasSize(databaseSizeBeforeUpdate);
        Poster testPoster = posterList.get(posterList.size() - 1);
        assertThat(testPoster.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testPoster.getDataContentType()).isEqualTo(UPDATED_DATA_CONTENT_TYPE);
        assertThat(testPoster.getLink()).isEqualTo(UPDATED_LINK);
    }

    @Test
    @Transactional
    public void updateNonExistingPoster() throws Exception {
        int databaseSizeBeforeUpdate = posterRepository.findAll().size();

        // Create the Poster

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPosterMockMvc.perform(put("/api/posters")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(poster)))
            .andExpect(status().isBadRequest());

        // Validate the Poster in the database
        List<Poster> posterList = posterRepository.findAll();
        assertThat(posterList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePoster() throws Exception {
        // Initialize the database
        posterService.save(poster);

        int databaseSizeBeforeDelete = posterRepository.findAll().size();

        // Delete the poster
        restPosterMockMvc.perform(delete("/api/posters/{id}", poster.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Poster> posterList = posterRepository.findAll();
        assertThat(posterList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
