package fr.univlyon1.mif13.tp1.controller;

import fr.univlyon1.mif13.tp1.dao.UserDao;
import fr.univlyon1.mif13.tp1.exception.UserLoginException;
import fr.univlyon1.mif13.tp1.model.User;
import fr.univlyon1.mif13.tp1.model.UserModel;
import fr.univlyon1.mif13.tp1.model.Users;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.constraints.NotNull;
import java.util.*;

@RestController
public class UserRestController {

    @Autowired
    private UserDao userDao;

    /**
     * Return all users.
     * @return list of users.
     */
    @Operation(summary = "Get all users", description = "Get list of users", responses =
            @ApiResponse(responseCode = "200", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Users.class)),
                    @Content(mediaType = "application/xml", schema = @Schema(implementation = Users.class)),
                    @Content(mediaType = "text/html", schema = @Schema(description = "All user's login on a single HTML page"))
            }))
    @GetMapping(value = "/users", produces = { "application/json", "application/xml" })
    @ResponseBody
    public Users getAllUsers() {
        return new Users(userDao.getAll());
    }

    /**
     * Return all users.
     * @return list of users (HTML).
     */
    @GetMapping(value = "/users", produces = "text/html")
    @ResponseBody
    public ModelAndView getAllUsersHTML() {
        ModelAndView mav = new ModelAndView("users");
        mav.addObject("users", userDao.getAll());
        return mav;
    }


    /**
     * Return data from a specific user.
     * @param login User's login.
     * @return User's data.
     */
    @Operation(summary = "Get user", description = "Get data from a specific user", responses = {
            @ApiResponse(responseCode = "200", description = "OK", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = User.class)),
                    @Content(mediaType = "application/xml", schema = @Schema(implementation = User.class)),
                    @Content(mediaType = "text/html", examples = @ExampleObject(value = "User's data on a single HTML page"))
            }),
            @ApiResponse(responseCode = "400", description = "User not exists", content = @Content())
    })
    @GetMapping(value = "/users/{login}", produces = { "application/json", "application/xml" })
    @ResponseBody
    @CrossOrigin(origins = {"http://localhost", "http://192.168.75.118", "https://192.168.75.118"})
    public User getUser(@PathVariable("login") @Schema(example = "otman-le-rigolo") @NotNull String login) {
        //Check if the user exists
        Optional<User> opUser = userDao.get(login);
        if (opUser.isEmpty()){
            throw new UserLoginException(login, false);
        }

        return opUser.get();
    }

    /**
     * Return data from a specific user.
     * @param login User's login.
     * @return User's data.
     */
    @GetMapping(value = "/users/{login}", produces = "text/html")
    @CrossOrigin(origins = {"http://localhost", "http://192.168.75.118", "https://192.168.75.118"})
    public ModelAndView getUserHtml(@PathVariable("login") @Schema(example = "otman-le-rigolo") @NotNull String login) {
        //Check if the user exists
        Optional<User> opUser = userDao.get(login);
        if (opUser.isEmpty()){
            throw new UserLoginException(login, false);
        }

        ModelAndView mav = new ModelAndView("user");
        mav.addObject("user", opUser.get().getLogin());
        return mav;
    }



    /**
     * Create new user.
     * @param user User.
     * @return Response: success (201) / fail (409).
     */
    @Operation(summary = "Create new user", description = "Create a new user on the API", responses = {
            @ApiResponse(responseCode = "201", description = "OK"),
            @ApiResponse(responseCode = "404", description = "User already exists")
    })
    @PostMapping(value = "/users", consumes = "application/json")
    public ResponseEntity<Void> createUser(@RequestBody UserModel user) {
        //Check if the user didn't exists
        Optional<User> opUser = userDao.get(user.getLogin());
        if (opUser.isPresent()){
            throw new UserLoginException(user.getLogin(), true);
        }

        //Create the user
        userDao.save(new User(user.getLogin(), user.getPassword()));

        return ResponseEntity.status(201).build();
    }

    @PostMapping(value ="/users", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<Void> createUser(@RequestParam("login") @Schema(example = "invite") @NotNull String login,
                                           @RequestParam("password") @Schema(example = "original-password") @NotNull String password) {
        //On vérifie si le login existe déja
        Optional<User> opUser = userDao.get(login);

        if (opUser.isPresent()){
            throw new UserLoginException(login, true);
        }

        //On crée l'utilisateur
        User user = new User(login, password);
        userDao.save(user);

        return ResponseEntity.status(201).build();
    }

    /**
     * Update user.
     * @param oldLogin the current user's login.
     * @param user params for the new user.
     * @return Response: success (204) / fail (404).
     */
    @Operation(summary = "Update user", description = "Update the login of an existing user", responses = {
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "404", description = "User not exists"),
            @ApiResponse(responseCode = "409", description = "New User's login already exists")
    })
    @PutMapping(value = "/users/{login}", consumes = "application/json")
    public ResponseEntity<Void> updateUser(@PathVariable("login") @Schema(example = "otman-le-rigolo") @NotNull String oldLogin,
                                           @RequestBody UserModel user) {
        //Check if the user exists
        Optional<User> opUser = userDao.get(oldLogin);
        if (opUser.isEmpty()){
            throw new UserLoginException(oldLogin, false);
        }

        //Check if the new login already exists
        if (!oldLogin.equals(user.getLogin())){
            if (userDao.get(user.getLogin()).isPresent()){
                throw new UserLoginException(user.getLogin(), true);
            }
        }

        userDao.update(opUser.get(), new String[]{ user.getLogin(), user.getPassword() });

        return ResponseEntity.status(200).build();
    }

    /**
     * Delete user.
     * @param login the user's login.
     * @return Response: success (204) / fail (404).
     */
    @Operation(summary = "Delete user", description = "Delete an existing user", responses = {
            @ApiResponse(responseCode = "204", description = "OK"),
            @ApiResponse(responseCode = "404", description = "User not exists")
    })
    @DeleteMapping(value = "/users/{login}")
    public ResponseEntity<Void> deleteUser(@PathVariable("login") @Schema(example = "otman-le-rigolo") @NotNull String login) {
        //Check if the user exists
        Optional<User> opUser = userDao.get(login);
        if (opUser.isEmpty()){
            throw new UserLoginException(login, false);
        }

        //Delete the user
        userDao.delete(opUser.get());

        return ResponseEntity.status(204).build();
    }

}
