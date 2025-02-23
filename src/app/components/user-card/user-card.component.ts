import { Component, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-user-card',
  standalone: true,
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user!: IUser;
}
