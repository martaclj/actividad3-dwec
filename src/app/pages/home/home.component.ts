import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserFormComponent } from '../../pages/user-form/user-form.component';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { IUser } from '../../interfaces/iuser';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, UserFormComponent, UserListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: IUser[] = [];
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getUsers().subscribe(u => this.users = u);
  }
  onUserCreated(newUser: IUser): void {
    this.users = [...this.users, newUser];
  }
}
