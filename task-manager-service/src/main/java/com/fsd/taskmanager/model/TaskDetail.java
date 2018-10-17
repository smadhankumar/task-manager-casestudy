package com.fsd.taskmanager.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Mongo Collection used for storing task information 
 * @author 463657
 *
 */
@Document(collection = "Task")
public class TaskDetail {

	@Id
	public ObjectId _id;
	private int taskId;
	private String taskName;
	private ParentTaskDetail parentTaskDetail;
	private String priority;
	private String startDate;
	private String endDate;

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public ParentTaskDetail getParentTaskDetail() {
		return parentTaskDetail;
	}

	public void setParentTaskDetail(ParentTaskDetail parentTaskDetail) {
		this.parentTaskDetail = parentTaskDetail;
	}

	public ObjectId get_id() {
		return _id;
	}

	public void set_id(ObjectId _id) {
		this._id = _id;
	}

	public int getTaskId() {
		return taskId;
	}

	public void setTaskId(int taskId) {
		this.taskId = taskId;
	}
}
