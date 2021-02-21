package fr.univlyon1.mif13.tp1.exception;

public class UserPasswordException extends RuntimeException {

    /**
     * Exception for wrong password.
     */
    public UserPasswordException(){
        super("Wrong password");
    }

}
