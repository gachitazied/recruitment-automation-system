import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu-table-bord',
  templateUrl: './menu-table-bord.component.html',
  styleUrls: ['./menu-table-bord.component.css']
})
export class MenuTableBordComponent implements OnInit {

  ngOnInit(): void {
    const linkColor = document.querySelectorAll('.nav-link');
    linkColor.forEach(link => {
      if (window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('active');
      }
      link.addEventListener('click', () => {
        linkColor.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
