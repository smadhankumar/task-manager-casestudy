package com.fsd.taskmanager.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Mongo collection to store sequence id for updating Task Id
 * @author 463657
 *
 */
@Document(collection = "TaskSequence")
public class TaskSequence {

	@Id
	private String id;
	private int seq;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getSeq() {
		return seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
	}

}
