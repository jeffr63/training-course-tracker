import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '@admin/users/models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  delete(id: number) {
    return this.http.delete<User>(`${this.baseUrl}/users/${id}`);
  }

  get(id: number) {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  load() {
    return this.http.get<User[]>(`${this.baseUrl}/users?_sort=name&_order=asc`);
  }

  patch(id: number, data: any) {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.patch<any>(`${this.baseUrl}/users/${id}`, data, { headers: httpHeaders });
  }
}
