package br.mackenzie.backend.entities;

import java.util.Date;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class Avaliacao {
    
    @Id
    private int nota;
    private String comentario;
    private Date dataAvalicao;

    public void editarAvaliacao() {

    }

    public boolean validarNota() {
        return false;
    }
}
