package br.mackenzie.backend.repositories;
import org.springframework.data.jpa.repository.JpaRepository;

import br.mackenzie.backend.entities.Filme;

public interface FilmeRepository extends JpaRepository<Filme, String>{
    
}
