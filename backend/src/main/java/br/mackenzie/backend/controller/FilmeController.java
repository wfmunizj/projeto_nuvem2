package br.mackenzie.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.mackenzie.backend.entities.Filme;
import br.mackenzie.backend.repositories.FilmeRepository;

@RestController
@RequestMapping("/filmes")
@CrossOrigin(origins = "*", maxAge = 3600)

public class FilmeController {

    private final FilmeRepository filmeRepository;

    public FilmeController(FilmeRepository filmeRepository) {
        this.filmeRepository = filmeRepository;
    }

    @GetMapping
    public Iterable<Filme> listarTodos() {
        return filmeRepository.findAll();
    }

    @GetMapping("/{titulo}")
    public ResponseEntity<Filme> buscar(@PathVariable String titulo) {
        return filmeRepository.findById(titulo).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Filme> criar(@RequestBody Filme filme) {
        return ResponseEntity.status(HttpStatus.CREATED).body(filmeRepository.save(filme));
    }

    @PutMapping("/{titulo}")
    public ResponseEntity<Filme> atualizar(@PathVariable String titulo, @RequestBody Filme filme) {
        if (!filmeRepository.existsById(titulo)) {
            return ResponseEntity.notFound().build();
        }
        filme.setTitulo(titulo);
        return ResponseEntity.ok(filmeRepository.save(filme));
    }

    @DeleteMapping("/{titulo}")
    public ResponseEntity<Void> deletarPeloTitulo(@PathVariable String titulo) {
        if (!filmeRepository.existsById(titulo)) {
            return ResponseEntity.notFound().build();
        }
        filmeRepository.deleteById(titulo);
        return ResponseEntity.noContent().build();
    }
}
