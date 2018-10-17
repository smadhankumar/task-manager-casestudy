import { Component, OnInit } from '@angular/core';
import { TaskFilterPipe } from '../shared/task-filter.pipe';
import { Router } from '@angular/router';
import { TaskService } from '../shared/task-service';
import { BackendService } from '../shared/backend-service';
import { DatePipe } from '@angular/common'; 

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {

  taskModelList = [];
  searchModel = {
          "task":"",
          "priorityFrom":"",
          "priorityTo":"",
          "parentTask":"",
          "startDate":"",
          "endDate":""
  };
  todaysDate = new Date(new Date().getTime() - (1000 * 60 * 60 * 24));
  constructor(public router: Router,private taskService : TaskService, private backendService : BackendService, private datePipe: DatePipe ) { }

  ngOnInit() {
    this.taskModelList = [];
    this.todaysDate =  new Date(new Date().getTime() - (1000 * 60 * 60 * 24));
    this.getTasks();
   
  }

  editTask(taskModel : any){
     this.taskService.editTask = taskModel;
     this.router.navigate(['/editTask']);
  }

  endTask(taskModel : any){
     taskModel.endDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
     this.backendService.updateTask(taskModel).subscribe(
      (data: any) => {
           this.getTasks();
           this.router.navigate(['viewTask']);
         
    },
    (err: any) => {
           
      } 
    );
  }

  getTasks(){
      var inputParam = {
    }  

      this.backendService.viewTasks(inputParam).subscribe(
      (data: any) => {
           this.taskModelList = data;
            if(null != this.taskModelList && this.taskModelList.length > 0){
              for(let task of this.taskModelList){
                 task.disabled = false;
                 if(new Date(task.endDate) > this.todaysDate){
                     task.disabled = true;
                 }
              }
           }
    },
    (err: any) => {
           
      } 
    );
  }

}
