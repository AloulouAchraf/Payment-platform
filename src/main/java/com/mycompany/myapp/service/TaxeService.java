package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.TaxeDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Taxe.
 */
public interface TaxeService {

    /**
     * Save a taxe.
     *
     * @param taxeDTO the entity to save
     * @return the persisted entity
     */
    TaxeDTO save(TaxeDTO taxeDTO);

    /**
     * Get all the taxes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<TaxeDTO> findAll(Pageable pageable);


    /**
     * Get the "id" taxe.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TaxeDTO> findOne(Long id);

    /**
     * Delete the "id" taxe.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
