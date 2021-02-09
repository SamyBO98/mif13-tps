package fr.univlyon1.mif13.tp1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@Configuration
public class Tp1Application {

	@Bean
	public UserDao userDao(){
		return new UserDao();
	}

	public static void main(String[] args) {
		SpringApplication.run(Tp1Application.class, args);
	}

}
