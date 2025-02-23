import { Component } from '@angular/core';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserService } from './services/user.service';
import { IUser } from './interfaces/iuser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UserFormComponent, UserListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'actividad3-dwec';

  constructor(public userService: UserService) {}

  addUser(newUser: IUser): void {
    this.userService.addUser(newUser);
  }

}
