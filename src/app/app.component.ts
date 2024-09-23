import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isDarkMode = false;
  activeBoard: string = 'Platform Launch'; // Default board name

  ngOnInit() {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }
}
