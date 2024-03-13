import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "./user.model";
import { Lecturer } from "./lecturer.model";


@Injectable({
    providedIn:'root'
})
export class UserService {
   
    getUser(): Observable<User[]> {
        return this._http.get<User[]>("/api/Users")
    }
    getByIdUser(id: number): Observable<User> {
        return this._http.get<User>("/api/Users/"+ id)
    }

    postUser(user: User): Observable<any> {
        return this._http.post<any>("api/Users", user)
    }

    // updateStudent(student: User): Observable<boolean> {
    //     console.log("aaaaa", student);
    //     student.isActive = Boolean(student.isActive);
    //     return this._http.put<boolean>(`api/Students/${student.id}`, student);
    // }
    // deleteStudent(id: number): Observable<boolean> {
    //     return this._http.delete<boolean>("api/Students/" + id);
    // }

    getLecturer(): Observable<Lecturer[]> {
        return this._http.get<Lecturer[]>("/api/Lecturer")
    }
    getByIdLecturer(id: number): Observable<Lecturer> {
        return this._http.get<Lecturer>("/api/Lecturer/"+ id)
    }

    postLecturer(lecturer: Lecturer): Observable<any> {
        return this._http.post<any>("/api/Lecturer", lecturer)
    }

    constructor(private _http: HttpClient) {}

}