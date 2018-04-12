import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TournamentService } from '../../../services/tournament.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-list-fixture',
  templateUrl: './list-fixture.component.html',
  styleUrls: ['./list-fixture.component.css']
})
export class ListFixtureComponent implements OnInit {
  id: Params;
  fixtures: Observable<Models.TournamentFixture[]>;

  constructor(private route: ActivatedRoute,
              private tournamentService: TournamentService) { }

  ngOnInit() {
    this.fixtures = this.tournamentService.fixtures$; // get fixture from tournament service using subject
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.tournamentService.getFixture(this.id);
    })
  }

}
