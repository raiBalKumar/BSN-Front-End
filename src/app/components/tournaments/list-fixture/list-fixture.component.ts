import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TournamentService } from '../../../services/tournament.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-list-fixture',
  templateUrl: './list-fixture.component.html',
  styleUrls: ['./list-fixture.component.css']
})
export class ListFixtureComponent implements OnInit {
  tournamentId: Params;
  fixtures: Observable<Models.TournamentFixture[]>;

  constructor(private route: ActivatedRoute,
              private tournamentService: TournamentService,
              private router: Router) { }

  ngOnInit() {
    this.fixtures = this.tournamentService.fixtures$; // get fixture from tournament service using subject
    this.route.params.subscribe((params: Params) => {
      this.tournamentId = params['id'];
      this.tournamentService.getFixture(this.tournamentId);
    })
  }

}
