package fr.univlyon1.mif13.tp1.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import fr.univlyon1.mif13.tp1.dao.UserDao;
import fr.univlyon1.mif13.tp1.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.constraints.NotNull;
import java.util.Optional;
import java.util.Set;

@RestController
public class UserRestController {

    @Autowired
    private UserDao userDao;

    @GetMapping(value = "/users", produces = { "application/json", "application/xml" })
    @ResponseBody
    public Set<String> getAllUsers() {
        return userDao.getAll();
    }

    @GetMapping(value = "/users/{login}", produces = { "application/json", "application/xml" })
    @ResponseBody
    public User getUser(@PathVariable("login") @NotNull String login) {
        //On vérifie si le login n'existe pas
        Optional<User> opUser = userDao.get(login);
        if (opUser.isEmpty()){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "The user did not exists."
            );
        }

        return opUser.get();

    }

    @PostMapping(value = "/users", consumes = "application/json")
    public ResponseEntity<Void> createUser(@RequestBody User user) {
        //On vérifie si le login existe déja
        Optional<User> opUser = userDao.get(user.getLogin());

        if (opUser.isPresent()){
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "The user already exists."
            );
        }

        //On crée l'utilisateur
        userDao.save(user);

        return ResponseEntity.status(204).build();
    }

    @PutMapping(value = "/users/login", consumes = "application/json")
    public ResponseEntity<Void> updateUser(@RequestBody User newUser) {
        //On vérifie si le login n'existe pas
        Optional<User> opUser = userDao.get(newUser.getLogin());
        if (opUser.isEmpty()){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "The user did not exists."
            );
        }

        //On modifie l'utilisateur
        userDao.save(newUser);

        return ResponseEntity.status(204).build();
    }

    @DeleteMapping(value = "/users/login", consumes = "application/json")
    public ResponseEntity<Void> deleteUser(@RequestBody User user) {
        //On vérifie si le login n'existe pas
        Optional<User> opUser = userDao.get(user.getLogin());
        if (opUser.isEmpty()){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "The user did not exists."
            );
        }

        //On supprime l'utilisateur
        userDao.delete(user);

        return ResponseEntity.status(204).build();
    }

}
