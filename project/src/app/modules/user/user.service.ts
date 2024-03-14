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