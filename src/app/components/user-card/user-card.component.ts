import { Component, EventEmitter , Input, Output } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { IUser } from '../../interfaces/iuser';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() user!: IUser;
  @Output() userDeleted = new EventEmitter<number>();

  constructor(private userService: UserService, private router: Router) {}

  deleteUser(user: IUser) {
    if (confirm('¿Quieres borrar a ' + user.name + '?')) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          alert('Usuario borrado!');
          this.userDeleted.emit(user.id);
        },
        error: (error) => {
          alert('Error: no eliminado! ' + error);
        }
      });
    }
  }
}
