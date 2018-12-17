package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Compte;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Compte entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompteRepository extends JpaRepository<Compte, Long> {

    @Query("select compte from Compte compte where compte.user.login = ?#{principal.username}")
    List<Compte> findByUserIsCurrentUser();

}
