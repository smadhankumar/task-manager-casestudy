import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskFilter',
  pure: false
})
export class TaskFilterPipe implements PipeTransform {

  transform(items: any, filter: any): any {
        if (!items || !filter) {  
            return items;  
        }  
        return items.filter(item => this.applyFilter(item, filter));  
  }

  applyFilter(taskItem: any , filterItem: any): boolean {
    
    if(null !== filterItem.task && undefined !== filterItem.task && taskItem['taskName'].toLowerCase().indexOf(filterItem.task.toLowerCase()) === -1){
        return false;
    }else if (null !== filterItem.parentTask && undefined !== filterItem.parentTask && ((null != taskItem['parentTaskDetail'] && taskItem['parentTaskDetail'].parentTaskName.toLowerCase().indexOf(filterItem.parentTask.toLowerCase()) === -1)) || null == taskItem['parentTaskDetail']) {
        return false;
    }else if((null !== filterItem.startDate && undefined !== filterItem.startDate && taskItem['startDate'].toLowerCase().indexOf(filterItem.startDate.toLowerCase()) === -1) ||
    (null !== filterItem.endDate && undefined !== filterItem.endDate && taskItem['endDate'].toLowerCase().indexOf(filterItem.endDate.toLowerCase()) === -1)){
        return false;
    }else if(this.parsePriority(filterItem.priorityTo) != 0 && (this.parsePriority(taskItem['priority']) < this.parsePriority(filterItem.priorityFrom) || this.parsePriority(taskItem['priority']) > this.parsePriority(filterItem.priorityTo))){
        return false;
    }
    return true;
  }

  parsePriority(priority : string) : number {
    let priorityNo = 0;
    if(priority === ""){
      priorityNo = 0;
    }else{
      priorityNo = parseInt(priority);
    }
    return priorityNo;
  }
}
