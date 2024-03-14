import { Observable } from "rxjs";
import { Course } from "./course.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "./category.model";


@Injectable({
    providedIn:'root'
})
export class CourseService {

    constructor(private _http: HttpClient) {}


    getAllCourses(): Observable<Course[]> {
        return this._http.get<Course[]>("/api/Course")
    }
    getByIdCourse(id: number): Observable<Course> {
        return this._http.get<Course>("/api/Course/"+ id)
    }

    addCourse(course: Course): Observable<any> {
        return this._http.post<any>("api/Course", course)
    }
    
    updateCourse(course: Course,id?:number): Observable<boolean> {
        return this._http.put<boolean>(`api/Course/${id}`, course);

    }

    getCategory():Observable<Category[]>{
        return this._http.get<Category[]>("/api/Category");
    }
    
}