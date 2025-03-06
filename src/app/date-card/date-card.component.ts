import { Component, signal } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-date-card',
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatError,
  ],
  templateUrl: './date-card.component.html',
  styleUrl: './date-card.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class DateCardComponent {
  formGroup = new FormGroup({
    numberOfDays: new FormControl('', [Validators.required, Validators.min(1)]),
    date: new FormControl('', Validators.required),
  });
  submited = signal(false);
  submittedData: { days: number; date: Date } = {
    days: 0,
    date: new Date(),
  };
  currentDate = new Date();
  workingDays: number = 0;
  finalResult = signal('');
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
    }
    this.currentDate = new Date(this.submittedData.date);
    this.finalResult.set(
      this.getDate(Number(this.formGroup.value.numberOfDays))
    );
    console.log(this.getDate(Number(this.formGroup.value.numberOfDays)));
    this.formGroup.reset();
  }

  isWeekend(day: Number): Boolean {
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

  getDate(numberofDays: number) {
    while (this.workingDays < numberofDays) {
      this.currentDate.setDate(this.currentDate.getDate() + 1);
      const daysOfWeek = this.currentDate.getDay();

      if (!this.isWeekend(daysOfWeek) && !this.isHoliday(this.currentDate)) {
        this.workingDays++;
      }
    }

    return this.currentDate.toLocaleDateString();
  }
}
