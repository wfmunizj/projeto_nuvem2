package br.mackenzie.backend.entities;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    public float calcularMedia() {
        return 0;
    }

    public void adicionarAvaliacao(Avaliacao avaliacao) {

    }

    public String getInformacoesFilme() {

        return "Titulo: " + titulo + "\n" +
                "Ano: " + ano + "\n" +
                "Duração: " + duracao + " minutos\n" +
                "Sinopse: " + sinopse + "\n" +
                "Nota Média: " + notaMedia + "\n" +
                "Gênero: " + genero;
    }
}