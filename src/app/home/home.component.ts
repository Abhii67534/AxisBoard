import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { KanbanService } from '../services/kanban.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
    // Task columns
    backlog: string[] = [];
    doing: string[] = [];
    review: string[] = [];
    done: string[] = [];

constructor(private kanban:KanbanService){}
  ngOnInit(): void {
    this.showTasks();
  }



  // State for drag-and-drop
  isDragging = false;

  // Variables for adding new tasks
  newTask: string = '';
  selectedColumn: 'backlog' | 'doing' | 'review' | 'done' = 'backlog'; // Default column

  /**
   * Handles the drop event for drag-and-drop functionality.
   * Moves tasks within or between lists.
   */
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    // Debugging log to monitor changes in columns
    // console.log('Backlog:', this.backlog);
    // console.log('Doing:', this.doing);
    // console.log('Review:', this.review);
    // console.log('Done:', this.done);
    this.kanban.updateTasks('backlog', this.backlog);
    this.kanban.updateTasks('doing', this.doing);
    this.kanban.updateTasks('review', this.review);
    this.kanban.updateTasks('done', this.done);
    
  }

  /**
   * Sets `isDragging` to true when a drag operation starts.
   */
  onDragStarted() {
    this.isDragging = true;
  }

  /**
   * Sets `isDragging` to false when a drag operation ends.
   */
  onDragEnded() {
    this.isDragging = false;
  }

  /**
   * Adds a new task to the selected column.
   */
  addTask() {
    if (this.newTask.trim()) {
      this[this.selectedColumn].push(this.newTask.trim());

      this.kanban.addTasks(this.selectedColumn,this.newTask.trim());

      console.log(this.selectedColumn , " " , this[this.selectedColumn]);

      this.newTask = ''; // Clear input field
    } else {
      alert('Task cannot be empty!');
    }


  }

  showTasks(){
    this.backlog= this.kanban.displayTasks('backlog');
    this.doing= this.kanban.displayTasks('doing');
    this.review= this.kanban.displayTasks('review');
    this.done= this.kanban.displayTasks('done');
  }
}
