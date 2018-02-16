import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    var idQuiz = this.route.snapshot.params.id;
    console.log("id quiz = ", idQuiz);
  }

}
