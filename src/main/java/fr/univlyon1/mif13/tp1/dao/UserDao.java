package fr.univlyon1.mif13.tp1.dao;

import fr.univlyon1.mif13.tp1.model.User;

import java.util.*;

public class UserDao implements Dao<User> {

    private Map<String, User> users = new HashMap<>();

    public UserDao(){
        users.put("otman-le-rigolo", new User("otman-le-rigolo", "password"));
        users.put("samy-le-pas-drole", new User("samy-le-pas-drole", "the-password-78"));
    }

    @Override
    public Optional<User> get(String id) {
        return Optional.ofNullable(users.get(id));
    }

    @Override
    public Set<String> getAll() {
        return users.keySet();
    }

    @Override
    public void save(User user) {
        users.put(user.getLogin(), user);
    }

    @Override
    public void update(User user, String[] params) {
        user.setLogin(Objects.requireNonNull(
                params[0], "Login cannot be null"
        ));
        user.setPassword(Objects.requireNonNull(
                params[1], "Password cannot be null"
        ));

        users.put(user.getLogin(), user);
    }

    @Override
    public void delete(User user) {
        users.remove(user.getLogin());
    }
}
