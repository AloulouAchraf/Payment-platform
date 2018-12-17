package com.mycompany.myapp.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Taxe entity.
 */
public class TaxeDTO implements Serializable {

    private Long id;

    @NotNull
    private Long montantTaxe;

    @NotNull
    private String description;

    private Long userId;

    private String userLogin;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMontantTaxe() {
        return montantTaxe;
    }

    public void setMontantTaxe(Long montantTaxe) {
        this.montantTaxe = montantTaxe;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TaxeDTO taxeDTO = (TaxeDTO) o;
        if (taxeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), taxeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TaxeDTO{" +
            "id=" + getId() +
            ", montantTaxe=" + getMontantTaxe() +
            ", description='" + getDescription() + "'" +
            ", user=" + getUserId() +
            ", user='" + getUserLogin() + "'" +
            "}";
    }
}
