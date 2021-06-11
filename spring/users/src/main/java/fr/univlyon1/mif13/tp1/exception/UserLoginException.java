package fr.univlyon1.mif13.tp1.exception;

public class UserLoginException extends RuntimeException {

    /**
     * Exception: user didn't exists or exists.
     * @param login User's login.
     */
    public UserLoginException(String login, boolean exists){
        super(String.format("User %s " + (exists? "already exists": "not found"), login));
    }

}
