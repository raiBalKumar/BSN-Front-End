import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NewsService } from '../../services/news.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  private news$: Observable<{ status: string, totalResults: number, articles: {}[] }>;

  constructor(private _http: HttpClient, private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.reloadNews();
    this.news$ = this.newsService.getNews();
  }
}
