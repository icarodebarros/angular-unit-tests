import { AfterContentInit, Component, Input } from '@angular/core';
import { IUser } from 'src/app/models/user.model';

interface IUsusario {
  nome: string,
  idade: string
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements AfterContentInit {
  @Input() userInfo?: IUser;

  public novoNome?: string;
  public novaIdade?: string;
  public usuarios: IUsusario[] = [
    {
      nome: 'Icaro de Barros',
      idade: '29',
    },
    {
      nome: 'john doe',
      idade: '40',
    },
    {
      nome: 'Jane Doe',
      idade: '30',
    }
  ];

  constructor() { }

  ngAfterContentInit(): void {
    if (this.userInfo) {
      console.log('Input ok');
    }
  }

  addUsuario(): void {
    if (this.novoNome && this.novoNome.trim().length > 0 &&
        this.novaIdade && this.novaIdade.trim().length > 0) {
          const novoUsuario: IUsusario = {
            nome: this.novoNome,
            idade: this.novaIdade
          };
          this.usuarios.push(novoUsuario);
          this.novoNome = '';
          this.novaIdade = '';
    } else {
      alert('Por favor preencha os dados');
    }
  }

  removeUsuario(indice: number): void {
    if (this.usuarios && indice < this.usuarios.length) {
      this.usuarios.splice(indice, 1);
    }
  }

}
