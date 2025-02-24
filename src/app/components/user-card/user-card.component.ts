import { Component, Input } from '@angular/core';
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
  constructor(private userService: UserService, private router: Router) {}
  borrarUser(): void {
    if (confirm('¿Está seguro de eliminar a ' + this.user.name + '?')) {
      this.userService.deleteUser(this.user.id).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }
}
