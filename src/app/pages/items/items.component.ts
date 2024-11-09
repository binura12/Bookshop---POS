import { Component } from '@angular/core';
import { NavBarComponent } from "../common/nav-bar/nav-bar.component";

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {

}
