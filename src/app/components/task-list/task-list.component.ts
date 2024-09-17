import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
  @Input() column: any; // Ensure column data is passed from the parent
}
