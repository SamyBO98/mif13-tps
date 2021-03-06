package fr.univlyon1.mif13.tp1.controller;

import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Objects;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserRestController.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserRestControllerTest {

    @Autowired
    private MockMvc mock;
    private String userBeingCreated = "Thanos";
    private String userNotExists = "NotThanos";
    private String anotherUserBeingCreated = "Thor";
    private String anotherUserNotExists = "Thar";
    private String password1 = "password";
    private String password2 = "password2";

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
    @Order(3)
    public void getUser() throws Exception {
        String url = "/users/{login}";

        /*Prerequisites (uncomment it for unitary test)
        mock.perform(MockMvcRequestBuilders
                .post("/users")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .param("login", userBeingCreated)
                .param("password", password1));
        mock.perform(MockMvcRequestBuilders
                .post("/users")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .param("login", anotherUserBeingCreated)
                .param("password", password2));
         */

        //Launch request (HTML)
        MvcResult resultHtml = mock.perform(MockMvcRequestBuilders
                .get(url, userBeingCreated)
                .header("Accept", "text/html"))
                .andExpect(status().is(200))
                .andReturn();

        //Launch request (JSON)
        MvcResult resultJson = mock.perform(MockMvcRequestBuilders
                .get(url, userBeingCreated)
                .header("Accept", "application/json"))
                .andExpect(status().is(200))
                .andReturn();

        //Launch request (XML)
        MvcResult resultXml = mock.perform(MockMvcRequestBuilders
                .get(url, anotherUserBeingCreated)
                .header("Accept", "application/xml"))
                .andExpect(status().is(200))
                .andReturn();

        //Launch request (DEFAULT)
        MvcResult resultDefault = mock.perform(MockMvcRequestBuilders
                .get(url, anotherUserBeingCreated))
                .andExpect(status().is(200))
                .andReturn();

        //Launch request (User not exists)
        mock.perform(MockMvcRequestBuilders
                .get(url, userNotExists))
                .andExpect(status().is(404))
                .andReturn();

        //Asserts
        assert(Objects.requireNonNull(resultHtml.getResponse().getContentType()).contains("text/html"));
        assert(Objects.equals(resultJson.getResponse().getContentType(), "application/json"));
        assert(Objects.equals(resultXml.getResponse().getContentType(), "application/xml"));
        assert(Objects.equals(resultDefault.getResponse().getContentType(), "application/json"));
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObject = (JSONObject) jsonParser.parse(resultDefault.getResponse().getContentAsString());
        assert(jsonObject.get("login").equals(anotherUserBeingCreated));
        assert(jsonObject.get("connected").equals(false));
    }

    @Test
    @Order(2)
    public void createUser() throws Exception {
        String url = "/users";

        /*Prerequisites (uncomment it for unitary test)
        mock.perform(MockMvcRequestBuilders
                .delete(url + "/{login}", userBeingCreated));
        mock.perform(MockMvcRequestBuilders
                .delete(url + "/{login}", anotherUserBeingCreated));
        */

        //Launch request (HTML)
        mock.perform(MockMvcRequestBuilders
                .post(url)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .param("login", userBeingCreated)
                .param("password", password1))
                .andExpect(status().is(201))
                .andReturn();

        //Launch request (JSON)
        mock.perform(MockMvcRequestBuilders
                .post(url)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"login\": \"" + anotherUserBeingCreated + "\", \"password\": \"" + password2 + "\"}"))
                .andExpect(status().is(201))
                .andReturn();

        //Launch request (User already exists)
        mock.perform(MockMvcRequestBuilders
                .post(url)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .param("login", userBeingCreated)
                .param("password", password1))
                .andExpect(status().is(404));

        //Launch request (Missing argument)
        mock.perform(MockMvcRequestBuilders
                .post(url)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE))
                .andExpect(status().is(400));


        //Verify if both users exists
        mock.perform(MockMvcRequestBuilders
                .get(url + "/{login}", userBeingCreated))
                .andExpect(status().is(200));
        mock.perform(MockMvcRequestBuilders
                .get(url + "/{login}", anotherUserBeingCreated))
                .andExpect(status().is(200));

    }

    @Test
    @Order(4)
    public void updateUser() throws Exception {
        String url = "/users/{login}";

        /*Prerequisites (uncomment it for unitary test)
        mock.perform(MockMvcRequestBuilders
                .post("/users")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .param("login", userBeingCreated)
                .param("password", password1));
        mock.perform(MockMvcRequestBuilders
                .post("/users")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .param("login", anotherUserBeingCreated)
                .param("password", password2));
        */

        //Launch request (JSON)
        mock.perform(MockMvcRequestBuilders
                .put(url, anotherUserBeingCreated)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"login\": \"" + anotherUserNotExists + "\", \"password\": \"" + password2 + "\"}"))
                .andExpect(status().is(200));

        //Verify if the user was updated (JSON)
        mock.perform(MockMvcRequestBuilders
                .get(url, anotherUserBeingCreated))
                .andExpect(status().is(404));
        mock.perform(MockMvcRequestBuilders
                .get(url, anotherUserNotExists))
                .andExpect(status().is(200));

        //Launch request (HTML should not pass)
        mock.perform(MockMvcRequestBuilders
                .put(url, userBeingCreated)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .param("login", userNotExists)
                .param("password", password1))
                .andExpect(status().is(415));

        //Launch request (New user's login already exists)
        mock.perform(MockMvcRequestBuilders
                .put(url, userNotExists)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"login\": \"" + anotherUserNotExists + "\", \"password\": \"" + password1 + "\"}"))
                .andExpect(status().is(404));

        //Launch request (Missing argument)
        mock.perform(MockMvcRequestBuilders
                .put(url, userNotExists)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is(400));
    }

    @Test
    @Order(5)
    public void deleteUser() throws Exception {
        String url = "/users/{login}";

        /*Prerequisites (uncomment it for unitary test)
        mock.perform(MockMvcRequestBuilders
                .post("/users")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .param("login", userBeingCreated)
                .param("password", password1));
        mock.perform(MockMvcRequestBuilders
                .post("/users")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .param("login", anotherUserBeingCreated)
                .param("password", password2));
        mock.perform(MockMvcRequestBuilders
                .delete(url, userNotExists));
        mock.perform(MockMvcRequestBuilders
                .delete(url, anotherUserNotExists));
        */

        //Launch requests (Pass)
        mock.perform(MockMvcRequestBuilders
                .delete(url, userBeingCreated))
                .andExpect(status().is(204));
        mock.perform(MockMvcRequestBuilders
                .delete(url, anotherUserNotExists))
                .andExpect(status().is(204));

        //Launch request (Not pass)
        mock.perform(MockMvcRequestBuilders
                .delete(url, userBeingCreated))
                .andExpect(status().is(404));
        mock.perform(MockMvcRequestBuilders
                .delete(url, userNotExists))
                .andExpect(status().is(404));
        mock.perform(MockMvcRequestBuilders
                .delete(url, anotherUserBeingCreated))
                .andExpect(status().is(404));
        mock.perform(MockMvcRequestBuilders
                .delete(url, anotherUserNotExists))
                .andExpect(status().is(404));

    }

}
