import { Component, Renderer2, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Finders Keepers Online Marketplace';

  constructor( ) {}

  // All DOM events will be triggered by the App Component - including rputer events
  ngOnInit() {}


}
