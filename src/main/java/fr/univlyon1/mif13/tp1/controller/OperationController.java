package fr.univlyon1.mif13.tp1.controller;

import com.auth0.jwt.exceptions.JWTVerificationException;
import fr.univlyon1.mif13.tp1.dao.UserDao;
import fr.univlyon1.mif13.tp1.model.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.server.ResponseStatusException;

import javax.naming.AuthenticationException;
import javax.servlet.http.HttpServletRequest;

import java.util.Optional;

import static fr.univlyon1.mif13.tp1.utils.JwtTokenUtils.generateToken;
import static fr.univlyon1.mif13.tp1.utils.JwtTokenUtils.verifyToken;

@Controller
public class OperationController {

    //DAO
    @Autowired
    private UserDao userDao;

    /**
     * Connect user.
     * @param login User's login.
     * @param password User's password.
     * @param origin The origin.
     * @return Response: success (204) / fail (404).
     */
    @Operation(summary = "Connect user", description = "Connect an existing user", responses = {
            @ApiResponse(responseCode = "204", description = "OK"),
            @ApiResponse(responseCode = "404", description = "Wrong login or password")
    })
    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestParam("login") @Schema(example = "otman-le-rigolo") String login, @RequestParam("password") @Schema(example = "password") String password, @RequestHeader("Origin") String origin) {
        //Check if the user exists
        Optional<User> opUser = userDao.get(login);
        if (opUser.isEmpty()){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "The user did not exists"
            );
        }

        //Authenticate the user using login and password
        User user = opUser.get();
        try{
            user.authenticate(password);
        } catch (AuthenticationException e){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Wrong password"
            );
        }

        //Get the request servlet
        HttpServletRequest request = getRequest();

        //Generate JWT token and put it on Header ("Authentication")
        String jwtToken = generateToken(login, false, request);
        HttpHeaders response = new HttpHeaders();
        response.set("Authentication", jwtToken);

        return ResponseEntity.status(204).headers(response).build();
    }


    @Operation(summary = "Disconnect user", description = "Disconnect an existing user", responses = {
            @ApiResponse(responseCode = "204", description = "OK"),
            @ApiResponse(responseCode = "404", description = "Error: User not exists / Token is wrong / User is not connected")
    })
    @DeleteMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader("Authentication") String token){
        //Get the request servlet
        HttpServletRequest request = getRequest();

        try{
            String login = verifyToken(token, request);

            //Check if the user exists
            Optional<User> opUser = userDao.get(login);
            if (opUser.isEmpty()){
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "The user did not exists"
                );
            }

            //Disconnect the user
            if (opUser.get().isConnected())
                opUser.get().disconnect();
            else throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "The user is not connected"
            );

        } catch (NullPointerException | JWTVerificationException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "The token is not correct"
            );
        }

        return ResponseEntity.status(204).build();
    }


    @Operation(summary = "Authenticate user", description = "AUthenticate an existing user", responses = {
            @ApiResponse(responseCode = "204", description = "OK"),
            @ApiResponse(responseCode = "404", description = "Error: Token is wrong / User is not connected")
    })
    @GetMapping("/authenticate")
    public ResponseEntity<Void> authenticate(@RequestParam("token") @Schema(example = "edit-this-token") String token, @RequestParam("origin") @Schema(example = "*/*") String origin) {
        //Get the request servlet
        HttpServletRequest request = getRequest();

        try{
            //Get the user by using JWT token and disconnect him
            String login = verifyToken(token, request);

            if (!userDao.get(login).get().isConnected()){
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "The user is not connected"
                );
            }

        } catch (NullPointerException | JWTVerificationException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "The token is not correct"
            );
        }

        return ResponseEntity.status(204).build();
    }


    private HttpServletRequest getRequest(){
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                .getRequest();
    }

}
