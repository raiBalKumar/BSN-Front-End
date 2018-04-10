import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TournamentService } from '../../../services/tournament.service';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-score',
  templateUrl: './update-score.component.html',
  styleUrls: ['./update-score.component.css']
})
export class UpdateScoreComponent implements OnInit {
  private fixtures$: Observable<Models.TournamentFixture[]>;

  scoreForm = new FormGroup({
    home_score: new FormControl(null, Validators.required),
    away_score: new FormControl(null, Validators.required)
  })

  constructor(private route: ActivatedRoute, private tournamentService: TournamentService) { }

  ngOnInit() {
    this.fixtures$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.tournamentService.reloadTournamentFixtures(+params.get('id'));
        return this.tournamentService.getTournamentFixtures();
      });
  }
}
