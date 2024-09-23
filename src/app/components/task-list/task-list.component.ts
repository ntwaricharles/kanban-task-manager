import { Component, Input } from '@angular/core';
import { Column } from '../../board.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  @Input() column!: Column;
}
