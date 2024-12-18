import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  // Task columns
  backlog: string[] = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  doing: string[] = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  review: string[] = ['Review PR', 'Test feature'];
  done: string[] = ['Complete meeting', 'Submit report'];

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
    console.log('Backlog:', this.backlog);
    console.log('Doing:', this.doing);
    console.log('Review:', this.review);
    console.log('Done:', this.done);
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
      this.newTask = ''; // Clear input field
    } else {
      alert('Task cannot be empty!');
    }
  }
}
