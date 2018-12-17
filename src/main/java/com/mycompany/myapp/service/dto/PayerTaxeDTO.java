package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the PayerTaxe entity.
 */
public class PayerTaxeDTO implements Serializable {

    private Long id;

    private Long compteId;

    private String compteRib;

    private Long taxeId;

    private String taxeDescription;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCompteId() {
        return compteId;
    }

    public void setCompteId(Long compteId) {
        this.compteId = compteId;
    }

    public String getCompteRib() {
        return compteRib;
    }

    public void setCompteRib(String compteRib) {
        this.compteRib = compteRib;
    }

    public Long getTaxeId() {
        return taxeId;
    }

    public void setTaxeId(Long taxeId) {
        this.taxeId = taxeId;
    }

    public String getTaxeDescription() {
        return taxeDescription;
    }

    public void setTaxeDescription(String taxeDescription) {
        this.taxeDescription = taxeDescription;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PayerTaxeDTO payerTaxeDTO = (PayerTaxeDTO) o;
        if (payerTaxeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), payerTaxeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PayerTaxeDTO{" +
            "id=" + getId() +
            ", compte=" + getCompteId() +
            ", compte='" + getCompteRib() + "'" +
            ", taxe=" + getTaxeId() +
            ", taxe='" + getTaxeDescription() + "'" +
            "}";
    }
}
