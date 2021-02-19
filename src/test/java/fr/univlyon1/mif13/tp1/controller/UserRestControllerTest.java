package fr.univlyon1.mif13.tp1.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(OperationController.class)
public class UserRestControllerTest {

    @Autowired
    private MockMvc mock;

    @Test
    public void getAllUsers(){

    }

}
