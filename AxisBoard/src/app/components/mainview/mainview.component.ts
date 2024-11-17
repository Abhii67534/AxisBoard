import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Ensure CommonModule is imported

@Component({
  selector: 'app-mainview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mainview.component.html',
  styleUrls: ['./mainview.component.css']
})
export class MainviewComponent {
  divs: string[] = [];  // Array to store div data

  handleClick(): void {
    // Adds a new div to the divs array with a label "New Div"
    this.divs.push(`New Div ${this.divs.length + 1}`);
  }
}
