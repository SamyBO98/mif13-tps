package fr.univlyon1.mif13.tp1;

import fr.univlyon1.mif13.tp1.dao.Dao;
import fr.univlyon1.mif13.tp1.model.User;

import java.util.*;

public class UserDao implements Dao<User> {

    private List<User> users = new ArrayList<>();

    public UserDao(){
        users.add(new User("otman-le-rigolo", "password"));
        users.add(new User("samy-le-pas-drole", "the-password-78"));
    }

    @Override
    public Optional<User> get(String id) {
        return Optional.empty();
    }

    @Override
    public Set<String> getAll() {
        Set<String> res = new HashSet<>();
        for (User user: users){
            res.add(user.getLogin());
        }
        return res;
    }

    @Override
    public void save(User user) {
        users.add(user);
    }

    @Override
    public void update(User user, String[] params) {
        user.setLogin(Objects.requireNonNull(
                params[0], "Login cannot be null"
        ));
        user.setPassword(Objects.requireNonNull(
                params[1], "Password cannot be null"
        ));

        users.add(user);
    }

    @Override
    public void delete(User user) {
        users.remove(user);
    }
}
