package pl.jspiewak.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

import static org.apache.commons.lang3.ArrayUtils.*;

@RestController
@RequestMapping("/api/util")
public class UtilsResource {

    private final Logger log = LoggerFactory.getLogger(UtilsResource.class);

    private final Resource resource = new ClassPathResource("images/main_logo.png");

    @GetMapping(value = "/logo", produces = MediaType.IMAGE_PNG_VALUE)
    public byte[] getMainLogo() throws IOException {
        log.debug("Request to get main logo");
        return nullToEmpty(resource.getInputStream().readAllBytes());
    }
}
