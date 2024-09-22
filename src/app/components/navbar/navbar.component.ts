import { Component, Input } from '@angular/core';
import { Column } from '../../board.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input() activeBoardName!: string;
  @Input() columns: Column[] = []; // Pass the active board's columns

  showModal: boolean = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
