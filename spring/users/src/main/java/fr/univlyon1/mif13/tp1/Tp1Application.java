package fr.univlyon1.mif13.tp1;

import fr.univlyon1.mif13.tp1.dao.UserDao;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.annotations.servers.ServerVariable;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
		info = @Info(
				title = "mif13 - tp1 & tp2 (gp17)",
				version = "0.0",
				description = "Basic API for testing some requests",
				license = @License(name = "Apache 2.0", url = "http://foo.bar")
		),
		servers = {
				@Server(
						description = "Local",
						url = "http://localhost:8080",
						variables = {
								@ServerVariable(name = "url", description = "Basic url (local)", defaultValue = "http://localhost:8080"),
								@ServerVariable(name = "login", description = "Basic login", defaultValue = "otman-le-rigolo")
						}),
				@Server(
						description = "VM (HTTP)",
						url = "http://192.168.75.118:8080/v1",
						variables = {
								@ServerVariable(name = "url", description = "VM's URL", defaultValue = "http://192.168.75.118:8080/v1"),
								@ServerVariable(name = "login", description = "Basic login", defaultValue = "otman-le-rigolo")
						}),
				@Server(
						description = "VM (HTTP)",
						url = "https://192.168.75.118/api/v1",
						variables = {
								@ServerVariable(name = "url", description = "VM's URL", defaultValue = "https://192.168.75.118/api/v1"),
								@ServerVariable(name = "login", description = "Basic login", defaultValue = "otman-le-rigolo")
						})
		}
)
@SpringBootApplication
@Configuration
public class Tp1Application extends SpringBootServletInitializer {

	@Bean
	public UserDao userDao(){
		return new UserDao();
	}

	public static void main(String[] args) {

		SpringApplication.run(Tp1Application.class, args);

		//ApplicationContext ctx = new AnnotationConfigApplicationContext(Tp1Application.class);
		//UserDao userDao = ctx.getBean(UserDao.class);

	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(Tp1Application.class);
	}

}
