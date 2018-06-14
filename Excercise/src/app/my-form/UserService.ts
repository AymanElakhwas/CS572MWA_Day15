import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(public http: HttpClient) { }
    getUser() {
        return this.http.get('http://jsonplaceholder.typicode.com/users/1');
    }

    getPosts() {
        return this.http.get('http://jsonplaceholder.typicode.com/posts?userId=1');
    }

}