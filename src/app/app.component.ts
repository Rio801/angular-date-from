import { Component, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInput } from '@angular/material/input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInput,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatError,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class AppComponent {
  formGroup = new FormGroup({
    numberOfDays: new FormControl('', [Validators.required, Validators.min(1)]),
    date: new FormControl('', Validators.required),
  });
  submited = signal(false);
  submittedData: { days: number; date: Date } = {
    days: 0,
    date: new Date(),
  };

  constructor() {}
  submitForm(): void {
    if (this.formGroup.valid) {
      this.submited.set(true);
      console.log(
        `Form Submited: ${this.formGroup.value.numberOfDays} and ${this.formGroup.value.date}`
      );
      this.submittedData = {
        days: Number(this.formGroup.value.numberOfDays)!,
        date: this.formGroup.value.date
          ? new Date(this.formGroup.value.date)
          : new Date(),
      };
      console.log(this.isWeekend(this.submittedData.date));
    }
  }

  isWeekend(date: Date): Boolean {
    const day = date.getDay();
    return day === 0 || day == 6;
  }

  isHoliday(date: Date): Boolean {
    const holidays2025 = [
      '2025-01-01', // New Year’s Day
      '2025-01-20', // Birthday of Martin Luther King, Jr. // Inauguration Day
      '2025-02-17', // Washington’s Birthday (aka Presidents Day)
      '2025-05-26', // Memorial Day
      '2025-06-19', // Juneteenth National Independence Day
      '2025-07-04', // Independence Day
      '2025-09-01', // Labor Day
      '2025-10-13', // Columbus Day
      '2025-11-11', // Veterans Day
      '2025-11-27', // Thanksgiving Day
      '2025-12-25', // Christmas Day
    ];
    const datestring = date.toISOString().slice(0, 10);
    return holidays2025.includes(datestring);
  }

  getDate() {
    
  }
}
