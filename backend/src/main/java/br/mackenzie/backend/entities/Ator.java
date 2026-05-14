package br.mackenzie.backend.entities;

import java.util.Date;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Ator {
    
    @Id
    private String nome;
    private String nacionalidade;
    private Date dataNascimento;
    
}
