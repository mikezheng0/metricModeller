import { Component, OnInit } from '@angular/core';

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
      complexityValues: {
        "simple": 3,
        "average": 4,
        "complex": 6
      }
    }, {
      viewValue: "Number of User Outputs",
      name: "userOutputs",
      complexityName: "userOutputsComp",
      complexityValues: {
        "simple": 4,
        "average": 5,
        "complex": 7
      }
    }, {
      viewValue: "Number of User Inquiries",
      name: "userInquiries",
      complexityName: "userInquiriesComp",
      complexityValues: {
        "simple": 3,
        "average": 4,
        "complex": 6
      }
    }, {
      viewValue: "Number of Files",
      name: "noOfFiles",
      complexityName: "noOfFilesComp",
      complexityValues: {
        "simple": 7,
        "average": 10,
        "complex": 15
      }
    }, {
      viewValue: "Number of External Interfaces",
      name: "extInterfaces",
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

  showResult: boolean = false;
  constructor() {

  }

  ngOnInit() {
  }

  onSubmit(mainForm) {
    if (mainForm.form.valid)
      this.showResult = true;
  }
  totalAnswer(questions) {
    let total = 0;
    for (let i = 0; i < questions.length; i++) {
      let subtotal = questions[i].complexityValues[questions[i].complexity] * questions[i].answer
      if (!isNaN(subtotal)) {
        total += subtotal;
      }
    }
    return total
  }

}
