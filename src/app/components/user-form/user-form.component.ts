import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../../interfaces/iuser';
import { UserService } from '../../services/user.service';

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
    age: new FormControl(0, [Validators.required, Validators.min(1)])
  });

  constructor(private userService: UserService) {}

  addUser(): void {
    if (this.userForm.valid) {
      const newUser: Partial<IUser> = {
        name: this.userForm.value.name || '',
        email: this.userForm.value.email || '',
        age: this.userForm.value.age !== null ? Number(this.userForm.value.age) : 0
      };

      this.userService.addUser(newUser).subscribe({
        next: (createdUser) => {
          console.log('Usuario creado:', createdUser);
          this.userCreated.emit(createdUser);
          this.userForm.reset();
        },
        error: (err) => console.error('Error al crear usuario', err),
      });
    }
  }
}
