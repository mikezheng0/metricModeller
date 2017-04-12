import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { LanguageService } from './language.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  questions = [
    {
      viewValue: "Number of User Inputs",
      name: "userinputs",
      complexityName: "userinputsComp",
      complexity:"",
      answer:null,
      complexityValues: {
        "simple": 3,
        "average": 4,
        "complex": 6
      }
    }, {
      viewValue: "Number of User Outputs",
      name: "userOutputs",
      complexity:"",
      answer:null,
      complexityName: "userOutputsComp",
      complexityValues: {
        "simple": 4,
        "average": 5,
        "complex": 7
      }
    }, {
      viewValue: "Number of User Inquiries",
      name: "userInquiries",
      complexity:"",
      answer:null,
      complexityName: "userInquiriesComp",
      complexityValues: {
        "simple": 3,
        "average": 4,
        "complex": 6
      }
    }, {
      viewValue: "Number of Files",
      name: "noOfFiles",
      complexity:"",
      answer:null,
      complexityName: "noOfFilesComp",
      complexityValues: {
        "simple": 7,
        "average": 10,
        "complex": 15
      }
    }, {
      viewValue: "Number of External Interfaces",
      name: "extInterfaces",
      complexity:"",
      answer:null,
      complexityName: "extInterfacesComp",
      complexityValues: {
        "simple": 5,
        "average": 7,
        "complex": 10
      }
    }
  ];

  complexities = [
    { value: 'simple', viewValue: 'Simple' },
    { value: 'average', viewValue: 'Average' },
    { value: 'complex', viewValue: 'Complex' }
  ];

  projectModes = [
    {
      viewValue: "Organic",
      value: "organic",
      calc: {
        a: 2.4,
        b: 1.05,
        c: 2.5,
        d:0.38
      }
    },{
      viewValue: "Semi Detached",
      value: "semidetached",
      calc: {
        a: 3.0,
        b: 1.12,
        c: 2.5,
        d: 0.35
      }
    },{
      viewValue: "Embedded",
      value: "embedded",
      calc: {
        a: 3.6,
        b: 1.2,
        c: 2.5,
        d: 0.32
      }
    }
  ]

  showResult: boolean = false;

  languages: any[];

  filteredLanguages: any[];

  calculatedValues : any;

  language: any;

  selectedMode: any;

  selectedUserDocs: boolean;

  selectedTesting: boolean;
  constructor (private http: Http, private service:  LanguageService) {

  }

  ngOnInit( ) {
    this.service.getLanguages()
      .subscribe(res => this.languages = res);
  }

  displayFn(user: any): string {
      return user ? user.name : user;
  }

  getCalculations() {
    let mode;
    for (let i = 0; i <this.projectModes.length; i++) {
      if(this.projectModes[i].value === this.selectedMode)
        mode = this.projectModes[i].calc;
    }


    let questions = [

    ]

    for(let i = 0; i < this.questions.length;i++) {
      let questionAnswer = this.questions[i].answer;
      let value = this.questions[i].complexityValues[this.questions[i].complexity] * questionAnswer;
      questions.push({
        question: this.questions[i].viewValue,
        answer: questionAnswer,
        complexity: this.questions[i].complexity,
        complexityValue : this.questions[i].complexityValues[this.questions[i].complexity],
        total: value
      });
    }

    if(this.selectedUserDocs) {
      questions[0].total += 2;
      questions[2].total += 2;
      questions[4].total += 2;
    }
    let finalTotal = this.totalAnswer(questions);
    let adjustedTotal = null;
    if(this.selectedTesting) {
      adjustedTotal = finalTotal * 0.1;
      finalTotal = finalTotal - adjustedTotal;
    }

    let linesOfCode = this.totalAnswer(questions)*0.66*this.language.average;
    let effortApplied = mode.a * Math.pow((linesOfCode/1000),mode.b);
    let developmentTime = mode.c * Math.pow(effortApplied,mode.d);
    let peopleRequired = effortApplied/developmentTime;
    let cost = 15 * peopleRequired * (developmentTime*160);
    this.calculatedValues = {
      total: finalTotal,
      adjustedTotal: adjustedTotal,
      linesOfCode: linesOfCode,
      effortApplied: effortApplied,
      developmentTime: developmentTime,
      peopleRequired: peopleRequired,
      questions: questions,
      cost: cost
    }

  }

  filterLanguages (val : string) {
    return val ? this.languages.filter((s:any) => {return new RegExp(`^${val}`, 'gi').test(s.name);}) : this.languages;
  }

  onSubmit(mainForm) {
    if (mainForm.form.valid){
      this.getCalculations()
      this.showResult = true;
    }
  }

  totalAnswer(questions) {
    let total = 0;
    for (let i = 0; i < questions.length; i++) {
      let subtotal = questions[i].total;
      if (!isNaN(subtotal)) {
        total += subtotal;
      }
    }
    return total
  }


}
