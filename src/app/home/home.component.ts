import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { KanbanService } from '../services/kanban.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // Task columns, initialized as empty arrays
  backlog: string[] = [];
  doing: string[] = [];
  review: string[] = [];
  done: string[] = [];

  constructor(private kanban: KanbanService, private router:Router) {}

  ngOnInit(): void {
    this.backlog = [];
    this.doing = [];
    this.review = [];
    this.done = [];

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
    // Check if the dragged item is "Waiting for tasks..." and prevent the drop if so
    if (event.item.data === 'Waiting for tasks...') {
      return;  // Prevent the move if the item is the placeholder
    }
  
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
  
    // Update tasks in Kanban service
    this.kanban.updateTasks('backlog', this.backlog);
    this.kanban.updateTasks('doing', this.doing);
    this.kanban.updateTasks('review', this.review);
    this.kanban.updateTasks('done', this.done);
  
    this.Placeholder(this.backlog);
    this.Placeholder(this.doing);
    this.Placeholder(this.review);
    this.Placeholder(this.done);
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
      // Remove the "Waiting for tasks..." placeholder if it exists in the selected column
      this.Placeholder(this[this.selectedColumn]);

      // Add the new task
      this[this.selectedColumn].push(this.newTask.trim());
      this.kanban.addTasks(this.selectedColumn, this.newTask.trim());
      this.newTask = ''; // Clear input field

      // Reapply the placeholder if the column becomes empty after task is added
      this.Placeholder(this[this.selectedColumn]);
    } else {
      alert('Task cannot be empty!');
    }
  }

  showTasks() {
    // Fetch tasks from the Kanban service and initialize columns
    this.backlog = this.kanban.displayTasks('backlog') || [];
    this.doing = this.kanban.displayTasks('doing') || [];
    this.review = this.kanban.displayTasks('review') || [];
    this.done = this.kanban.displayTasks('done') || [];

    // Add placeholders if columns are empty
    this.Placeholder(this.backlog);
    this.Placeholder(this.doing);
    this.Placeholder(this.review);
    this.Placeholder(this.done);
  }

  /**
   * Adds a "Waiting for tasks..." placeholder if the column is empty.
   */
  Placeholder(column: string[]) {
    console.log("Navigationg");
    // Ensure column is defined and empty, and the placeholder is not already added
    if (column.length === 0 && !column.includes('Waiting for tasks...')) {
      
      column.push('Waiting for tasks...');
      
      this.router.navigate(["/"]);
    }
    
    else if (column.includes('Waiting for tasks...') && column.length > 1) {
      const index = column.indexOf('Waiting for tasks...');
      if (index !== -1) {
        column.splice(index, 1); // Remove the placeholder
      }
      this.router.navigate(["/"]);
    }
  }
  


  deleteTask(index: number, name: string) {
    if (name === 'backlog' && this.backlog[index] !== 'Waiting for tasks...') {
      this.backlog.splice(index, 1);
      this.Placeholder(this.backlog);
      this.kanban.updateTasks('backlog', this.backlog);
    }
    if (name === 'doing' && this.doing[index] !== 'Waiting for tasks...') {
      this.doing.splice(index, 1);
      this.Placeholder(this.doing);
      this.kanban.updateTasks('doing', this.doing);
    }
    if (name === 'review' && this.review[index] !== 'Waiting for tasks...') {
      this.review.splice(index, 1);
      this.Placeholder(this.review);
      this.kanban.updateTasks('review', this.review);
    }
    if (name === 'done' && this.done[index] !== 'Waiting for tasks...') {
      this.done.splice(index, 1);
      this.Placeholder(this.done);
      this.kanban.updateTasks('done', this.done);
    }
  }
}
