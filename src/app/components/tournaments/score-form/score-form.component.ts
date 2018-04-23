import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TournamentService } from '../../../services/tournament.service';
import swal from 'sweetalert2';

@Component({
  selector: '[app-score-form]',
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
    this.scoreForm.patchValue({
      home_score: this.fixture.home_score,
      away_score: this.fixture.away_score,
    })
  }

  async onSubmit() {
    if (this.scoreForm.invalid) {
      // Forbid the form from submitting if it is invalid.
      return;
    }

    const result = await this.swalSetUp();

    if (result.value) {
      this.tournamentService.updateScore(this.fixture, this.scoreForm.value);

      swal({
        type: 'success',
        confirmButtonText: 'DONE!',
        width: 300,
      })
    } else if (result.dismiss === swal.DismissReason.cancel) {
      swal({
        type: 'error',
        confirmButtonText: 'Canceled',
        width: 300,
      })
    }
  }

  swalSetUp() {
    return swal({
      title: 'Are you sure?',
      type: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    })
  }
}
