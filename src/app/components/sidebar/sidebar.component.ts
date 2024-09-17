import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isSidebarHidden = false;

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark');
    localStorage.setItem(
      'darkMode',
      body.classList.contains('dark').toString()
    );
  }

  ngOnInit() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      document.body.classList.add('dark');
    }
  }
}

