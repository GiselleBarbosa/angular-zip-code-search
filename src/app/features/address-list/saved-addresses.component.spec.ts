import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedAddressesComponent } from './saved-addresses.component';

describe('AddressListComponent', () => {
  let component: SavedAddressesComponent;
  let fixture: ComponentFixture<SavedAddressesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SavedAddressesComponent],
    });
    fixture = TestBed.createComponent(SavedAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
