import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../shared/backend-service';
import { DatePipe } from '@angular/common'; 
declare var jQuery:any;

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  taskModel : any = {};
  taskModelList = [];
  parentTask = "";
  dateErrorFlag : boolean = false;
  taskRequired : boolean = false;
  taskPresent : boolean = false;
  invalidParentTask : boolean = false;
  constructor(public router: Router, private backendService : BackendService, private datePipe: DatePipe) { }

  ngOnInit() {
    
    jQuery.fn.datepicker.defaults.autoclose = true;
    jQuery.fn.datepicker.defaults.format = "mm/dd/yyyy";
    jQuery.fn.datepicker.defaults.startDate = "0d";
    jQuery.fn.datepicker.defaults.orientation = "bottom auto";
    this.dateErrorFlag = false;
    this.taskRequired = false;
    this.taskPresent = false;
    this.invalidParentTask = false;
    this.taskModel = {
        "taskName":"",
        "priority":"0",
        "parentTaskDetail": null,
        "startDate":this.datePipe.transform(new Date(), 'MM/dd/yyyy'),
        "endDate":this.datePipe.transform(new Date(), 'MM/dd/yyyy')
      };
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

    if(null !== this.taskModel && undefined !== this.taskModel){
      if(this.taskModel.taskName == ""){
        this.taskRequired = true;
      }else{
          if(null != this.taskModelList && this.taskModelList.length > 0){
          for(let task of this.taskModelList){
              if(this.taskModel.taskName.toLowerCase() == task.taskName.toLowerCase()){
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
           this.router.navigate(['viewTask']);
    },
    (err: any) => {
           
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
    }  

      this.backendService.viewTasks(inputParam).subscribe(
      (data: any) => {
           this.taskModelList = data;
    },
    (err: any) => {
           
      } 
    );
  }

}
