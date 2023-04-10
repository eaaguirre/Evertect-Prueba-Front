import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonComponent } from './components/person/person.component';
import { PersonService } from './services/person.service';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from './components/auth/auth.service';
import { AuthGuard } from './components/auth/auth.guard';
import {  HeadersInterceptorInterceptor} from "./components/auth/headers-interceptor.interceptor";
import { ToastrModule } from 'ngx-toastr';
import { MessageComponent } from './components/message/message/message.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {StoreModule} from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects';
//import { reducers } from './components/person/state/reducers';
import { PersonEffects } from './components/person/state/effects/person-effects';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    LoginComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgxPaginationModule,
    StoreModule.forRoot({},{}),
    EffectsModule.forRoot([]),
    // StoreModule.forFeature("person",reducers),
    // EffectsModule.forFeature([PersonEffects])



  ],
  providers: [PersonService,AuthService,DatePipe,AuthGuard,MessageComponent,

    { provide: HTTP_INTERCEPTORS,useClass: HeadersInterceptorInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
