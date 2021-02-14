package fr.univlyon1.mif13.tp1;

import fr.univlyon1.mif13.tp1.dao.UserDao;
import fr.univlyon1.mif13.tp1.model.User;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

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
