import { Injectable } from "@angular/core";
import { IUser } from "../interfaces/iuser";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private users: IUser[] = [];
    private usersSubject = new BehaviorSubject<IUser[]>(this.users);

    constructor() {
        this.loadUsers();
    }

    getUsers(): Observable<IUser[]> {
        return this.usersSubject.asObservable();
    }

    loadUsers(): void {
        this.users = [
            { id: 1, name: 'Jaime Ruiz', email: 'jruiz@daw.com', age: 30 },
            { id: 2, name: 'Ana Pérez', email: 'aperez@daw.com', age: 25 },
            { id: 3, name: 'Estefania López', email: 'elopez@daw.com', age: 23 }
        ];
        this.usersSubject.next(this.users);
    }

    addUser(user: IUser): void {
      user.id = this.users.length + 1;
      this.users.push(user);
      this.usersSubject.next(this.users);
    }
  }
