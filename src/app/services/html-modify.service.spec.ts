import { TestBed } from '@angular/core/testing';
import { HtmlModifyService } from './html-modify.service';


describe('HtmlModifyService', () => {
  let service: HtmlModifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HtmlModifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
