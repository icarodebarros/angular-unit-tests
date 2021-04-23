import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUserResponse, IUserDetail, IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SsoService {

  constructor(private readonly http: HttpClient) { }

  public authenticate(): Observable<IUser> {
    return this.http.get<IUserResponse>('some-url')
      .pipe(
        map((authenticateResponse: IUserResponse) => {
          return this.validateResponse(authenticateResponse);
        })
      );
  }

  private validateResponse(authenticateResponse: IUserResponse): IUser {
    if (authenticateResponse && authenticateResponse.id) {
      const user: IUser = {
        id: authenticateResponse.id,
        name: authenticateResponse.users[0].userName,
        codes: [],
      };

      authenticateResponse.users.forEach((el: IUserDetail) => user.codes.push(el.userCode));

      return user;
    } else {
      throw new Error('Unknow response');
    }
  }

}
