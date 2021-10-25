import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHistoryDetailComponent } from './admin-history-detail.component';

describe('AdminHistoryDetailComponent', () => {
  let component: AdminHistoryDetailComponent;
  let fixture: ComponentFixture<AdminHistoryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHistoryDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHistoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
