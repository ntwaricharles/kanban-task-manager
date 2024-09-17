import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
})
export class TaskCardComponent {
  @Input() task: any;
}
