import { Component, OnInit } from '@angular/core';
import { IUser } from './models/user.model';
import { SsoService } from './services/sso.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app-unit-tests';
  user?: IUser;

  constructor(private sso: SsoService) {}

  ngOnInit() {
    this.sso.authenticate()
      .subscribe((user: IUser) => {
        this.user = user;
      });
    
    // Forçando dados apenas para visualização de interface
    this.user = {
      id: '1234',
      name: 'Icaro de Barros',
      codes: ['1234', '5687']
    };
  }

}
