package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Compte.
 */
@Entity
@Table(name = "compte")
public class Compte implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "rib", nullable = false)
    private String rib;

    @NotNull
    @Column(name = "jhi_password", nullable = false)
    private String password;

    @ManyToOne
    @JsonIgnoreProperties("")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRib() {
        return rib;
    }

    public Compte rib(String rib) {
        this.rib = rib;
        return this;
    }

    public void setRib(String rib) {
        this.rib = rib;
    }

    public String getPassword() {
        return password;
    }

    public Compte password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public User getUser() {
        return user;
    }

    public Compte user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Compte compte = (Compte) o;
        if (compte.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), compte.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Compte{" +
            "id=" + getId() +
            ", rib='" + getRib() + "'" +
            ", password='" + getPassword() + "'" +
            "}";
    }
}
