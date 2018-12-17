package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.PayerTaxeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PayerTaxe and its DTO PayerTaxeDTO.
 */
@Mapper(componentModel = "spring", uses = {CompteMapper.class, TaxeMapper.class})
public interface PayerTaxeMapper extends EntityMapper<PayerTaxeDTO, PayerTaxe> {

    @Mapping(source = "compte.id", target = "compteId")
    @Mapping(source = "compte.rib", target = "compteRib")
    @Mapping(source = "taxe.id", target = "taxeId")
    @Mapping(source = "taxe.description", target = "taxeDescription")
    PayerTaxeDTO toDto(PayerTaxe payerTaxe);

    @Mapping(source = "compteId", target = "compte")
    @Mapping(source = "taxeId", target = "taxe")
    PayerTaxe toEntity(PayerTaxeDTO payerTaxeDTO);

    default PayerTaxe fromId(Long id) {
        if (id == null) {
            return null;
        }
        PayerTaxe payerTaxe = new PayerTaxe();
        payerTaxe.setId(id);
        return payerTaxe;
    }
}
