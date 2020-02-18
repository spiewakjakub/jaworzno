package pl.jspiewak.web.rest;

import pl.jspiewak.JaworznoApp;
import pl.jspiewak.domain.Slider;
import pl.jspiewak.repository.SliderRepository;
import pl.jspiewak.service.SliderService;
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
 * Integration tests for the {@link SliderResource} REST controller.
 */
@SpringBootTest(classes = JaworznoApp.class)
public class SliderResourceIT {

    private static final byte[] DEFAULT_PICTURE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PICTURE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PICTURE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PICTURE_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_LINK = "AAAAAAAAAA";
    private static final String UPDATED_LINK = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private SliderRepository sliderRepository;

    @Autowired
    private SliderService sliderService;

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

    private MockMvc restSliderMockMvc;

    private Slider slider;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SliderResource sliderResource = new SliderResource(sliderService);
        this.restSliderMockMvc = MockMvcBuilders.standaloneSetup(sliderResource)
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
    public static Slider createEntity(EntityManager em) {
        Slider slider = new Slider()
            .picture(DEFAULT_PICTURE)
            .pictureContentType(DEFAULT_PICTURE_CONTENT_TYPE)
            .link(DEFAULT_LINK)
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION);
        return slider;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Slider createUpdatedEntity(EntityManager em) {
        Slider slider = new Slider()
            .picture(UPDATED_PICTURE)
            .pictureContentType(UPDATED_PICTURE_CONTENT_TYPE)
            .link(UPDATED_LINK)
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION);
        return slider;
    }

    @BeforeEach
    public void initTest() {
        slider = createEntity(em);
    }

    @Test
    @Transactional
    public void createSlider() throws Exception {
        int databaseSizeBeforeCreate = sliderRepository.findAll().size();

        // Create the Slider
        restSliderMockMvc.perform(post("/api/sliders")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(slider)))
            .andExpect(status().isCreated());

        // Validate the Slider in the database
        List<Slider> sliderList = sliderRepository.findAll();
        assertThat(sliderList).hasSize(databaseSizeBeforeCreate + 1);
        Slider testSlider = sliderList.get(sliderList.size() - 1);
        assertThat(testSlider.getPicture()).isEqualTo(DEFAULT_PICTURE);
        assertThat(testSlider.getPictureContentType()).isEqualTo(DEFAULT_PICTURE_CONTENT_TYPE);
        assertThat(testSlider.getLink()).isEqualTo(DEFAULT_LINK);
        assertThat(testSlider.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testSlider.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createSliderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sliderRepository.findAll().size();

        // Create the Slider with an existing ID
        slider.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSliderMockMvc.perform(post("/api/sliders")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(slider)))
            .andExpect(status().isBadRequest());

        // Validate the Slider in the database
        List<Slider> sliderList = sliderRepository.findAll();
        assertThat(sliderList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSliders() throws Exception {
        // Initialize the database
        sliderRepository.saveAndFlush(slider);

        // Get all the sliderList
        restSliderMockMvc.perform(get("/api/sliders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(slider.getId().intValue())))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))))
            .andExpect(jsonPath("$.[*].link").value(hasItem(DEFAULT_LINK)))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getSlider() throws Exception {
        // Initialize the database
        sliderRepository.saveAndFlush(slider);

        // Get the slider
        restSliderMockMvc.perform(get("/api/sliders/{id}", slider.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(slider.getId().intValue()))
            .andExpect(jsonPath("$.pictureContentType").value(DEFAULT_PICTURE_CONTENT_TYPE))
            .andExpect(jsonPath("$.picture").value(Base64Utils.encodeToString(DEFAULT_PICTURE)))
            .andExpect(jsonPath("$.link").value(DEFAULT_LINK))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    public void getNonExistingSlider() throws Exception {
        // Get the slider
        restSliderMockMvc.perform(get("/api/sliders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSlider() throws Exception {
        // Initialize the database
        sliderService.save(slider);

        int databaseSizeBeforeUpdate = sliderRepository.findAll().size();

        // Update the slider
        Slider updatedSlider = sliderRepository.findById(slider.getId()).get();
        // Disconnect from session so that the updates on updatedSlider are not directly saved in db
        em.detach(updatedSlider);
        updatedSlider
            .picture(UPDATED_PICTURE)
            .pictureContentType(UPDATED_PICTURE_CONTENT_TYPE)
            .link(UPDATED_LINK)
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION);

        restSliderMockMvc.perform(put("/api/sliders")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSlider)))
            .andExpect(status().isOk());

        // Validate the Slider in the database
        List<Slider> sliderList = sliderRepository.findAll();
        assertThat(sliderList).hasSize(databaseSizeBeforeUpdate);
        Slider testSlider = sliderList.get(sliderList.size() - 1);
        assertThat(testSlider.getPicture()).isEqualTo(UPDATED_PICTURE);
        assertThat(testSlider.getPictureContentType()).isEqualTo(UPDATED_PICTURE_CONTENT_TYPE);
        assertThat(testSlider.getLink()).isEqualTo(UPDATED_LINK);
        assertThat(testSlider.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testSlider.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingSlider() throws Exception {
        int databaseSizeBeforeUpdate = sliderRepository.findAll().size();

        // Create the Slider

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSliderMockMvc.perform(put("/api/sliders")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(slider)))
            .andExpect(status().isBadRequest());

        // Validate the Slider in the database
        List<Slider> sliderList = sliderRepository.findAll();
        assertThat(sliderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSlider() throws Exception {
        // Initialize the database
        sliderService.save(slider);

        int databaseSizeBeforeDelete = sliderRepository.findAll().size();

        // Delete the slider
        restSliderMockMvc.perform(delete("/api/sliders/{id}", slider.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Slider> sliderList = sliderRepository.findAll();
        assertThat(sliderList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
