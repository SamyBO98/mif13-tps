package fr.univlyon1.mif13.tp1.controller;

import fr.univlyon1.mif13.tp1.dao.UserDao;
import fr.univlyon1.mif13.tp1.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
public class UserRestController {

    @Autowired
    private UserDao userDao;

    @GetMapping("/users")
    public Set<String> getAllUsers(){
        return userDao.getAll();
    }


}
