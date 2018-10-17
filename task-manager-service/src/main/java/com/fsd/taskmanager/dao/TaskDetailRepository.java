package com.fsd.taskmanager.dao;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.fsd.taskmanager.model.TaskDetail;

/**
 * Repository used for retrieving or updating task details in Mongo database
 * @author 463657
 *
 */
@Repository
public interface TaskDetailRepository extends MongoRepository<TaskDetail, String>{
	List<TaskDetail> findAll();
}
