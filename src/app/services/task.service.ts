import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Board } from '../board.model';

@Injectable({
  providedIn: 'root',
})
export class TaskBoardService {
  updateTask(task: any) {
    throw new Error('Method not implemented.');
  }
  private dataUrl = 'assets/data.json';

  constructor(private http: HttpClient) {}

  getBoards(): Observable<Board[]> {
    return this.http
      .get<{ boards: Board[] }>(this.dataUrl)
      .pipe(map((res) => res.boards));
  }
}
