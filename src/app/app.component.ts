import { Component } from '@angular/core';
import { searchService } from './service/searchService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private searchSvc: searchService){
    
  }
}
