/**
 * TaskExceptionHandler.java
 *
 *
 * Modification History
 *
 * Date        Version   Developer      Description
 * ---------   -------   ------------   --------------------------------------
 * 10/16/2018  1.0      463657       Initial Version
 */
package com.fsd.taskmanager.exception;


import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fsd.taskmanager.controller.TaskController;


@ControllerAdvice(assignableTypes = {TaskController.class})
public class TaskExceptionHandler
{

	@ExceptionHandler(Exception.class)
	public @ResponseBody RestError handleCustomException (Exception ex, HttpServletResponse response) {
		response.setHeader("Content-Type", "application/json");
		if(ex instanceof TaskException){

			response.setStatus(((TaskException) ex).getReturnStatus());
			return ((TaskException) ex).transformException();
		}else
		{
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			RestError restError = returnRestError();
			return restError;
		}
		
	}
	
	public RestError returnRestError()
	{
		RestError restError = new RestError();
		Exceptions exception = new Exceptions();
		exception.setType("E");
		exception.setCode("PP9043");
		exception.setMessage("One or more of the request parameters are missing/wrong. Please correct the request.");
		exception.setDetail("One or more of the request parameters are missing/wrong. Please correct the request.");
		Exceptions exceptions[] = new Exceptions[1];
		exceptions[0] = exception;
		restError.setExceptions(exceptions);
		return restError;
	}
}
