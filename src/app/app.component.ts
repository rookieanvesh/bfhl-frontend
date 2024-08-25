import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{ rollNumber }}</h1>
    <div>
      <textarea [(ngModel)]="inputJson" placeholder="Enter JSON here"></textarea>
      <button (click)="submitJson()">Submit</button>
    </div>
    <div *ngIf="error" style="color: red;">{{ error }}</div>
    <div *ngIf="response">
      <h2>Response:</h2>
      <pre>{{ formattedResponse }}</pre>
    </div>
  `
})
export class AppComponent {
  rollNumber = '21BCE10945'; // Replace with your actual roll number
  inputJson = '';
  error = '';
  response: any;
  formattedResponse = '';

  constructor(private http: HttpClient) {}

  submitJson() {
    try {
      const parsedJson = JSON.parse(this.inputJson);
      this.http.post('https://BfhlChallengeApplication.onrender.com/bfhl', parsedJson).subscribe(
        (response: any) => {
          this.response = response;
          this.error = '';
          this.formatResponse();
        },
        (error) => {
          this.error = 'Error processing request: ' + error.message;
          this.response = null;
          this.formattedResponse = '';
        }
      );
    } catch (e) {
      this.error = 'Invalid JSON input';
      this.response = null;
      this.formattedResponse = '';
    }
  }

  formatResponse() {
    if (this.response) {
      this.formattedResponse = JSON.stringify(this.response, null, 2);
    } else {
      this.formattedResponse = '';
    }
  }
}
