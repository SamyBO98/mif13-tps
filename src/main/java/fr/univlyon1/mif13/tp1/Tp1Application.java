package fr.univlyon1.mif13.tp1;

import fr.univlyon1.mif13.tp1.dao.UserDao;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
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
		ApplicationContext ctx = new AnnotationConfigApplicationContext(Tp1Application.class);
		UserDao userDao = ctx.getBean(UserDao.class);
	}

}
