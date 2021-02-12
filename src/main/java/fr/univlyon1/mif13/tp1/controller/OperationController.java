package fr.univlyon1.mif13.tp1.controller;

import fr.univlyon1.mif13.tp1.dao.UserDao;
import fr.univlyon1.mif13.tp1.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;

import java.util.Optional;

import static fr.univlyon1.mif13.tp1.utils.JwtTokenUtils.generateToken;

@Controller
public class OperationController {

    // TODO récupérer le DAO...
    @Autowired
    private UserDao userDao;

    /**
     * Procédure de login "simple" d'un utilisateur
     * @param login Le login de l'utilisateur. L'utilisateur doit avoir été créé préalablement et son login doit être présent dans le DAO.
     * @param password Le password à vérifier.
     * @return Une ResponseEntity avec le JWT dans le header "Authentication" si le login s'est bien passé, et le code de statut approprié (204, 401 ou 404).
     */
    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestParam("login") String login, @RequestParam("password") String password, @RequestHeader("Origin") String origin) throws AuthenticationException {
        //On vérifie si l'utilisateur est bien enregistré

        System.out.println("IL EST DEDANS");

        Optional<User> opUser = userDao.get(login);
        if (opUser.isEmpty()){
            return ResponseEntity.status(401).build();
        }

        User user = opUser.get();
        try{
            user.authenticate(password);
        } catch (AuthenticationException e){
            return ResponseEntity.status(401).build();
        }

        //On génère le token JWT et le header correspondant à la réponse
        String jwtToken = generateToken(login, false, origin);
        HttpHeaders response = new HttpHeaders();
        response.set("Authentication", jwtToken);

        return ResponseEntity.status(204).headers(response).build();
    }

    /**
     * Réalise la déconnexion
     */
    //@DeleteMapping("/logout")
    // TODO

    /**
     * Méthode destinée au serveur Node pour valider l'authentification d'un utilisateur.
     * @param token Le token JWT qui se trouve dans le header "Authentication" de la requête
     * @param origin L'origine de la requête (pour la comparer avec celle du client, stockée dans le token JWT)
     * @return Une réponse vide avec un code de statut approprié (204, 400, 401).
     */
    @GetMapping("/authenticate")
    public ResponseEntity<Void> authenticate(@RequestParam("token") String token, @RequestParam("origin") String origin) {
        return null;
    }

}
