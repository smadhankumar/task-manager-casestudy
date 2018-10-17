package com.fsd.taskmanager.service;

import java.util.List;

import com.fsd.taskmanager.exception.TaskException;
import com.fsd.taskmanager.model.TaskDetail;

/**
 * Interface for retrieving and updating task details
 * @author 463657
 *
 */
public interface TaskDetailsService {
	
	public List<TaskDetail> getTaskDetails() throws TaskException;

	public void updateTaskDetail(TaskDetail taskDetail) throws TaskException;
}
