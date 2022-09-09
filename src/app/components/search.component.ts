import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Search } from '../models/search';
import { searchService } from '../service/searchService';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output()
  onSearchClicked = new Subject<Search>()
  search!: Search

  searchPage!: FormGroup

  constructor(private fb: FormBuilder, private searchSvc: searchService) { }

  ngOnInit(): void {

    this.searchPage = this.startSearch()
  }

  private startSearch(){
    return this.fb.group({
      api: this.fb.control<string>(this.getAPIKey(), [Validators.required]),
      search: this.fb.control<string>('', [Validators.required]),
      results: this.fb.control<number>(5),
      rating: this.fb.control<string>('g')
    })
  }

  searchClicked(){
    console.info("Search button clicked")

    const search: Search = this.searchPage.value as Search
    console.info('search parameters: ', search)
    this.searchSvc.search(search)
      .then( result => {
        console.info('>>>> result: ', result)
        //Only save if the call is successful
        this.saveAPIKey(search.api)
        this.searchPage = this.startSearch()
        this.searchSvc.onNewResult.next(result)
      })
      .catch(error => {
        console.error('>>>>> error: ', error)
        alert(`>>> error ${JSON.stringify(error)}`)
        
      })
  }

  private getAPIKey(): string {
    let key = localStorage.getItem('api')
    if (!key)
      return ''
    return key
  }

  private saveAPIKey(key: string){
    localStorage.setItem('api', key)
  }

}
