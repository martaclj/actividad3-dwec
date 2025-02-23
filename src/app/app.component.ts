import { Component, OnInit } from '@angular/core';
import { IUser } from './interfaces/iuser';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserService } from './services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UserFormComponent, UserListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: IUser[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  onUserCreated(newUser: IUser): void {
    this.users = [...this.users, newUser];
  }
}
