import { Component, ElementRef, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DraggerDirective } from '@richapps/rx-drag';

@Component({
    selector: 'app-root',
    imports: [DraggerDirective],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'drag-demo';

  item = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
}
