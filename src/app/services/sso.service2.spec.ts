import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { SsoService } from './sso.service';
import { IUser, IUserResponse } from '../models/user.model';
import { of } from 'rxjs';

describe('SsoService', () => {
  let service: SsoService;
  let httpClient: HttpClient;

  beforeEach(() => {
    const httpClientStub = {
      get: () => {},
    }

    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: httpClientStub},
      ]
    });

    service = TestBed.inject(SsoService); // = TestBed.get(SsoService);
    httpClient = TestBed.inject(HttpClient); // = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate and return an User', () => {
    const mockResponse: IUserResponse = {
      user: 'A0001JH2',
      id: '630863',
      userLoged: 'A0001JH2',
      users : [
        {
          userRegistration: '630863',
          userCode: 'A0001JH1',
          userName: 'JOHN DOE'
        },
        {
          userRegistration: '630863',
          userCode: 'A0001JH2',
          userName: 'JOHN DOE'
        }
      ]
    };

    spyOn(httpClient, 'get').and.returnValue(of(mockResponse));
    
    service.authenticate()
      .subscribe((user: IUser) => {
        expect(user).toBeDefined();
        expect(user.id).toEqual('630863');
        expect(user.codes.length).toEqual(2);
      });
  });

  it('should try to authenticate and throw an Error', () => {

    spyOn(httpClient, 'get').and.returnValue(of(new Error('User not found')));

    service.authenticate()
      .subscribe(
        (_user: IUser) => fail(),
        (_err) => {
          expect(service.authenticate).toThrowError(); // 'Unknow response'
        }
      );
  });

});
