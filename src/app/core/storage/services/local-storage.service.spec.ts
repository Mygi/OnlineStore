import { TestBed, inject } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';
import { TestModel } from './cookie-storage.service.spec';
describe('ClientStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });
  });

  it('should be created', inject([LocalStorageService], (service: LocalStorageService) => {
    expect(service).toBeTruthy();
  }));
  it('should add and remove string values', inject([LocalStorageService], (service: LocalStorageService) => {
    service.setKeyValue('someKey', 'Data');
    expect(service.getKeyValue('someKey')).toEqual('Data');

    expect(service.getKeyValue('emptyKey')).toEqual(null);

    service.deleteKey('someKey');
    expect(service.getKeyValue('someKey')).toEqual(null);
  }));

  it('should add and remove object values', inject([LocalStorageService], (service: LocalStorageService) => {
    const data: any = { A: 'blah', B: 234, C: true };
    service.setObjectValue('someKey', data);
    expect(service.getKeyObjectValue('someKey')).toEqual(data);

    expect(service.getKeyObjectValue('emptyKey')).toBeNull();

    service.deleteKey('someKey');
    expect(service.getKeyObjectValue('someKey')).toBeNull();
  }));

  it('should add and remove Array values', inject([LocalStorageService], (service: LocalStorageService) => {
    const data = [
      { A: 'blah', B: 234, C: true },
      { A: 'blah', B: 234, C: true },
      { A: 'blah', B: 234, C: true }
    ];
    service.setObjectValue('someKey', data);
    expect(service.getKeyObjectValue('someKey')).toEqual(data);

    expect(service.getKeyObjectValue('emptyKey')).toBeNull();

    service.deleteKey('someKey');
    expect(service.getKeyObjectValue('someKey')).toBeNull();
  }));

  it('should add and clear Array, String and object values', inject([LocalStorageService], (service: LocalStorageService) => {
    const data = [
      { A: 'blah', B: 234, C: true },
      { A: 'blah', B: 234, C: true },
      { A: 'blah', B: 234, C: true }
    ];

    const data2: any = { A: 'blah', B: 234, C: true };
    service.setKeyValue('someKey', 'Data');
    service.setObjectValue('someKey1', data);
    service.setObjectValue('someKey2', data2);

    expect(service.getKeyObjectValue('someKey1')).toEqual(data);
    expect(service.getKeyObjectValue('someKey2')).toEqual(data2);
    expect(service.getKeyValue('someKey')).toEqual('Data');
    expect(service.getKeyObjectValue('emptyKey')).toBeNull();

    service.clearData();
    expect(service.getKeyValue('someKey')).toBeNull();
    expect(service.getKeyObjectValue('someKey1')).toBeNull();
    expect(service.getKeyObjectValue('someKey2')).toBeNull();
  }));


  it('should return null when JSON Parse fails', inject([LocalStorageService], (service: LocalStorageService) => {
    const data = 'text';

    service.setKeyValue('someKey', data);

    expect(service.getKeyObjectValue('someKey')).toBeNull();
    service.deleteKey('someKey');
  }));

  it('will return Json but not equivalent objects', inject([LocalStorageService], (service: LocalStorageService) => {
    const data: TestModel = new TestModel('name', 16, [1, 2, 3, 4, 5]);

    service.setObjectValue('someKey', data);

    expect(service.getKeyObjectValue('someKey').name).toEqual(data.name);

    const tempResult = service.getKeyObjectValue('someKey');
    expect(tempResult).not.toEqual(data);
    const data2: TestModel = new TestModel(tempResult.name, tempResult.value, tempResult.data);

    expect(data2).toEqual(data);
    service.deleteKey('someKey');
  }));

  it('will suport Json deserialisation into equivalent objects', inject([LocalStorageService], (service: LocalStorageService) => {
    const data: TestModel = new TestModel('name', 16, [1, 2, 3, 4, 5]);

    service.setObjectValue('someKey', data);

    expect(service.getKeyObjectValue('someKey').name).toEqual(data.name);

    const tempResult = service.getKeyObjectValue('someKey');
    expect(service.deserialiseJson(tempResult, TestModel)).toEqual(data);

    service.deleteKey('someKey');
  }));

  it('will return false when attempting to add null values', inject([LocalStorageService], (service: LocalStorageService) => {
  const data: TestModel = null;

  expect(service.setObjectValue('someKey', data)).toBeFalsy();
  // this is a false truth! But worth keeping to demonstrate like-for-like behavior is epxected.
  expect(service.getKeyObjectValue('someKey')).toBeNull();

  const str: string = null;
  expect(service.setKeyValue('someKey', str)).toBeFalsy();
}));
});
