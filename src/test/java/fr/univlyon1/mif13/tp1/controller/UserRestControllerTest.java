package fr.univlyon1.mif13.tp1.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.univlyon1.mif13.tp1.model.User;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Objects;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserRestController.class)
public class UserRestControllerTest {

    @Autowired
    private MockMvc mock;
    ObjectMapper objectMapper;

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
    public void createUser() throws Exception {
        String url = "/users";
        String password = "password";
        String user1 = "user1";
        String user2 = "user2";
        String existingUser = "otman-le-rigolo";

        //Launch request (HTML)
        mock.perform(MockMvcRequestBuilders
                .post(url)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .param("login", user1)
                .param("password", password))
                .andExpect(status().is(201))
                .andReturn();

        //Launch request (JSON)
        mock.perform(MockMvcRequestBuilders
                .post(url)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"login\": \"" + user2 + "\", \"password\": \"" + password + "\"}"))
                .andExpect(status().is(201))
                .andReturn();

        //Launch request (User already exists)
        mock.perform(MockMvcRequestBuilders
                .post(url)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .param("login", existingUser)
                .param("password", password))
                .andExpect(status().is(404));

        //Launch request (Missing argument)
        mock.perform(MockMvcRequestBuilders
                .post(url)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE))
                .andExpect(status().is(400));


        //Verify if both users exists
        mock.perform(MockMvcRequestBuilders
                .get(url + "/{login}", user1))
                .andExpect(status().is(200));
        mock.perform(MockMvcRequestBuilders
                .get(url + "/{login}", user2))
                .andExpect(status().is(200));

    }

    @Test
    @Order(4)
    public void updateUser() throws Exception {
        String url = "/users/{login}";
        String password = "password";
        String userHtml = "otman-le-rigolo";
        String userJson = "samy-le-pas-drole";
        String newUserHtml = "otman-le-rigolo-html";
        String newUserJson = "samy-le-pas-drole-json";

        //Launch request (HTML)
        mock.perform(MockMvcRequestBuilders
                .put(url, userHtml)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .param("login", newUserHtml)
                .param("password", password))
                .andExpect(status().is(200))
                .andReturn();

        //Verify if the user was updated (HTML)
        mock.perform(MockMvcRequestBuilders
                .get(url, userHtml))
                .andExpect(status().is(404));
        mock.perform(MockMvcRequestBuilders
                .get(url, newUserHtml))
                .andExpect(status().is(200));

        //Launch request (JSON)
        mock.perform(MockMvcRequestBuilders
                .put(url, userJson)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"login\": \"" + newUserJson + "\", \"password\": \"" + password + "\"}"))
                .andExpect(status().is(200))
                .andReturn();

        //Verify if the user was updated (JSON)
        mock.perform(MockMvcRequestBuilders
                .get(url, userJson))
                .andExpect(status().is(404));
        mock.perform(MockMvcRequestBuilders
                .get(url, newUserJson))
                .andExpect(status().is(200));

        //Launch request (User not exists)
        mock.perform(MockMvcRequestBuilders
                .put(url, "this-user-not-exists")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .param("login", userHtml)
                .param("password", password))
                .andExpect(status().is(404));

        //Launch request (New user's login already exists)
        mock.perform(MockMvcRequestBuilders
                .put(url, newUserJson)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .param("login", newUserHtml)
                .param("password", password))
                .andExpect(status().is(409));

        //Launch request (Missing argument)
        mock.perform(MockMvcRequestBuilders
                .put(url, newUserHtml)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE))
                .andExpect(status().is(400));
    }

}
