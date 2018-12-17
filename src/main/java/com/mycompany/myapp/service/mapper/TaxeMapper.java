package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.TaxeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Taxe and its DTO TaxeDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface TaxeMapper extends EntityMapper<TaxeDTO, Taxe> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    TaxeDTO toDto(Taxe taxe);

    @Mapping(source = "userId", target = "user")
    Taxe toEntity(TaxeDTO taxeDTO);

    default Taxe fromId(Long id) {
        if (id == null) {
            return null;
        }
        Taxe taxe = new Taxe();
        taxe.setId(id);
        return taxe;
    }
}
