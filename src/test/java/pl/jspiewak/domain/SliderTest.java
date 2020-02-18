package pl.jspiewak.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import pl.jspiewak.web.rest.TestUtil;

public class SliderTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Slider.class);
        Slider slider1 = new Slider();
        slider1.setId(1L);
        Slider slider2 = new Slider();
        slider2.setId(slider1.getId());
        assertThat(slider1).isEqualTo(slider2);
        slider2.setId(2L);
        assertThat(slider1).isNotEqualTo(slider2);
        slider1.setId(null);
        assertThat(slider1).isNotEqualTo(slider2);
    }
}
