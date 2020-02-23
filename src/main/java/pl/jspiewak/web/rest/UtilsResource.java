package pl.jspiewak.web.rest;

import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.io.IOException;

import static org.apache.commons.lang3.ArrayUtils.nullToEmpty;

@RestController
@RequestMapping("/api/util")
public class UtilsResource {

    private final Logger log = LoggerFactory.getLogger(UtilsResource.class);

    private final Resource mainLogoResource = new ClassPathResource("images/main_logo.png");
    private final Resource cycleInfoResource = new ClassPathResource("images/cycle_info.jpg");

    final
    DataSource dataSource;

    public UtilsResource(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @GetMapping(value = "/logo", produces = MediaType.IMAGE_PNG_VALUE)
    public byte[] getMainLogo() throws IOException {
        log.debug("Request to get main logo");
        return nullToEmpty(mainLogoResource.getInputStream().readAllBytes());
    }

    @GetMapping(value = "/cycle-info-image", produces = MediaType.IMAGE_PNG_VALUE)
    public byte[] getCycleInfoImage() throws IOException {
        log.debug("Request to get main logo");
        return nullToEmpty(cycleInfoResource.getInputStream().readAllBytes());
    }

    @GetMapping(value = "/db")
    public String getH2Connection() {
        log.debug("Request to get main logo");
        return ((HikariDataSource) dataSource).getJdbcUrl();
    }


}
