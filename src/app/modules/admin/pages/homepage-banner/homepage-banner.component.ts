import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage-banner',
  templateUrl: './homepage-banner.component.html',
  styleUrls: ['./homepage-banner.component.scss']
})
export class HomepageBannerComponent implements OnInit {

  public status = false;
  
  constructor() { }

  ngOnInit() {
  }

}
