import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { searchService } from '../service/searchService';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnDestroy {

  images: string[] = []

  sub$!: Subscription

  constructor(private searchSvc: searchService) { }

  ngOnInit(): void {
    this.sub$ = this.searchSvc.onNewResult.subscribe(
      urls => {
        this.images = urls
      }
    )
  }

  ngOnDestroy(): void {
      this.sub$.unsubscribe()
  }

}
