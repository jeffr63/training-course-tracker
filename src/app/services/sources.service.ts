import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as _ from 'lodash';

import { Source } from './sources';

@Injectable({
  providedIn: 'root'
})
export class SourcesService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  load() {
    return this.http.get<Source[]>(`${this.baseUrl}/sources`);
  }
}
