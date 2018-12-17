package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Taxe;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Taxe entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaxeRepository extends JpaRepository<Taxe, Long> {

    @Query("select taxe from Taxe taxe where taxe.user.login = ?#{principal.username}")
    List<Taxe> findByUserIsCurrentUser();

}
