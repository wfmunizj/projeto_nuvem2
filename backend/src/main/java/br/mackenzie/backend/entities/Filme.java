package br.mackenzie.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Filme {

    @Id
    private String titulo;
    private int ano;
    private int duracao;
    private String sinopse;
    private float notaMedia;
    private String genero;

}