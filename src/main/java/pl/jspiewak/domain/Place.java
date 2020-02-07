package pl.jspiewak.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Place.
 */
@Entity
@Table(name = "place")
public class Place implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "date")
    private Instant date;

    @Column(name = "name")
    private String name;

    @Column(name = "link")
    private String link;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public Place date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getName() {
        return name;
    }

    public Place name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLink() {
        return link;
    }

    public Place link(String link) {
        this.link = link;
        return this;
    }

    public void setLink(String link) {
        this.link = link;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Place)) {
            return false;
        }
        return id != null && id.equals(((Place) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Place{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", name='" + getName() + "'" +
            ", link='" + getLink() + "'" +
            "}";
    }
}
