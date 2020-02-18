package pl.jspiewak.repository;

import pl.jspiewak.domain.Slider;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Slider entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SliderRepository extends JpaRepository<Slider, Long> {

}
