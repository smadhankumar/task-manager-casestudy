import { Component, OnInit } from '@angular/core';
import { TaskService } from '../shared/task-service';
import { Router } from '@angular/router';
import { BackendService } from '../shared/backend-service';
declare var jQuery:any;

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css']
})
export class EdittaskComponent implements OnInit {

  taskModel : any = {};
  taskModelList = [];
  parentTaskName : string = "";
  editTaskName : string = "";
  dateErrorFlag : boolean = false;
  taskRequired : boolean = false;
  taskPresent : boolean = false;
  invalidParentTask : boolean = false;
  constructor(public router: Router,private taskService : TaskService, private backendService : BackendService) { }

  ngOnInit() {
    this.taskModel = this.taskService.editTask;
    this.editTaskName = this.taskService.editTask.taskName;
    jQuery.fn.datepicker.defaults.autoclose = true;
    jQuery.fn.datepicker.defaults.format = "mm/dd/yyyy";
    jQuery.fn.datepicker.defaults.startDate = "0d";
    jQuery.fn.datepicker.defaults.orientation = "bottom auto";
    this.dateErrorFlag = false;
    this.taskRequired = false;
    this.taskPresent = false;
    this.invalidParentTask = false;
    this.parentTaskName = (null != this.taskService.editTask && undefined != this.taskService.editTask
    && null != this.taskService.editTask.parentTaskDetail) ? this.taskService.editTask.parentTaskDetail.parentTaskName : "";
    this.getTasks();
      jQuery("#startDate").datepicker({
        todayBtn:  1,
        autoclose: true
    }).change('changeDate', function () {
        var minDate = jQuery('#startDate').val();
        jQuery('#endDate').datepicker('setDate', minDate);
    });

    jQuery("#endDate").datepicker({  
        todayBtn:  1,
        autoclose: true
    }); 
  }
 
   editTask(){

    if(null !== this.taskModel && undefined !== this.taskModel){
      if(this.taskModel.taskName == ""){
        this.taskRequired = true;
      }else{
          if(null != this.taskModelList && this.taskModelList.length > 0){
          for(let task of this.taskModelList){
              if(this.editTaskName.toLowerCase() != this.taskModel.taskName.toLowerCase() && this.taskModel.taskName.toLowerCase() == task.taskName.toLowerCase()){
                this.taskPresent = true;
                break;
              }
          }
          }
      }

      let startDate = new Date(jQuery('#startDate').val());
      let endDate = new Date(jQuery('#endDate').val());
      if(endDate < startDate){
          this.dateErrorFlag = true;
      }
    }

     if(this.parentTaskName != "" && null != this.taskModelList && this.taskModelList.length > 0){
      let count = 0;
      for(let task of this.taskModelList){
          if(task.taskName.toLowerCase() == this.parentTaskName.toLowerCase()){
            this.taskModel.parentTaskDetail = {
              "parentId":task.taskId,
              "parentTaskName":task.taskName
            }
            count++;
          }
           if(count == 0){
            this.invalidParentTask = true;
           }
      }
    }
     if(this.taskRequired || this.dateErrorFlag ||   this.taskPresent || this.invalidParentTask){
        return;
      }
    this.taskModel.startDate = jQuery('#startDate').val();
     this.taskModel.endDate = jQuery('#endDate').val();
     this.backendService.updateTask(this.taskModel).subscribe(
      (data: any) => {
           this.router.navigate(['viewTask']);
         
    },
    (err: any) => {
           
      } 
    );
   }

  goToViewTask(){
    this.router.navigate(['viewTask']);
  }

  getTasks(){
     var inputParam = {
    }  

      this.backendService.viewTasks(inputParam).subscribe(
      (data: any) => {
        console.log(data);
           this.taskModelList = data;
         
    },
    (err: any) => {
           
      } 
    );
  }

}
