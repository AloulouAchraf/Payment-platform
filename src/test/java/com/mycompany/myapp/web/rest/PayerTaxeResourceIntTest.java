package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.BlockchainApp;

import com.mycompany.myapp.domain.PayerTaxe;
import com.mycompany.myapp.repository.PayerTaxeRepository;
import com.mycompany.myapp.service.PayerTaxeService;
import com.mycompany.myapp.service.dto.PayerTaxeDTO;
import com.mycompany.myapp.service.mapper.PayerTaxeMapper;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PayerTaxeResource REST controller.
 *
 * @see PayerTaxeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BlockchainApp.class)
public class PayerTaxeResourceIntTest {

    @Autowired
    private PayerTaxeRepository payerTaxeRepository;


    @Autowired
    private PayerTaxeMapper payerTaxeMapper;
    

    @Autowired
    private PayerTaxeService payerTaxeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPayerTaxeMockMvc;

    private PayerTaxe payerTaxe;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PayerTaxeResource payerTaxeResource = new PayerTaxeResource(payerTaxeService);
        this.restPayerTaxeMockMvc = MockMvcBuilders.standaloneSetup(payerTaxeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PayerTaxe createEntity(EntityManager em) {
        PayerTaxe payerTaxe = new PayerTaxe();
        return payerTaxe;
    }

    @Before
    public void initTest() {
        payerTaxe = createEntity(em);
    }

    @Test
    @Transactional
    public void createPayerTaxe() throws Exception {
        int databaseSizeBeforeCreate = payerTaxeRepository.findAll().size();

        // Create the PayerTaxe
        PayerTaxeDTO payerTaxeDTO = payerTaxeMapper.toDto(payerTaxe);
        restPayerTaxeMockMvc.perform(post("/api/payer-taxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(payerTaxeDTO)))
            .andExpect(status().isCreated());

        // Validate the PayerTaxe in the database
        List<PayerTaxe> payerTaxeList = payerTaxeRepository.findAll();
        assertThat(payerTaxeList).hasSize(databaseSizeBeforeCreate + 1);
        PayerTaxe testPayerTaxe = payerTaxeList.get(payerTaxeList.size() - 1);
    }

    @Test
    @Transactional
    public void createPayerTaxeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = payerTaxeRepository.findAll().size();

        // Create the PayerTaxe with an existing ID
        payerTaxe.setId(1L);
        PayerTaxeDTO payerTaxeDTO = payerTaxeMapper.toDto(payerTaxe);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPayerTaxeMockMvc.perform(post("/api/payer-taxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(payerTaxeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PayerTaxe in the database
        List<PayerTaxe> payerTaxeList = payerTaxeRepository.findAll();
        assertThat(payerTaxeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPayerTaxes() throws Exception {
        // Initialize the database
        payerTaxeRepository.saveAndFlush(payerTaxe);

        // Get all the payerTaxeList
        restPayerTaxeMockMvc.perform(get("/api/payer-taxes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(payerTaxe.getId().intValue())));
    }
    

    @Test
    @Transactional
    public void getPayerTaxe() throws Exception {
        // Initialize the database
        payerTaxeRepository.saveAndFlush(payerTaxe);

        // Get the payerTaxe
        restPayerTaxeMockMvc.perform(get("/api/payer-taxes/{id}", payerTaxe.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(payerTaxe.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingPayerTaxe() throws Exception {
        // Get the payerTaxe
        restPayerTaxeMockMvc.perform(get("/api/payer-taxes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePayerTaxe() throws Exception {
        // Initialize the database
        payerTaxeRepository.saveAndFlush(payerTaxe);

        int databaseSizeBeforeUpdate = payerTaxeRepository.findAll().size();

        // Update the payerTaxe
        PayerTaxe updatedPayerTaxe = payerTaxeRepository.findById(payerTaxe.getId()).get();
        // Disconnect from session so that the updates on updatedPayerTaxe are not directly saved in db
        em.detach(updatedPayerTaxe);
        PayerTaxeDTO payerTaxeDTO = payerTaxeMapper.toDto(updatedPayerTaxe);

        restPayerTaxeMockMvc.perform(put("/api/payer-taxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(payerTaxeDTO)))
            .andExpect(status().isOk());

        // Validate the PayerTaxe in the database
        List<PayerTaxe> payerTaxeList = payerTaxeRepository.findAll();
        assertThat(payerTaxeList).hasSize(databaseSizeBeforeUpdate);
        PayerTaxe testPayerTaxe = payerTaxeList.get(payerTaxeList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingPayerTaxe() throws Exception {
        int databaseSizeBeforeUpdate = payerTaxeRepository.findAll().size();

        // Create the PayerTaxe
        PayerTaxeDTO payerTaxeDTO = payerTaxeMapper.toDto(payerTaxe);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPayerTaxeMockMvc.perform(put("/api/payer-taxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(payerTaxeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PayerTaxe in the database
        List<PayerTaxe> payerTaxeList = payerTaxeRepository.findAll();
        assertThat(payerTaxeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePayerTaxe() throws Exception {
        // Initialize the database
        payerTaxeRepository.saveAndFlush(payerTaxe);

        int databaseSizeBeforeDelete = payerTaxeRepository.findAll().size();

        // Get the payerTaxe
        restPayerTaxeMockMvc.perform(delete("/api/payer-taxes/{id}", payerTaxe.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PayerTaxe> payerTaxeList = payerTaxeRepository.findAll();
        assertThat(payerTaxeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PayerTaxe.class);
        PayerTaxe payerTaxe1 = new PayerTaxe();
        payerTaxe1.setId(1L);
        PayerTaxe payerTaxe2 = new PayerTaxe();
        payerTaxe2.setId(payerTaxe1.getId());
        assertThat(payerTaxe1).isEqualTo(payerTaxe2);
        payerTaxe2.setId(2L);
        assertThat(payerTaxe1).isNotEqualTo(payerTaxe2);
        payerTaxe1.setId(null);
        assertThat(payerTaxe1).isNotEqualTo(payerTaxe2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PayerTaxeDTO.class);
        PayerTaxeDTO payerTaxeDTO1 = new PayerTaxeDTO();
        payerTaxeDTO1.setId(1L);
        PayerTaxeDTO payerTaxeDTO2 = new PayerTaxeDTO();
        assertThat(payerTaxeDTO1).isNotEqualTo(payerTaxeDTO2);
        payerTaxeDTO2.setId(payerTaxeDTO1.getId());
        assertThat(payerTaxeDTO1).isEqualTo(payerTaxeDTO2);
        payerTaxeDTO2.setId(2L);
        assertThat(payerTaxeDTO1).isNotEqualTo(payerTaxeDTO2);
        payerTaxeDTO1.setId(null);
        assertThat(payerTaxeDTO1).isNotEqualTo(payerTaxeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(payerTaxeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(payerTaxeMapper.fromId(null)).isNull();
    }
}
