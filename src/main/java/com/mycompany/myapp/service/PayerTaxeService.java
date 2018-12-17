package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.PayerTaxeDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing PayerTaxe.
 */
public interface PayerTaxeService {

    /**
     * Save a payerTaxe.
     *
     * @param payerTaxeDTO the entity to save
     * @return the persisted entity
     */
    PayerTaxeDTO save(PayerTaxeDTO payerTaxeDTO);

    /**
     * Get all the payerTaxes.
     *
     * @return the list of entities
     */
    List<PayerTaxeDTO> findAll();


    /**
     * Get the "id" payerTaxe.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<PayerTaxeDTO> findOne(Long id);

    /**
     * Delete the "id" payerTaxe.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
