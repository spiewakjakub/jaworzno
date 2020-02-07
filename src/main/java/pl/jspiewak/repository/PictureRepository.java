package pl.jspiewak.repository;

import pl.jspiewak.domain.Picture;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Picture entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PictureRepository extends JpaRepository<Picture, Long> {

}
