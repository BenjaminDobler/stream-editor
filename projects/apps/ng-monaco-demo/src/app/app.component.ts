import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgMonacoComponent } from "@richapps/ng-monaco";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgMonacoComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demo';

  declarations = signal('');
}
