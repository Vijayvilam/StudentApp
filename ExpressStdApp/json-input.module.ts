import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

export class Hero {
    id: number;
    name: string;
}

@Component({
    selector: 'my-app',
    template: `
      <h1>NgModel</h1>
      <form #form="ngForm">
        <json-input [(ngModel)]="result" name="result"></json-input>
      </form>
      
      <p>form is valid: {{ form.valid ? 'true' : 'false' }}</p>
      
      <p>Value:</p>
      <pre>{{ result | json }}</pre>
      
      <h1>Reactive Form</h1>
      
      <form [formGroup]="reactiveForm">
        <json-input formControlName="result"></json-input>
      </form>
      
      <p>form is valid: {{ reactiveForm.valid ? 'true' : 'false' }}</p>
      
      <p>Value:</p>
      <pre>{{ reactiveForm.value | json }}</pre>
    `
})
export class AppComponent {

    public result = {};
    public reactiveForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.result = { "hello": "world" };

        this.reactiveForm = this.fb.group({
            result: [{ "test123": "test456" }]
        })
    }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/