import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../shared/task-service';
import { BackendService } from '../shared/backend-service';
import { DatePipe } from '@angular/common'; 
declare var jQuery:any;

@Component({
  selector: 'app-updatetask',
  templateUrl: './updatetask.component.html',
  styleUrls: ['./updatetask.component.css']
})
export class UpdatetaskComponent implements OnInit {

  taskModel : any = {};
  taskModelList = [];
  parentTask = "";
  editTaskName : string = "";
  dateErrorFlag : boolean = false;
  taskRequired : boolean = false;
  taskPresent : boolean = false;
  invalidParentTask : boolean = false;
  technicalError : boolean = false;
  updateError : boolean = false;
  screenLoader : boolean = false;
  constructor(public router: Router, private backendService : BackendService,private taskService : TaskService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.screenLoader = true;
    this.technicalError = false;
    this.updateError = false;
    this.taskModel = this.taskService.editTask;
   
    if(null != this.taskService.editTask){
      this.editTaskName = this.taskService.editTask.taskName;
      this.parentTask = (null != this.taskService.editTask && undefined != this.taskService.editTask
      && null != this.taskService.editTask.parentTaskDetail) ? this.taskService.editTask.parentTaskDetail.parentTaskName : "";
    }
    jQuery.fn.datepicker.defaults.autoclose = true;
    jQuery.fn.datepicker.defaults.format = "mm/dd/yyyy";
    jQuery.fn.datepicker.defaults.startDate = "0d";
    jQuery.fn.datepicker.defaults.orientation = "bottom auto";
    this.dateErrorFlag = false;
    this.taskRequired = false;
    this.taskPresent = false;
    this.invalidParentTask = false;
    if(null == this.taskModel || undefined == this.taskModel){
      this.taskModel = {
          "taskName":"",
          "priority":"0",
          "parentTaskDetail": null,
          "startDate":this.datePipe.transform(new Date(), 'MM/dd/yyyy'),
          "endDate":this.datePipe.transform(new Date(), 'MM/dd/yyyy')
        };
    }
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


     this.getTasks();
  }

  goToViewTask(){
    this.screenLoader = true;
    if(null !== this.taskModel && undefined !== this.taskModel){
      if(this.taskModel.taskName == ""){
        this.taskRequired = true;
      }else{
          if(null != this.taskModelList && this.taskModelList.length > 0){
          for(let task of this.taskModelList){
              if("" == this.editTaskName && this.taskModel.taskName.toLowerCase() == task.taskName.toLowerCase()){
                this.taskPresent = true;
                break;
              }else if("" != this.editTaskName && this.editTaskName.toLowerCase() != this.taskModel.taskName.toLowerCase() && this.taskModel.taskName.toLowerCase() == task.taskName.toLowerCase()){
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
    if(this.parentTask != "" && null != this.taskModelList && this.taskModelList.length > 0){
      let count = 0;
      for(let task of this.taskModelList){
          if(task.taskName.toLowerCase() == this.parentTask.toLowerCase()){
            this.taskModel.parentTaskDetail = {
              "parentId":task.taskId,
              "parentTaskName":task.taskName
            }
            count++;
          }
      }
      if(count == 0){
        this.invalidParentTask = true;
      }
    }
     if(this.taskRequired || this.dateErrorFlag ||   this.taskPresent || this.invalidParentTask){
        return;
      }
     this.taskModel.startDate = jQuery('#startDate').val();
     this.taskModel.endDate = jQuery('#endDate').val();
     this.backendService.updateTask(this.taskModel).subscribe(
      (data: any) => {
           this.updateError = false;
           this.technicalError = false;
           this.screenLoader = false;
           this.router.navigate(['viewTask']);
    },
    (err: any) => {
            this.updateError = true;
            this.technicalError = true;
            this.screenLoader = false;
      } 
    );
   
  }

  resetFields(){
      this.taskModel = {
        "taskName":"",
        "priority":"0",
        "parentTaskDetail": null,
        "startDate":this.datePipe.transform(new Date(), 'MM/dd/yyyy'),
        "endDate":this.datePipe.transform(new Date(), 'MM/dd/yyyy')
    }
    this.dateErrorFlag = false;
    this.taskRequired = false;
    this.taskPresent = false;
    this.invalidParentTask = false;
    return;
  }

   getTasks(){
     var inputParam = {
     }; 

      this.backendService.viewTasks(inputParam).subscribe(
      (data: any) => {
           this.technicalError = false;
           this.taskModelList = data;
           this.screenLoader = false;
    },
    (err: any) => {
            this.technicalError = true;
            this.screenLoader = false;
      } 
    );

  }
   
  cancelTask(){
    this.router.navigate(['viewTask']);
  }

}
