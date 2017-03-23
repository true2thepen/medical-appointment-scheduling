import { Component }   from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'insert-test-examinations-dialog',
  template: `
    <h1 i18n md-dialog-title>Insert examinations</h1>
    <div md-dialog-content>
      <md-select #examinationSelect placeholder="Examination group" required="true">
        <md-option *ngFor="let group of examinationGroups" [value]="group.sectionNumber">
          {{ group.title }}
        </md-option>
      </md-select>
    </div>
    <div md-dialog-actions>
      <button i18n md-button (click)="dialogRef.close()">CANCEL</button>
      <button i18n md-button [disabled]="!examinationSelect.selected"
        (click)="dialogRef.close({
          sectionNumber: examinationSelect.selected.value,
          sectionTitle: examinationSelect.selected.viewValue
        })"
      >OK</button>
    </div>
  `,
  styles: [`
    .mat-select {
      width: 300px;
      margin-top: 24px;
      margin-bottom: 24px;
    }
    /deep/ .mat-select-panel { max-width: unset !important; }
    h1 { font-family: "Roboto"; }
  `]
})
export class InsertTestExaminationsDialogComponent {

  public examinationGroups = [
    {
      sectionNumber: '0',
      title: 'Procedures And Interventions, Not Elsewhere Classified'
    },
    {
      sectionNumber: '1',
      title: 'Operations On The Nervous System'
    },
    {
      sectionNumber: '2',
      title: 'Operations On The Endocrine System'
    },
    {
      sectionNumber: '3',
      title: 'Operations On The Eye'
    },
    {
      sectionNumber: '3A',
      title: 'Other Miscellaneous Diagnostic And Therapeutic Procedures'
    },
    {
      sectionNumber: '4',
      title: 'Operations On The Ear'
    },
    {
      sectionNumber: '5',
      title: 'Operations On The Nose, Mouth, And Pharynx'
    },
    {
      sectionNumber: '6',
      title: 'Operations On The Respiratory System'
    },
    {
      sectionNumber: '7',
      title: 'Operations On The Cardiovascular System'
    },
    {
      sectionNumber: '8',
      title: 'Operations On The Hemic And Lymphatic System'
    },
    {
      sectionNumber: '9',
      title: 'Operations On The Digestive System'
    },
    {
      sectionNumber: '10',
      title: 'Operations On The Urinary System'
    },
    {
      sectionNumber: '11',
      title: 'Operations On The Male Genital Organs'
    },
    {
      sectionNumber: '12',
      title: 'Operations On The Female Genital Organs'
    },
    {
      sectionNumber: '13',
      title: 'Obstetrical Procedures'
    },
    {
      sectionNumber: '14',
      title: 'Operations On The Musculoskeletal System'
    },
    {
      sectionNumber: '15',
      title: 'Operations On The Integumentary System'
    },
    {
      sectionNumber: '16',
      title: 'Miscellaneous Diagnostic And Therapeutic Procedures'
    }
  ];

  constructor(public dialogRef: MdDialogRef<InsertTestExaminationsDialogComponent>) {}
}
