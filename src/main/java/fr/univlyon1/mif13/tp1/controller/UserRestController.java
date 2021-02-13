package fr.univlyon1.mif13.tp1.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import fr.univlyon1.mif13.tp1.dao.UserDao;
import fr.univlyon1.mif13.tp1.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.Optional;
import java.util.Set;

@RestController
public class UserRestController {

    @Autowired
    private UserDao userDao;

    @GetMapping(value = "/users", produces = { "application/json", "application/xml" })
    @ResponseBody
    public Set<String> getAllUsers(@RequestHeader("Accept") String acceptType) throws JsonProcessingException {
        return userDao.getAll();
    }

    @GetMapping(value = "/users/{login}", produces = { "application/json", "application/xml" })
    @ResponseBody
    public User getUser(@PathVariable("login") @NotNull String login, @RequestHeader("Accept") String acceptType) throws JsonProcessingException {
        //On vérifie si le login n'existe pas
        Optional<User> opUser = userDao.get(login);
        if (opUser.isEmpty()){
            return null;
        }

        return opUser.get();

    }

    @PostMapping(value = "/users", consumes = "application/json")
    public ResponseEntity<Void> createUser(@RequestBody User user) {
        //On vérifie si le login existe déja
        Optional<User> opUser = userDao.get(user.getLogin());

        if (opUser.isPresent()){
            return ResponseEntity.status(404).build();
        }

        //On crée l'utilisateur
        userDao.save(user);

        return ResponseEntity.status(204).build();
    }

    @PutMapping(value = "/user/login", consumes = "application/json")
    public ResponseEntity<Void> updateUser(@RequestBody User user) {
        //On vérifie si le login n'existe pas
        Optional<User> opUser = userDao.get(user.getLogin());
        if (opUser.isEmpty()){
            return ResponseEntity.status(404).build();
        }

        //On modifie l'utilisateur
        userDao.update(user, new String[]{user.getLogin(), user.getPassword()});

        return ResponseEntity.status(204).build();
    }

    @DeleteMapping(value = "/user/login", consumes = "application/json")
    public ResponseEntity<Void> deleteUser(@RequestBody User user) {
        //On vérifie si le login n'existe pas
        Optional<User> opUser = userDao.get(user.getLogin());
        if (opUser.isEmpty()){
            return ResponseEntity.status(404).build();
        }

        //On supprime l'utilisateur
        userDao.delete(user);

        return ResponseEntity.status(204).build();
    }

}
