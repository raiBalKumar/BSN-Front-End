import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TournamentService } from '../../../services/tournament.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {
  private fixtures$: Observable<Models.TournamentFixture[]>;

  constructor(private route: ActivatedRoute, private tournamentService: TournamentService) { }

  ngOnInit() {
    this.fixtures$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.tournamentService.reloadTournamentFixtures(+params.get('id'));
        return this.tournamentService.getTournamentFixtures();
      });
  }

}
