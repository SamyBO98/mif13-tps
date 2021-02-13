package fr.univlyon1.mif13.tp1.controller;

import com.auth0.jwt.exceptions.JWTVerificationException;
import fr.univlyon1.mif13.tp1.dao.UserDao;
import fr.univlyon1.mif13.tp1.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

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
     * Procédure de login "simple" d'un utilisateur
     * @param login Le login de l'utilisateur. L'utilisateur doit avoir été créé préalablement et son login doit être présent dans le DAO.
     * @param password Le password à vérifier.
     * @return Une ResponseEntity avec le JWT dans le header "Authentication" si le login s'est bien passé, et le code de statut approprié (204, 401 ou 404).
     */
    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestParam("login") String login, @RequestParam("password") String password, @RequestHeader("Origin") String origin) throws AuthenticationException {
        //On vérifie si l'utilisateur est bien enregistré
        Optional<User> opUser = userDao.get(login);
        if (opUser.isEmpty()){
            return ResponseEntity.status(404).build();
        }

        //On vérifie si l'utilisateur a mit le bon mot de passe
        User user = opUser.get();
        try{
            user.authenticate(password);
        } catch (AuthenticationException e){
            return ResponseEntity.status(404).build();
        }

        //Méthode pour récupérer la requête
        HttpServletRequest request = getRequest();

        //On génère le token JWT et le header correspondant à la réponse
        String jwtToken = generateToken(login, false, request);
        HttpHeaders response = new HttpHeaders();
        response.set("Authentication", jwtToken);

        return ResponseEntity.status(204).headers(response).build();
    }

    /**
     * Réalise la déconnexion
     */
    @DeleteMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader("Authentication") String token){
        //Méthode pour récupérer la requête
        HttpServletRequest request = getRequest();

        try{
            String login = verifyToken(token, request);

            //On vérifie si l'utilisateur est bien enregistré
            Optional<User> opUser = userDao.get(login);
            if (opUser.isEmpty()){
                return ResponseEntity.status(404).build();
            }

            if (opUser.get().isConnected())
                opUser.get().disconnect();
            else return ResponseEntity.status(404).build();

        } catch (NullPointerException | JWTVerificationException e) {
            return ResponseEntity.status(404).build();
        }

        return ResponseEntity.status(204).build();

    }

    /**
     * Méthode destinée au serveur Node pour valider l'authentification d'un utilisateur.
     * @param token Le token JWT qui se trouve dans le header "Authentication" de la requête
     * @param origin L'origine de la requête (pour la comparer avec celle du client, stockée dans le token JWT)
     * @return Une réponse vide avec un code de statut approprié (204, 400, 401).
     */
    @GetMapping("/authenticate")
    public ResponseEntity<Void> authenticate(@RequestParam("token") String token, @RequestParam("origin") String origin) {
        //Méthode pour récupérer la requête
        HttpServletRequest request = getRequest();

        try{
            String login = verifyToken(token, request);

            if (!userDao.get(login).get().isConnected()){
                return ResponseEntity.status(404).build();
            }

        } catch (NullPointerException | JWTVerificationException e) {
            return ResponseEntity.status(404).build();
        }

        return ResponseEntity.status(204).build();
    }


    private HttpServletRequest getRequest(){
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                .getRequest();
    }

}
