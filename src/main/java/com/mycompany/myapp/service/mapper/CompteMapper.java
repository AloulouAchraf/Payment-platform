package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.CompteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Compte and its DTO CompteDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface CompteMapper extends EntityMapper<CompteDTO, Compte> {

    @Mapping(source = "user.id", target = "userId")
    CompteDTO toDto(Compte compte);

    @Mapping(source = "userId", target = "user")
    Compte toEntity(CompteDTO compteDTO);

    default Compte fromId(Long id) {
        if (id == null) {
            return null;
        }
        Compte compte = new Compte();
        compte.setId(id);
        return compte;
    }
}
