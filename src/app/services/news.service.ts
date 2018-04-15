import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject, BehaviorSubject } from 'rxjs';
import { apiKey } from '../../environments/apiKey'

@Injectable()
export class NewsService {
  private newsSubject$: BehaviorSubject<Models.News>

  constructor(private http: HttpClient) {
    this.newsSubject$ = new BehaviorSubject(<Models.News>{});
  }

  reloadNews() {
    this.http.get<Models.News>(`https://newsapi.org/v2/top-headlines?sources=bbc-sport&apiKey=${apiKey.newsKey}`).subscribe(
      res => {
        this.newsSubject$.next(res);
      })
  }

  getNews() {
    return this.newsSubject$.asObservable();
  }

}
