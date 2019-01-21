import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as _ from 'lodash';

import { Path } from './paths';

@Injectable({
  providedIn: 'root'
})
export class PathsService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  load() {
    return this.http.get<Path[]>(`${this.baseUrl}/paths`);
  }

}

