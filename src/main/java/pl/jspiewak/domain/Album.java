package pl.jspiewak.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Album.
 */
@Entity
@Table(name = "album")
public class Album implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "title")
    private String title;

    @OneToMany(mappedBy = "album", fetch = FetchType.EAGER)
    private Set<Picture> pictures = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Album title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Set<Picture> getPictures() {
        return pictures;
    }

    public Album pictures(Set<Picture> pictures) {
        this.pictures = pictures;
        return this;
    }

    public Album addPicture(Picture picture) {
        this.pictures.add(picture);
        picture.setAlbum(this);
        return this;
    }

    public Album removePicture(Picture picture) {
        this.pictures.remove(picture);
        picture.setAlbum(null);
        return this;
    }

    public void setPictures(Set<Picture> pictures) {
        this.pictures = pictures;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Album)) {
            return false;
        }
        return id != null && id.equals(((Album) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Album{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            "}";
    }
}
