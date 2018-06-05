import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {

  @Input() badgeClass = '';
  @Input() itemNumber = 0;
  @Input() badgeIcon = '';
  @Input() url = '';
  constructor() { }

  ngOnInit() {
  }

}
