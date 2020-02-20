package pl.jspiewak.domain;


import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;
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

    @Column(name = "date")
    private Instant date;

    @Lob
    @Type(type = "byte[]")
    @Column(name = "main_picture", nullable = false)
    private byte[] mainPicture;

    @Column(name = "main_picture_content_type", nullable = false)
    private String mainPictureContentType;

    @OneToMany(mappedBy = "album", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
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

    public void setTitle(String title) {
        this.title = title;
    }

    public Album title(String title) {
        this.title = title;
        return this;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Album date(Instant date) {
        this.date = date;
        return this;
    }

    public byte[] getMainPicture() {
        return mainPicture;
    }

    public void setMainPicture(byte[] mainPicture) {
        this.mainPicture = mainPicture;
    }

    public Album mainPicture(byte[] mainPicture) {
        this.mainPicture = mainPicture;
        return this;
    }

    public String getMainPictureContentType() {
        return mainPictureContentType;
    }

    public void setMainPictureContentType(String mainPictureContentType) {
        this.mainPictureContentType = mainPictureContentType;
    }

    public Album mainPictureContentType(String mainPictureContentType) {
        this.mainPictureContentType = mainPictureContentType;
        return this;
    }

    public Set<Picture> getPictures() {
        return pictures;
    }

    public void setPictures(Set<Picture> pictures) {
        this.pictures = pictures;
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
