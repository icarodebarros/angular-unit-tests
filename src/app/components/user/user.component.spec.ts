import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TestPipe } from 'src/app/pipes/test-pipe.pipe';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        FormsModule,
      ],
      declarations: [ 
        UserComponent,
        TestPipe,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    component.userInfo = { id: '', name: '', codes: []}; // Pra forçar a entrada no if do método ngAfterContentInit()
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should add a user', () => {
    component.novoNome = 'Joao da Silva';
    component.novaIdade = '22';
    const currentLength = component.usuarios.length;
    component.addUsuario();
    const newLength = component.usuarios.length;

    expect(newLength).toEqual(currentLength + 1);
    expect(component.usuarios[newLength-1].nome).toEqual('Joao da Silva');
    expect(component.usuarios[newLength-1].idade).toEqual('22');
  });

  it('should try add a user and call a alert', () => {
    const spy = spyOn(window, 'alert');

    component.addUsuario();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  // Essa função é assíncrona pois o html está usando o two-way-data-biding (ngModule)
  it('should try add another user and display on table', async () => {
    await fixture.whenStable();

    const currentLength = component.usuarios.length;

    const userElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = userElement.querySelector('#nome');
    const idadeInput: HTMLInputElement = userElement.querySelector('#idade');
    const addButton: HTMLButtonElement = userElement.querySelector('#add-button');

    nameInput.value = 'Novo Usuário';
    nameInput.dispatchEvent(new Event('input'));
    idadeInput.value = '30';
    idadeInput.dispatchEvent(new Event('input'));
    
    addButton.click();

    fixture.detectChanges();

    expect(component.usuarios.length).toEqual(currentLength+1);

  });

  it('should remove a user from table', () => {
    const currentLength = component.usuarios.length;

    const userElement = fixture.nativeElement;
    const removeButton: HTMLButtonElement = userElement.querySelector('#remove-btn'); // pega o primeiro encontrado

    removeButton.click();

    expect(component.usuarios.length).toEqual(currentLength-1);
  });

  it('should try remove a user with a nonexistent index', () => {
    const currentLength = component.usuarios.length;
    component.removeUsuario(5);

    expect(component.usuarios.length).toEqual(currentLength);
  });

});
