import { TestBed } from '@angular/core/testing';

import { ResourceCalendarService } from './resource-calendar.service';

describe('ResourceCalendarService', () => {
  let service: ResourceCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
