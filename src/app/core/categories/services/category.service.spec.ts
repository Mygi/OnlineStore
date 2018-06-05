// Core Http client support
import { HttpClient, HttpErrorResponse, HttpBackend } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// Test components
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, } from '@angular/core/testing';

// Classes under test
import { CategoryService } from './category.service';
import { Category } from '../models/categories.model';
import { CategoryList } from '../models/category-list.model';

// Config
import { APP_CONFIG, FKConfig } from '../../../app.config';

describe('CategoryService', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let service: CategoryService;

  // setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CategoryService,
        { provide: APP_CONFIG, useValue: FKConfig }
      ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(CategoryService);
  });

  // Tear down
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return empty Categories', async() => {
    const categories: Category[] = [];

    service.getCategories().subscribe( res => {
      // expect(res.length).toBe(2);
      expect(res).toEqual(categories);
    });
    // console.log(service.getServiceUrl());
    const req = httpTestingController.expectOne(`${service.getServiceUrl()}`);
    expect(req.request.method).toBe('GET');
    req.flush(categories);
  });
});
