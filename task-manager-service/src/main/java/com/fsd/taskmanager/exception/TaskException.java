package com.fsd.taskmanager.exception;


import java.io.Serializable;


/**
 * Exception class used for returning exception
 * @author 463657
 *
 */
public class TaskException extends Exception implements Serializable
{

	private static final long serialVersionUID = -2848300257012566378L;

	private String errorCode;
	private String errorType;
	private String errorMessage;
	private int returnStatus;
	
	public TaskException(String errorCode, String errorMessage, int returnStatus)
	{
		super(errorMessage);
		this.errorCode = errorCode;
		this.errorMessage = errorMessage;
		this.returnStatus = returnStatus;
	}


	public String getErrorCode()
	{
		return errorCode;
	}

	public void setErrorCode(String errorCode)
	{
		this.errorCode = errorCode;
	}

	public String getErrorMessage()
	{
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage)
	{
		this.errorMessage = errorMessage;
	}
	
	public String getErrorType() {
		return errorType;
	}

	public void setErrorType(String errorType) {
		this.errorType = errorType;
	}

	public RestError transformException() {
		RestError restError = new RestError();
		Exceptions exception = new Exceptions();
		exception.setType(this.errorType);
		exception.setCode(this.errorCode);
		exception.setMessage(this.errorMessage);
		exception.setDetail(this.errorMessage);
		Exceptions exceptions[] = new Exceptions[1];
		exceptions[0] = exception;
		restError.setExceptions(exceptions);
		return restError;
	}

	public void setReturnStatus(int returnStatus) {
		this.returnStatus = returnStatus;
	}

	public int getReturnStatus() {
		return returnStatus;
	}
}
