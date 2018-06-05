import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TagService } from '../../services/tag.service';
import { Observable } from 'rxjs';
import { Tag } from '../../models/tag.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.scss']
})
export class TagFormComponent implements OnInit {
  private _productTagKey = 'product';

  constructor(private service: TagService) { }
  @Input() item: Tag[] = [];
  @Output() updated = new EventEmitter<Tag[]>();

  ngOnInit() {
    this.service.initList(this.item);
  }
  updateTags(event: any) {
    this.updated.emit(this.item);
    // console.log(this.item);
    // console.log(this.service.getAllFromList());
  }
  public getTags = (text: string): Observable<Tag[]> => {
    return this.service.getTagsForType(this._productTagKey);
  }
}
