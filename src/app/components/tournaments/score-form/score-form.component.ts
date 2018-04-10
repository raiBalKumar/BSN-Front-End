import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TournamentService } from '../../../services/tournament.service';

@Component({
  selector: 'app-score-form',
  templateUrl: './score-form.component.html',
  styleUrls: ['./score-form.component.css']
})
export class ScoreFormComponent implements OnInit {
  @Input() private fixture;

  scoreForm = new FormGroup({
    home_score: new FormControl(null, [Validators.min(0),Validators.max(99),Validators.pattern(/^[0-9]+$/),Validators.required]),
    away_score: new FormControl(null, [Validators.min(0),Validators.max(99),Validators.pattern(/^[0-9]+$/),Validators.required])
  })

  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.fixture);
    console.log(this.scoreForm.value);
    if (this.scoreForm.invalid) {
      // Forbid the form from submitting if it is invalid.
      return;
    }

    this.tournamentService.updateScore(this.fixture, this.scoreForm.value);
  }
}
