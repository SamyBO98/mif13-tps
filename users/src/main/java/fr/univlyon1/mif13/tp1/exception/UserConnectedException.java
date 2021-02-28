package fr.univlyon1.mif13.tp1.exception;

public class UserConnectedException extends RuntimeException {

    /**
     * Exception for connection.
     * @param login User's login.
     * @param connected Boolean: already connected or not connected?
     */
    public UserConnectedException(String login, boolean connected){
        super(String.format("User %s is " + (connected? "already connected": "not connected"), login));
    }

}
