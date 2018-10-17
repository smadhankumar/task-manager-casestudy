package com.fsd.taskmanager.service;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.fsd.taskmanager.controller.TaskController;
import com.fsd.taskmanager.dao.TaskDetailRepository;
import com.fsd.taskmanager.exception.TaskException;
import com.fsd.taskmanager.model.TaskDetail;
import com.fsd.taskmanager.model.TaskSequence;

/**
 * Service for retrieving and updating task details.
 * 
 * @author 463657
 * 
 */
@Service
public class TaskDetailsServiceImpl implements TaskDetailsService {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(TaskDetailsServiceImpl.class);

	@Autowired
	private TaskDetailRepository taskDetailRepository;

	@Autowired
	private MongoOperations mongo;

	/**
	 * Method used for retrieving all the tasks from DB
	 * 
	 * @return List<TaskDetail>
	 */
	@Override
	public List<TaskDetail> getTaskDetails() throws TaskException {
		LOGGER.info("Start of getTaskDetails() of TaskDetailsServiceImpl");
		List<TaskDetail> taskDetails = null;
		try {
			taskDetails = taskDetailRepository.findAll();
		} catch (Exception e) {
			LOGGER.info("Exception in getTaskDetails() of TaskDetailsServiceImpl"+e);
			throw new TaskException("1000", "Technical Error", 500);
		}
		LOGGER.info("End of getTaskDetails() of TaskDetailsServiceImpl");
		return taskDetails;
	}

	/**
	 * Method used for adding / updating the task in DB
	 * 
	 * @param TaskDetail
	 * @return
	 */
	@Override
	public void updateTaskDetail(TaskDetail taskDetail) throws TaskException {
		LOGGER.info("Start of updateTaskDetail() of TaskDetailsServiceImpl");
		try {
			if (taskDetail.getTaskId() == 0) {
				taskDetail.setTaskId(getNextSequence("TaskSequence"));
			}
			taskDetailRepository.save(taskDetail);
		} catch (Exception e) {
			LOGGER.info("Exception in updateTaskDetail() of TaskDetailsServiceImpl"+e);
			throw new TaskException("1000", "Technical Error", 500);
		}
		LOGGER.info("End of updateTaskDetail() of TaskDetailsServiceImpl");
	}

	/**
	 * Method for retriving the sequence number to be used for task id while
	 * adding task detail in DB
	 * 
	 * @param seqName
	 * @return
	 */
	public int getNextSequence(String seqName) {
		TaskSequence counter = mongo.findAndModify(
				query(where("_id").is(seqName)), new Update().inc("seq", 1),
				options().returnNew(true).upsert(true), TaskSequence.class);
		return counter.getSeq();
	}

}
