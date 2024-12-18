import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {

  constructor() { }

  backlog: string[] = [];
  doing: string[] = [];
  review: string[] = [];
  done: string[] = [];


  addTasks(selectedColumn: string, task: string) {
 
  
    if (selectedColumn === 'backlog') {
      const storedBacklog = localStorage.getItem('backlog');
      this.backlog = storedBacklog ? JSON.parse(storedBacklog) : [];
      this.backlog.push(task);
      localStorage.setItem('backlog', JSON.stringify(this.backlog));
    }
  
    if (selectedColumn === 'doing') {
      const storedDoing = localStorage.getItem('doing');
      this.doing = storedDoing ? JSON.parse(storedDoing) : [];
      this.doing.push(task.trim());
      localStorage.setItem('doing', JSON.stringify(this.doing));
    }
  
    if (selectedColumn === 'review') {
      const storedReview = localStorage.getItem('review');
      this.review = storedReview ? JSON.parse(storedReview) : [];
      this.review.push(task.trim());
      localStorage.setItem('review', JSON.stringify(this.review));
    }
  
    if (selectedColumn === 'done') {
      const storedDone = localStorage.getItem('done');
      this.done = storedDone ? JSON.parse(storedDone) : [];
      this.done.push(task.trim());
      localStorage.setItem('done', JSON.stringify(this.done));
    }
  }

  displayTasks(column:string){
    if(typeof window !='undefined' && typeof window.localStorage !== 'undefined'){
      if(column==='backlog'){
        const storedBacklog= localStorage.getItem('backlog');
        return storedBacklog ? JSON.parse(storedBacklog) : [];
      }
  
      if(column==='doing'){
        const storedDoing = localStorage.getItem('doing');
        return storedDoing ? JSON.parse(storedDoing) : [];
      }
  
      if(column=== 'review'){
        const storedReview = localStorage.getItem('review');
        return storedReview ? JSON.parse(storedReview) : [];
      }
  
      if(column==='done'){
        const storedDone = localStorage.getItem('done');
        return storedDone ? JSON.parse(storedDone) : [];
      }
  
    }


  }

  updateTasks(column: string, tasks: string[]): void {
    localStorage.setItem(column, JSON.stringify(tasks));
  }
  


}
