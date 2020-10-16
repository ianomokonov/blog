import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'blog';
  notPaddinged: string[] = ['/', '/articles'];
  constructor(private router: Router) {}

  isPaddinged(){
    return this.notPaddinged.indexOf(this.router.url) < 0
  }
}
