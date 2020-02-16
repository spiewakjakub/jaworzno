package pl.jspiewak.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.jspiewak.domain.Picture;

/**
 * Spring Data  repository for the Picture entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PictureRepository extends JpaRepository<Picture, Long> {

    Page<Picture> findAllByAlbum_Id(Long id, Pageable pageable);
}
