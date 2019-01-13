import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as _ from 'lodash';

import { Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  addCourse(course: Course) {
    return this.http.post(`${this.baseUrl}/courses`, course);
  }

  deleteCourse(id) {
    return this.http.delete(`${this.baseUrl}/courses/${id}`);
  }

  getCourse(id) {
    return this.http.get<Course>(`${this.baseUrl}/courses/${id}`);
  }

  getCourses() {
    return this.http.get<Course[]>(`${this.baseUrl}/courses?_sort=title&_order=asc`);
  }

  getCoursesUnsorted() {
    return this.http.get<Course[]>(`${this.baseUrl}/courses`);
  }

  getCoursesPaged(current, pageSize) {
    return this.http.get<Course[]>(`${this.baseUrl}/courses?_sort=title&_order=asc&_page=${current}&_limit=${pageSize}`);
  }

  saveCourse(course: Course) {
    if (course.id) {
      return this.updateCourse(course);
    } else {
      return this.addCourse(course);
    }
  }

  getPaths() {
    return this.http.get<any[]>(`${this.baseUrl}/paths`);
  }

  searchPaths(searchTerm) {
    return this.http.get<any[]>(`${this.baseUrl}/paths?q=${searchTerm}`);
  }

  getSources() {
    return this.http.get<any[]>(`${this.baseUrl}/sources`);
  }

  searchSources(searchTerm) {
    return this.http.get<any[]>(`${this.baseUrl}/sources?q=${searchTerm}`);
  }

  updateCourse(course: Course) {
    return this.http.put(`${this.baseUrl}/courses/${course.id}`, course);
  }
}

