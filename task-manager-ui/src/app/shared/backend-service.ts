import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouterModule , Router } from '@angular/router';

@Injectable()
export class BackendService {
  
  constructor(private httpClient: HttpClient, private router : Router) {}

  viewTasks(inputParam) {
     const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post('http://localhost:8090/task-manager/viewTasks',
      inputParam,
      {headers: headers});
  }

   updateTask(inputParam) {
      const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post('http://localhost:8090/task-manager/updateTask',
      inputParam,
      {headers: headers});
  }

}
