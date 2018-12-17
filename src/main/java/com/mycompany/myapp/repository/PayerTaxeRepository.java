package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.PayerTaxe;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PayerTaxe entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PayerTaxeRepository extends JpaRepository<PayerTaxe, Long> {

}
