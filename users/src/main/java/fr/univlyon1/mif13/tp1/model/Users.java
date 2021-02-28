package fr.univlyon1.mif13.tp1.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Set;

public class Users extends ArrayList<String> {

    public Users(Set<String> users){
        for (String user: users){
            add(user);
        }
    }

}
