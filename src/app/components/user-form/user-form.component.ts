import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../interfaces/iuser';
import { UserService } from '../../services/user.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  @Output() userCreated = new EventEmitter<IUser>();

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl(0, [Validators.required, Validators.min(1)]),
    image: new FormControl('https://via.placeholder.com/150', [Validators.required])
  });

  constructor(private userService: UserService) {}

  addUser(): void {
    if (this.userForm.valid) {
      const newUser: IUser = {
        id: Date.now(),
        ...this.userForm.value as Omit<IUser, 'id'>
      };

      this.userService.createUser(newUser).subscribe(() => {
        this.userCreated.emit(newUser);
        this.userForm.reset();
      });
    }
  }
}
