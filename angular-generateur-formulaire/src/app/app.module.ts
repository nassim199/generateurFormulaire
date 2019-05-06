import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenFormComponent } from './gen-form/gen-form.component';
import { ChampsComponent } from './champs/champs.component';

@NgModule({
  declarations: [
    AppComponent,
    GenFormComponent,
    ChampsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
