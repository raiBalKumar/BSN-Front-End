import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TournamentService } from '../../../services/tournament.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  private ranking$: Observable<Models.Ranking[]>;

  constructor(private route: ActivatedRoute, private tournamentService: TournamentService) { }

  ngOnInit() {
    this.ranking$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.tournamentService.reloadRanking(+params.get('id'));
        return this.tournamentService.getRanking();
      });
  }

}
