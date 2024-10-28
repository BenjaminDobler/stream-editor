import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgMonacoComponent } from "@richapps/ng-monaco";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgMonacoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demo';
}
