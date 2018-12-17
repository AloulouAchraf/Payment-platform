package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Taxe.
 */
@Entity
@Table(name = "taxe")
public class Taxe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "montant_taxe", nullable = false)
    private Long montantTaxe;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

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

    public Long getMontantTaxe() {
        return montantTaxe;
    }

    public Taxe montantTaxe(Long montantTaxe) {
        this.montantTaxe = montantTaxe;
        return this;
    }

    public void setMontantTaxe(Long montantTaxe) {
        this.montantTaxe = montantTaxe;
    }

    public String getDescription() {
        return description;
    }

    public Taxe description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getUser() {
        return user;
    }

    public Taxe user(User user) {
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
        Taxe taxe = (Taxe) o;
        if (taxe.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), taxe.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Taxe{" +
            "id=" + getId() +
            ", montantTaxe=" + getMontantTaxe() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
