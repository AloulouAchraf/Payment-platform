package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.TaxeService;
import com.mycompany.myapp.domain.Taxe;
import com.mycompany.myapp.repository.TaxeRepository;
import com.mycompany.myapp.service.dto.TaxeDTO;
import com.mycompany.myapp.service.mapper.TaxeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing Taxe.
 */
@Service
@Transactional
public class TaxeServiceImpl implements TaxeService {

    private final Logger log = LoggerFactory.getLogger(TaxeServiceImpl.class);

    private final TaxeRepository taxeRepository;

    private final TaxeMapper taxeMapper;

    public TaxeServiceImpl(TaxeRepository taxeRepository, TaxeMapper taxeMapper) {
        this.taxeRepository = taxeRepository;
        this.taxeMapper = taxeMapper;
    }

    /**
     * Save a taxe.
     *
     * @param taxeDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TaxeDTO save(TaxeDTO taxeDTO) {
        log.debug("Request to save Taxe : {}", taxeDTO);
        Taxe taxe = taxeMapper.toEntity(taxeDTO);
        taxe = taxeRepository.save(taxe);
        return taxeMapper.toDto(taxe);
    }

    /**
     * Get all the taxes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TaxeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Taxes");
        return taxeRepository.findAll(pageable)
            .map(taxeMapper::toDto);
    }


    /**
     * Get one taxe by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TaxeDTO> findOne(Long id) {
        log.debug("Request to get Taxe : {}", id);
        return taxeRepository.findById(id)
            .map(taxeMapper::toDto);
    }

    /**
     * Delete the taxe by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Taxe : {}", id);
        taxeRepository.deleteById(id);
    }
}
