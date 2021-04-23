import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SsoService } from './services/sso.service';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './components/user/user.component';
import { FormsModule } from '@angular/forms';
import { TestPipe } from './pipes/test-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    TestPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [SsoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
