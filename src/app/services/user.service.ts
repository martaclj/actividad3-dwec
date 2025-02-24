import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://peticiones.online/api/users';
  constructor(private http: HttpClient) {}
  getUsers(): Observable<IUser[]> {
    return this.http.get<{ results: any[] }>(this.apiUrl).pipe(
      map(response => response.results.map(user => ({
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        image: user.image,
        age: user.age
      } as IUser)))
    );
  }
  getUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/${id}`);
  }
  addUser(user: Partial<IUser>): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl, {
      first_name: user.name || 'Sin nombre',
      last_name: 'Default',
      email: user.email || 'default@example.com',
      image: `https://i.pravatar.cc/500?u=${user.email}`,
      password: 'user12345'
    });
  }
  updateUser(id: number, user: Partial<IUser>): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/${id}`, {
      first_name: user.name || 'Sin nombre',
      last_name: 'Default',
      email: user.email,
      image: user.image || `https://i.pravatar.cc/500?u=${user.email}`,
      password: 'user12345'
    });
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
