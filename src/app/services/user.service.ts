import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = 'https://peticiones.online/api/users';
  private users: IUser[] = []; // Array para usuarios ya que no se puede moficar la API

  constructor(private http: HttpClient) {}

  // Carga de usuarios desde desde API al array users
  getUsers(): Observable<IUser[]> {
    return this.http.get<{ results: any[] }>(this.apiUrl).pipe(
      map(response => response.results.map(user => ({
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        image: user.image,
        age: user.age
      } as IUser))),
      tap(users => this.users = users) // Guarda los usuarios en el array
    );
    return of(this.users); // of() convierte el array en un observable
  }

  // Obtener un usuario por id
  getUserById(id: number): Observable<IUser | null> {
    return this.http.get<IUser>(`https;//peticiones.online/users/${id}`).pipe(
      map(user => user ? user : null),
      catchError(() => of(null))
    );
  }


  // Simular añadir un usuario a la API
  addUser(user: Partial<IUser>): Observable<IUser> {
    const newUser: IUser = {
      id: this.users.length + 1,
      name: user.name || 'Sin nombre',
      email: user.email || 'defaul@example.com',
      image: user.image || `https://i.pravatar.cc/500?u=${user.email}`, // Imagen aleatoria
      age: user.age || 0
    };
    this.users.push(newUser);
    return of(newUser);
  }

  // Simular actualizar un usuario en la API
  updateUser(id: number, user: Partial<IUser>): Observable<IUser | undefined> {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users[index] = {
        ...this.users[index],
        ...user
      };
      return of(this.users[index]);
    }
    return of(undefined);
  }

  // Simular borrar un usuario en la API
  deleteUser(id: number): Observable<boolean> {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
