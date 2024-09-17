import { Component } from '@angular/core';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.css'
})
export class TaskBoardComponent {
  columns = [
    {
      name: 'To Do',
      tasks: [
        { title: 'Task 1', description: 'This is task 1' },
        { title: 'Task 2', description: 'This is task 2' },
      ],
    },
    {
      name: 'Doing',
      tasks: [
        { title: 'Task 3', description: 'This is task 3' },
        { title: 'Task 4', description: 'This is task 4' },
      ],
    },
    {
      name: 'Done',
      tasks: [
        { title: 'Task 5', description: 'This is task 5' },
        { title: 'Task 6', description: 'This is task 6' },
      ],
    },
  ];
}
