import { TestBed, inject } from '@angular/core/testing';

import { TagService } from './tag.service';
import { Tag } from '../models/tag.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_CONFIG, FKConfig } from '../../../app.config';

describe('TagService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule],
      providers: [TagService,
        { provide: APP_CONFIG, useValue: FKConfig }
      ]
    });
  });

  it('should be created', inject([TagService], (service: TagService) => {
    expect(service).toBeTruthy();
  }));
  it('should set and find Selected tags', inject([TagService], (service: TagService) => {
    // Should we check that the selected category exists in our model?
    // Even when filtered? There is an inherent decoupling here. Which may not be bad
    // Until you attempt to delete the wrong key.

    // Not working as expected - we want the lesser not the double up TODO
    // Could just suck it up and use annotations on base classes
    // Or fix the constructor logic - kind of crappy type instantiation atm
    const selTags: Tag[] = [{ name: 'A', id: 1, foreignId: 0, foreignType: 'product', slug: '', suggest: '1', count: 0 },
      { name: 'B', id: 2, foreignId: 0, foreignType: 'product', slug: '', suggest: '1', count: 0 }];
    service.initList(selTags);
    expect(service.getAllFromList().length).toBe(2);
    expect(service.getAllFromList()[0].name).toEqual('A');
    expect(service.getAllFromList()[1].name).toEqual('B');
    expect(service.hasItem(1)).toBeTruthy();
    expect(service.hasItem(3)).toBeFalsy();
    expect(service.getItem(1)).toEqual(selTags[0]);
    expect(service.getItem(2)).toEqual(selTags[1]);

  }));
  it('should set add and remove tags', inject([TagService], (service: TagService) => {

    // Should we check that the selected category exists in our model?
    // Even when filtered? There is an inherent decoupling here. Which may not be bad
    // Until you attempt to delete the wrong key.
    const selTags: Tag[] = [{ name: 'A', id: 1, foreignId: 0, foreignType: 'product', slug: '', suggest: '1', count: 0 },
    { name: 'B', id: 2, foreignId: 0, foreignType: 'product', slug: '', suggest: '1', count: 0 }];
    service.initList(selTags);
    expect(service.getAllFromList().length).toBe(2);

    expect(service.addToList(new Tag(4, 4, 'product', 'blah'))).toBeTruthy();
    expect(service.getAllFromList()[2].name).toBe('blah');
    expect(service.getAllFromList().length).toBe(3);

    expect(service.deleteFromList(1)).toBeTruthy();
    expect(service.getAllFromList().length).toBe(2);
    expect(service.getAllFromList()[0].name).toBe('B');
  }));

  it('should only add a tag ID once', inject([TagService], (service: TagService) => {
    const selTags: Tag[] = [{ name: 'A', id: 1, foreignId: 0, foreignType: 'product', slug: '', suggest: '1', count: 0 },
    { name: 'B', id: 2, foreignId: 0, foreignType: 'product', slug: '', suggest: '1', count: 0 }];
    service.initList(selTags);
    expect(service.getAllFromList().length).toBe(2);

    expect(service.addToList(new Tag(1, 1, 'product', 'blah'))).toBeFalsy();
    expect(service.getAllFromList().length).toBe(2);
  }));

  it('should not remove and return false when a tag ID is not found Q',
    inject([TagService], (service: TagService) => {
      const selTags: Tag[] = [{ name: 'A', id: 1, foreignId: 0, foreignType: 'product', slug: '', suggest: '1', count: 0 },
      { name: 'B', id: 2, foreignId: 0, foreignType: 'product', slug: '', suggest: '1', count: 0 }];
      service.initList(selTags);
      expect(service.getAllFromList().length).toBe(2);

      expect(service.deleteFromList(3)).toBeFalsy();
      expect(service.getAllFromList().length).toBe(2);
    }));
});
