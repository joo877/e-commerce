import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgrtpasswordComponent } from './forgrtpassword.component';

describe('ForgrtpasswordComponent', () => {
  let component: ForgrtpasswordComponent;
  let fixture: ComponentFixture<ForgrtpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgrtpasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgrtpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
