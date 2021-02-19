package fr.univlyon1.mif13.tp1.controller;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(OperationController.class)
public class OperationControllerTest {

    @Autowired
    private MockMvc mock;

    /**
     * Connect an existing user.
     * @throws Exception Exception.
     * @return Token generated.
     */
    @Test
    public String goodLogin() throws Exception {
        String url = "/login";

        //Launch request (good login)
        MvcResult goodResult = mock.perform(MockMvcRequestBuilders
                .post(url)
                .param("login", "otman-le-rigolo")
                .param("password", "password")
                .header("Origin", "*/*"))
                .andExpect(status().is(204))
                .andReturn();

        //Asserts
        String goodAuthorization = goodResult.getResponse().getHeader("Authorization");
        assert(goodAuthorization != null && !goodAuthorization.equals(""));
        return goodAuthorization;
    }

    /**
     * Connect an user (should not work because the user don't exists).
     * @throws Exception Exception.
     * @return Token generated.
     */
    @Test
    public String badLogin() throws Exception {
        String url = "/login";

        //Launch request (bad login)
        MvcResult badResult = mock.perform(MockMvcRequestBuilders
                .post(url)
                .param("login", "non existing user")
                .param("password", "password")
                .header("Origin", "*/*"))
                .andExpect(status().is(404))
                .andReturn();

        //Asserts
        String badAuthorization = badResult.getResponse().getHeader("Authorization");
        assert(badAuthorization == null);
        return null;
    }

    /**
     * Connect an user (should not work because a forget).
     * @throws Exception Exception.
     * @return Token generated.
     */
    @Test
    @Order(1)
    public String forgetLogin() throws Exception {
        String url = "/login";

        //Launch request (bad login)
        MvcResult badResult = mock.perform(MockMvcRequestBuilders
                .post(url)
                .param("password", "password")
                .header("Origin", "*/*"))
                .andExpect(status().is(400))
                .andReturn();

        //Asserts
        String badAuthorization = badResult.getResponse().getHeader("Authorization");
        assert(badAuthorization == null);
        return null;
    }

    /**
     * Authenticate an existing user (and testing logins functions).
     * @throws Exception Exception.
     */
    @Test
    @Order(2)
    public void authenticate() throws Exception {
        String url = "/authenticate";

        //Launch request (good one)
        mock.perform(MockMvcRequestBuilders
                .get(url)
                .param("token", goodLogin())
                .param("origin", "*/*"))
                .andExpect(status().is(204));

        //Launch request (forget parameter)
        mock.perform(MockMvcRequestBuilders
                .get(url)
                .param("token", goodLogin()))
                .andExpect(status().is(400));
    }

    /**
     * Disconnect an existing user (using "login()" function).
     * @throws Exception Exception.
     */
    @Test
    @Order(3)
    public void logout() throws Exception {
        String url = "/logout";

        //Launch request (good one)
        mock.perform(MockMvcRequestBuilders
                .delete(url)
                .header("Authorization", goodLogin()))
                .andExpect(status().is(204));

        //Launch request (forget parameter)
        mock.perform(MockMvcRequestBuilders
                .delete(url))
                .andExpect(status().is(400));
    }

}
