import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../../interfaces/iuser';
import { UserService } from '../../services/user.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Output() userCreated = new EventEmitter<IUser>();
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl(0, [Validators.required, Validators.min(1)]),
    image: new FormControl('', [])
  });
  isUpdate = false;
  userId: number | null = null;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isUpdate = true;
      this.userId = Number(id);
      this.userService.getUserById(this.userId).subscribe(user => {
        this.userForm.patchValue({
          name: user.name,
          email: user.email,
          age: user.age,
          image: user.image
        });
      });
    }
  }
  addUser(): void {
    if (this.userForm.valid) {
      const userData: Partial<IUser> = {
        name: this.userForm.value.name || '',
        email: this.userForm.value.email || '',
        age: this.userForm.value.age !== null ? Number(this.userForm.value.age) : 0,
        image: this.userForm.value.image || `https://i.pravatar.cc/500?u=${this.userForm.value.email}`
      };
      if (this.isUpdate && this.userId !== null) {
        this.userService.updateUser(this.userId, userData).subscribe(() => {
          this.router.navigate(['/user', this.userId]);
        });
      } else {
        this.userService.addUser(userData).subscribe(createdUser => {
          this.userCreated.emit(createdUser);
          this.userForm.reset();
          this.router.navigate(['/home']);
        });
      }
    }
  }
}
