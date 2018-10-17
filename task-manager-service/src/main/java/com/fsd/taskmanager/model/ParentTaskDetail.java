package com.fsd.taskmanager.model;

import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Mongo Collection used for storing parent task information
 * 
 * @author 463657
 * 
 */
@Document(collection = "Parent_Task")
public class ParentTaskDetail {

	private int parentId;
	private String parentTaskName;

	public int getParentId() {
		return parentId;
	}

	public void setParentId(int parentId) {
		this.parentId = parentId;
	}

	public String getParentTaskName() {
		return parentTaskName;
	}

	public void setParentTaskName(String parentTaskName) {
		this.parentTaskName = parentTaskName;
	}

}
