import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search.component';
import { ResultComponent } from './components/result.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { searchService } from './service/searchService';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule
  ],
  providers: [searchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
