package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A PayerTaxe.
 */
@Entity
@Table(name = "payer_taxe")
public class PayerTaxe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Compte compte;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Taxe taxe;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Compte getCompte() {
        return compte;
    }

    public PayerTaxe compte(Compte compte) {
        this.compte = compte;
        return this;
    }

    public void setCompte(Compte compte) {
        this.compte = compte;
    }

    public Taxe getTaxe() {
        return taxe;
    }

    public PayerTaxe taxe(Taxe taxe) {
        this.taxe = taxe;
        return this;
    }

    public void setTaxe(Taxe taxe) {
        this.taxe = taxe;
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
        PayerTaxe payerTaxe = (PayerTaxe) o;
        if (payerTaxe.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), payerTaxe.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PayerTaxe{" +
            "id=" + getId() +
            "}";
    }
}
