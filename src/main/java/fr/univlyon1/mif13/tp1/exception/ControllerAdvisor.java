package fr.univlyon1.mif13.tp1.exception;

import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@ControllerAdvice
public class ControllerAdvisor {

    private static String ERROR_PAGE = "error";

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(UserPasswordException.class)
    public ModelAndView handleUserPasswordException(UserPasswordException exception, HttpServletRequest request){
        checkException(exception);

        ModelAndView mav = new ModelAndView();
        mav.addObject("exception", exception.getMessage());
        mav.addObject("url", request.getRequestURL());
        mav.setViewName(ERROR_PAGE);
        return mav;
    }


    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(TokenException.class)
    public ModelAndView handleTokenException(TokenException exception, HttpServletRequest request){
        checkException(exception);

        ModelAndView mav = new ModelAndView();
        mav.addObject("exception", exception.getMessage());
        mav.addObject("url", request.getRequestURL());
        mav.setViewName(ERROR_PAGE);
        return mav;
    }


    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(UserConnectedException.class)
    public ModelAndView handleUserConnectedException(UserConnectedException exception, HttpServletRequest request){
        checkException(exception);

        ModelAndView mav = new ModelAndView();
        mav.addObject("exception", exception.getMessage());
        mav.addObject("url", request.getRequestURL());
        mav.setViewName(ERROR_PAGE);
        return mav;
    }


    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(UserLoginException.class)
    public ModelAndView handleUserLoginException(UserLoginException exception, HttpServletRequest request){
        checkException(exception);

        ModelAndView mav = new ModelAndView();
        mav.addObject("exception", exception.getMessage());
        mav.addObject("url", request.getRequestURL());
        mav.setViewName(ERROR_PAGE);
        return mav;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MissingArgumentsException.class)
    public ModelAndView handleMissingArgumentsException(MissingArgumentsException exception, HttpServletRequest request){
        checkException(exception);

        ModelAndView mav = new ModelAndView();
        mav.addObject("exception", exception.getMessage());
        mav.addObject("url", request.getRequestURL());
        mav.setViewName(ERROR_PAGE);
        return mav;
    }

    private void checkException(RuntimeException exception){
        if (AnnotationUtils.findAnnotation(exception.getClass(), ResponseStatus.class) != null){
            throw exception;
        }
    }


}
