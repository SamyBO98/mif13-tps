package fr.univlyon1.mif13.tp1.exception;

public class TokenException extends RuntimeException {

    /**
     * Exception for token.
     */
    public TokenException(){
        super("Token is not valid");
    }

}
