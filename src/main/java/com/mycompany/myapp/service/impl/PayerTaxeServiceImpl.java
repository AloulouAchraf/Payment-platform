package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.PayerTaxeService;
import com.mycompany.myapp.domain.PayerTaxe;
import com.mycompany.myapp.repository.PayerTaxeRepository;
import com.mycompany.myapp.service.dto.PayerTaxeDTO;
import com.mycompany.myapp.service.mapper.PayerTaxeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing PayerTaxe.
 */
@Service
@Transactional
public class PayerTaxeServiceImpl implements PayerTaxeService {

    private final Logger log = LoggerFactory.getLogger(PayerTaxeServiceImpl.class);

    private final PayerTaxeRepository payerTaxeRepository;

    private final PayerTaxeMapper payerTaxeMapper;

    public PayerTaxeServiceImpl(PayerTaxeRepository payerTaxeRepository, PayerTaxeMapper payerTaxeMapper) {
        this.payerTaxeRepository = payerTaxeRepository;
        this.payerTaxeMapper = payerTaxeMapper;
    }

    /**
     * Save a payerTaxe.
     *
     * @param payerTaxeDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PayerTaxeDTO save(PayerTaxeDTO payerTaxeDTO) {
        log.debug("Request to save PayerTaxe : {}", payerTaxeDTO);
        PayerTaxe payerTaxe = payerTaxeMapper.toEntity(payerTaxeDTO);
        payerTaxe = payerTaxeRepository.save(payerTaxe);
        return payerTaxeMapper.toDto(payerTaxe);
    }

    /**
     * Get all the payerTaxes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PayerTaxeDTO> findAll() {
        log.debug("Request to get all PayerTaxes");
        return payerTaxeRepository.findAll().stream()
            .map(payerTaxeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one payerTaxe by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PayerTaxeDTO> findOne(Long id) {
        log.debug("Request to get PayerTaxe : {}", id);
        return payerTaxeRepository.findById(id)
            .map(payerTaxeMapper::toDto);
    }

    /**
     * Delete the payerTaxe by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PayerTaxe : {}", id);
        payerTaxeRepository.deleteById(id);
    }
}
