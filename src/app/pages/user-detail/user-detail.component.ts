import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  user: IUser | null = null;
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.userService.getUserById(id).subscribe({
        next: (user) => {
          if (user) {
            this.user = user;
          } else {
            alert('Usuario no encontrado');
            this.router.navigate(['/home']);
          }
        },
        error: (error) => {
          alert('Error al cargar usuario: ' + error);
          this.router.navigate(['/home']);
        }
  });
}
}
}

