import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { IUser } from './models/user.model';
import { TestPipe } from './pipes/test-pipe.pipe';
import { SsoService } from './services/sso.service';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent
  
  beforeEach(async () => {

    const ssoServiceStub: Partial<SsoService> = {
      authenticate: () => {
        const user: IUser = {
          name: 'Icaro de Barros',
          id: '1234',
          codes: []
        };
  
        return of(user);
      }
    };

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
      ],
      providers: [
        {provide: SsoService, useValue: ssoServiceStub},
      ],
      declarations: [
        AppComponent,
        UserComponent,
        TestPipe,
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'app-unit-tests'`, () => {
    expect(component.title).toEqual('app-unit-tests');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('app-unit-tests app is running!');
  });

  it('should display the user name and id', () => {
    const appElement = fixture.nativeElement;
    const pId = appElement.querySelector('p'); // Pega o primeiro <p> encontrado. No caso: <p>{{user?.id}}</p>
    const pName = appElement.querySelector('#username');
    
    expect(pId.textContent).toEqual('1234');
    expect(pName.textContent).toEqual('Icaro de Barros');
  });

});
