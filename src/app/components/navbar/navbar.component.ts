
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input() activeBoardName!: string;
  showModal: boolean = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }
} 
