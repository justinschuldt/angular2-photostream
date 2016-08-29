import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from "rxjs/Subject";

@Injectable()
export class TokenService {

    // Observable string source
    private tokenSubject = new Subject<string>();

    // Observable string streams
    token$ = this.tokenSubject.asObservable();

    setAuthToken(token: string): void{
        this.tokenSubject.next(token);
    }
}