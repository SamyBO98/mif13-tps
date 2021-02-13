package fr.univlyon1.mif13.tp1.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import fr.univlyon1.mif13.tp1.dao.UserDao;
import fr.univlyon1.mif13.tp1.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;

import javax.validation.constraints.NotNull;
import java.util.Optional;

@Controller
public class UserController {

    @Autowired
    private UserDao userDao;

    @GetMapping("/users")
    public String getAllUsers(Model model){
        model.addAttribute("users", userDao.getAll());
        return "users";
    }


    @GetMapping(value = "/users/{login}")
    public String getUser(Model model, @PathVariable("login") @NotNull String login) throws JsonProcessingException {
        //On vérifie si le login n'existe pas
        Optional<User> opUser = userDao.get(login);
        if (opUser.isEmpty()){
            throw new RuntimeException("Utilisateur non existant.");
        }

        model.addAttribute("user", opUser.get().getLogin());
        return "user";

    }

    @PostMapping("/users")
    public ResponseEntity<Void> createUser(@RequestParam("login") @NotNull String login, @RequestParam("password") @NotNull String password) {
        //On vérifie si le login existe déja
        Optional<User> opUser = userDao.get(login);

        if (opUser.isPresent()){
            return ResponseEntity.status(404).build();
        }

        //On crée l'utilisateur
        User user = new User(login, password);
        userDao.save(user);

        return ResponseEntity.status(204).build();
    }

    @PutMapping("/user/login")
    public ResponseEntity<Void> updateUser(@RequestParam("login") @NotNull String login, @RequestParam("password") @NotNull String password) {
        //On vérifie si le login n'existe pas
        Optional<User> opUser = userDao.get(login);
        if (opUser.isEmpty()){
            return ResponseEntity.status(404).build();
        }

        //On modifie l'utilisateur
        User user = opUser.get();
        userDao.update(user, new String[]{login, password});

        return ResponseEntity.status(204).build();
    }

    @DeleteMapping("/user/login")
    public ResponseEntity<Void> deleteUser(@RequestParam("login") @NotNull String login) {
        //On vérifie si le login n'existe pas
        Optional<User> opUser = userDao.get(login);
        if (opUser.isEmpty()){
            return ResponseEntity.status(404).build();
        }

        //On supprime l'utilisateur
        User user = opUser.get();
        userDao.delete(user);

        return ResponseEntity.status(204).build();
    }

}
