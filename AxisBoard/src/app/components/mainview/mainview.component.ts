import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { initializeApp } from 'firebase/app';  // Import Firebase initialization
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';  // Import Firestore methods
import { environment } from '../../../environments/environments';

// Define the Kanban board data structure (This is outside the class)
interface KanbanLists {
  todo: string[];
  doing: string[];
  review: string[];
  done: string[];
}

@Component({
  selector: 'app-mainview',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './mainview.component.html',
  styleUrls: ['./mainview.component.css']
})
export class MainviewComponent implements OnInit {
  // Arrays for each list, initially empty, will be loaded from Firestore
  todo: string[] = [];
  doing: string[] = [];
  review: string[] = [];
  done: string[] = [];

  // Declare the missing properties
  isLoading: boolean = true; // This will handle the loading state
  cardActionMessage: string = ''; // This will store a message related to card actions (e.g., "Card added!")

  // Initialize Firebase
  firebaseApp = initializeApp(environment.firebaseConfig);
  firestore = getFirestore(this.firebaseApp);

  constructor() {}

  ngOnInit(): void {
    this.loadData(); // Load data when the component is initialized
  }

  // Fetch the lists from Firestore when the component loads
  async loadData() {
    this.isLoading = true; // Start loading
    console.log('Loading data...'); // Debugging message
    try {
      const docRef = doc(this.firestore, 'kanban', 'lists');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as KanbanLists; // Cast to correct type
        this.todo = data.todo || [];
        this.doing = data.doing || [];
        this.review = data.review || [];
        this.done = data.done || [];
        console.log('Data loaded:', data); // Log the data to check
      } else {
        console.log('No such document, creating one with empty lists!');
        await this.createEmptyDocument();
      }
    } catch (error) {
      console.error('Error loading data:', error); // Log any error in data loading
    } finally {
      this.isLoading = false; // End loading state
    }
  }
  
  

  // Create a new document with empty lists
  async createEmptyDocument() {
    const docRef = doc(this.firestore, 'kanban', 'lists');
    await setDoc(docRef, {
      todo: [],
      doing: [],
      review: [],
      done: [],
    });
    console.log('Created empty document with lists.');
  }

  // Handles the drag-and-drop functionality
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

    // After a drop, update Firestore with new list data
    this.updateLists();
  }

  // Add a card to the selected list
  addCard(list: 'todo' | 'doing' | 'review' | 'done') {
    const newCard = prompt('Enter the new card name:');
    if (newCard) {
      this[list].push(newCard);
      this.cardActionMessage = 'Card added successfully!'; // Show the success message
      this.updateLists();  // Make sure to update Firestore
    }
  }

  // Delete a card from the selected list
  deleteCard(list: 'todo' | 'doing' | 'review' | 'done', card: string) {
    const index = this[list].indexOf(card);
    if (index > -1) {
      this[list].splice(index, 1);
      this.cardActionMessage = 'Card deleted successfully!'; // Show the success message
      this.updateLists();
    }
  }

  // Update Firestore document after any change (add, delete, or drag-drop)
  async updateLists() {
    const docRef = doc(this.firestore, 'kanban', 'lists'); // Reference to the Firestore document
    try {
      await updateDoc(docRef, {
        todo: this.todo,      // Update 'todo' list
        doing: this.doing,    // Update 'doing' list
        review: this.review,  // Update 'review' list
        done: this.done,      // Update 'done' list
      });
      console.log('Firestore updated with new lists.');
    } catch (error) {
      console.error('Error updating Firestore:', error);
    }
  }
}
