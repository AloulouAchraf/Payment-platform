package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.service.PayerTaxeService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.service.dto.PayerTaxeDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing PayerTaxe.
 */
@RestController
@RequestMapping("/api")
public class PayerTaxeResource {

    private final Logger log = LoggerFactory.getLogger(PayerTaxeResource.class);

    private static final String ENTITY_NAME = "payerTaxe";

    private final PayerTaxeService payerTaxeService;

    public PayerTaxeResource(PayerTaxeService payerTaxeService) {
        this.payerTaxeService = payerTaxeService;
    }

    /**
     * POST  /payer-taxes : Create a new payerTaxe.
     *
     * @param payerTaxeDTO the payerTaxeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new payerTaxeDTO, or with status 400 (Bad Request) if the payerTaxe has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/payer-taxes")
    @Timed
    public ResponseEntity<PayerTaxeDTO> createPayerTaxe(@RequestBody PayerTaxeDTO payerTaxeDTO) throws URISyntaxException {
        log.debug("REST request to save PayerTaxe : {}", payerTaxeDTO);
        if (payerTaxeDTO.getId() != null) {
            throw new BadRequestAlertException("A new payerTaxe cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PayerTaxeDTO result = payerTaxeService.save(payerTaxeDTO);
        return ResponseEntity.created(new URI("/api/payer-taxes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /payer-taxes : Updates an existing payerTaxe.
     *
     * @param payerTaxeDTO the payerTaxeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated payerTaxeDTO,
     * or with status 400 (Bad Request) if the payerTaxeDTO is not valid,
     * or with status 500 (Internal Server Error) if the payerTaxeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/payer-taxes")
    @Timed
    public ResponseEntity<PayerTaxeDTO> updatePayerTaxe(@RequestBody PayerTaxeDTO payerTaxeDTO) throws URISyntaxException {
        log.debug("REST request to update PayerTaxe : {}", payerTaxeDTO);
        if (payerTaxeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PayerTaxeDTO result = payerTaxeService.save(payerTaxeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, payerTaxeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /payer-taxes : get all the payerTaxes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of payerTaxes in body
     */
    @GetMapping("/payer-taxes")
    @Timed
    public List<PayerTaxeDTO> getAllPayerTaxes() {
        log.debug("REST request to get all PayerTaxes");
        return payerTaxeService.findAll();
    }

    /**
     * GET  /payer-taxes/:id : get the "id" payerTaxe.
     *
     * @param id the id of the payerTaxeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the payerTaxeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/payer-taxes/{id}")
    @Timed
    public ResponseEntity<PayerTaxeDTO> getPayerTaxe(@PathVariable Long id) {
        log.debug("REST request to get PayerTaxe : {}", id);
        Optional<PayerTaxeDTO> payerTaxeDTO = payerTaxeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(payerTaxeDTO);
    }

    /**
     * DELETE  /payer-taxes/:id : delete the "id" payerTaxe.
     *
     * @param id the id of the payerTaxeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/payer-taxes/{id}")
    @Timed
    public ResponseEntity<Void> deletePayerTaxe(@PathVariable Long id) {
        log.debug("REST request to delete PayerTaxe : {}", id);
        payerTaxeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
