import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule], // Import RouterModule for routing
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrected the property name
})
export class AppComponent {
  title = 'AxisBoard';
}
