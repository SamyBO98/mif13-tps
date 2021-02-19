package fr.univlyon1.mif13.tp1.controller;

import fr.univlyon1.mif13.tp1.model.User;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Objects;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserRestController.class)
public class UserRestControllerTest {

    @Autowired
    private MockMvc mock;

    /**
     * Get all users registered.
     * @throws Exception Exception.
     */
    @Test
    @Order(1)
    public void getAllUsers() throws Exception {
        String url = "/users";

        //Launch request (HTML)
        MvcResult resultHtml = mock.perform(MockMvcRequestBuilders
                .get(url)
                .header("Accept", "text/html"))
                .andExpect(status().is(200))
                .andReturn();

        //Launch request (JSON)
        MvcResult resultJson = mock.perform(MockMvcRequestBuilders
                .get(url)
                .header("Accept", "application/json"))
                .andExpect(status().is(200))
                .andReturn();

        //Launch request (XML)
        MvcResult resultXml = mock.perform(MockMvcRequestBuilders
                .get(url)
                .header("Accept", "application/xml"))
                .andExpect(status().is(200))
                .andReturn();

        //Launch request (Default)
        MvcResult resultDefault = mock.perform(MockMvcRequestBuilders
                .get(url))
                .andExpect(status().is(200))
                .andReturn();

        //Asserts
        assert(Objects.requireNonNull(resultHtml.getResponse().getContentType()).contains("text/html"));
        assert(Objects.equals(resultJson.getResponse().getContentType(), "application/json"));
        assert(Objects.equals(resultXml.getResponse().getContentType(), "application/xml"));
        assert(Objects.equals(resultDefault.getResponse().getContentType(), "application/json"));
    }

    /**
     * Get an existing user.
     * @throws Exception Exception.
     */
    @Test
    @Order(2)
    public void getUser() throws Exception {
        String url = "/users/{login}";
        String goodLogin = "otman-le-rigolo";
        String badLogin = "otman-le-pas-drole";

        //Launch request (HTML)
        MvcResult resultHtml = mock.perform(MockMvcRequestBuilders
                .get(url, goodLogin)
                .header("Accept", "text/html"))
                .andExpect(status().is(200))
                .andReturn();

        //Launch request (JSON)
        MvcResult resultJson = mock.perform(MockMvcRequestBuilders
                .get(url, goodLogin)
                .header("Accept", "application/json"))
                .andExpect(status().is(200))
                .andReturn();

        //Launch request (XML)
        MvcResult resultXml = mock.perform(MockMvcRequestBuilders
                .get(url, goodLogin)
                .header("Accept", "application/xml"))
                .andExpect(status().is(200))
                .andReturn();

        //Launch request (DEFAULT)
        MvcResult resultDefault = mock.perform(MockMvcRequestBuilders
                .get(url, goodLogin))
                .andExpect(status().is(200))
                .andReturn();

        //Launch request (User not exists)
        mock.perform(MockMvcRequestBuilders
                .get(url, badLogin)
                .header("Accept", "text/html"))
                .andExpect(status().is(404))
                .andReturn();

        //Asserts
        assert(Objects.requireNonNull(resultHtml.getResponse().getContentType()).contains("text/html"));
        assert(Objects.equals(resultJson.getResponse().getContentType(), "application/json"));
        assert(Objects.equals(resultXml.getResponse().getContentType(), "application/xml"));
        assert(Objects.equals(resultDefault.getResponse().getContentType(), "application/json"));
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObject = (JSONObject) jsonParser.parse(resultDefault.getResponse().getContentAsString());
        assert(jsonObject.get("login").equals(goodLogin));
        assert(jsonObject.get("connected").equals(false));
    }

    @Test
    @Order(3)
    public void createUser(){

    }

}
