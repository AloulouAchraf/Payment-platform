package com.mycompany.myapp.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Compte entity.
 */
public class CompteDTO implements Serializable {

    private Long id;

    @NotNull
    private String rib;

    @NotNull
    private String password;

    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRib() {
        return rib;
    }

    public void setRib(String rib) {
        this.rib = rib;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CompteDTO compteDTO = (CompteDTO) o;
        if (compteDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), compteDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CompteDTO{" +
            "id=" + getId() +
            ", rib='" + getRib() + "'" +
            ", password='" + getPassword() + "'" +
            ", user=" + getUserId() +
            "}";
    }
}
