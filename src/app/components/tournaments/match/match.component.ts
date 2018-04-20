import { Component, OnInit, Input } from '@angular/core';
import { TournamentService } from '../../../services/tournament.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  @Input() private tournamentId;
  private match: Models.TournamentFixture;

  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
    this.tournamentService.getMatch(this.tournamentId).subscribe(
      res => {
        if (res.length != 0) {this.match = res[0]}
      }
    )
  }

}
