import { Component, OnInit } from '@angular/core';
import { TagService } from '../../services/tag.service';
import { Tag } from '../../models/tag.model';

@Component({
  selector: 'app-tag-search',
  templateUrl: './tag-search.component.html',
  styleUrls: ['./tag-search.component.scss']
})
export class TagSearchComponent implements OnInit {
  private _productTagKey = 'product';
  public searchableTags: Tag[] = [];

  constructor(private service: TagService) { }

  ngOnInit() {
    this.getTags();
  }

  getTags() {
    this.service.getTagsForType(this._productTagKey).subscribe(
      tags => this.searchableTags = tags
    );
  }
}
