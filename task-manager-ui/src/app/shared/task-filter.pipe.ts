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
    var priorityFrom = 0;
    var priorityTo = 0;
    for (let field in filterItem) {
      if (filterItem[field]) {
        if (typeof filterItem[field] === 'string') {
           if(field === 'priorityFrom'){
             if(filterItem[field] === ""){
                priorityFrom = 0;
             }else{
                priorityFrom = parseInt(filterItem[field]);
             }
          }else if(field === 'priorityTo'){
             if(filterItem[field] === ""){
                priorityTo = 0;
             }else{
                priorityTo = parseInt(filterItem[field]);
             }
          }else if(field === 'task'){
             if (null !== filterItem[field] && undefined !== filterItem[field] && taskItem['taskName'].toLowerCase().indexOf(filterItem[field].toLowerCase()) === -1) {
               return false;
             }
          }else if(field === 'parentTask'){
            let parentTask = taskItem['parentTaskDetail'];
             if (null !== filterItem[field] && undefined !== filterItem[field] && ((null != parentTask && parentTask.parentTaskName.toLowerCase().indexOf(filterItem[field].toLowerCase()) === -1)) || null == parentTask) {
               return false;
             }
          }else if (null !== filterItem[field] && undefined !== filterItem[field] && taskItem[field].toLowerCase().indexOf(filterItem[field].toLowerCase()) === -1) {
            return false;
          }
        }
      }
    }
    var priority = 0;
    if(taskItem['priority'] === ""){
      priority = 0;
    }else{
      priority = parseInt(taskItem['priority']);
    }
    if (priorityTo !=0 && (priority < priorityFrom || priority > priorityTo)) {
          return false;
    }
    return true;
  }

}
