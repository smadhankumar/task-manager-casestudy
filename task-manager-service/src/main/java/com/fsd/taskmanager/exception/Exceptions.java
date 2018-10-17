package com.fsd.taskmanager.exception;

/**
 * Excpeion model object
 * @author 463657
 *
 */
public class Exceptions {
	private String type;
	private String code;
	private String message;
	private String detail;
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
}
