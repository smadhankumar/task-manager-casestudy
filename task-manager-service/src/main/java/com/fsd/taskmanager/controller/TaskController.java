package com.fsd.taskmanager.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fsd.taskmanager.exception.TaskException;
import com.fsd.taskmanager.model.TaskDetail;
import com.fsd.taskmanager.service.TaskDetailsService;

/**
 * Controller for viewing and updating tasks
 * @author 463657
 *
 */
@RestController
public class TaskController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(TaskController.class);
	
	@Autowired
	private TaskDetailsService taskDetailsService;
	
	/**
	 * Method used for viewing all the tasks
	 * @return
	 */
	@RequestMapping(value = "/viewTasks", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE,consumes = MediaType.APPLICATION_JSON_VALUE)
	public List<TaskDetail> getTaskDetails() throws TaskException{
		LOGGER.info("Start of getTaskDetails() of TaskController");
		List<TaskDetail> taskDetails = taskDetailsService.getTaskDetails();
		LOGGER.info("End of getTaskDetails() of TaskController");
		return taskDetails;
	}
	
	/**
	 * Method used to add/update task details
	 * @param taskDetail
	 * @return
	 */
	@RequestMapping(value = "/updateTask", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE,consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateTask(@RequestBody TaskDetail taskDetail) throws TaskException{
		LOGGER.info("Start of updateTask() of TaskController");
		taskDetailsService.updateTaskDetail(taskDetail);
		LOGGER.info("End of updateTask() of TaskController");
    }
}
