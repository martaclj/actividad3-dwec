import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://peticiones.online/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<{ results: any[] }>(this.apiUrl).pipe(
      tap(response => console.log('API Response:', response)),
      map(response => response.results.map(user => ({
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        image: user.image
      })))
    );
  }
  getUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/${id}`);
  }

  addUser(user: Partial<IUser>): Observable<IUser> {
    const email = user.email ?? 'default@example.com';

    return this.http.post<IUser>(this.apiUrl, {
      first_name: user.name ?? 'Sin nombre',
      last_name: 'Default',
      username: email.split('@')[0],
      email: email,
      image: `https://i.pravatar.cc/500?u=${email}`,
      password: 'user12345'
    });
  }
}
