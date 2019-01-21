import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';

import { PathListComponent } from './path-list.component';
import * as fromRoot from '../../store/reducers';

describe('PathListComponent', () => {
  let component: PathListComponent;
  let fixture: ComponentFixture<PathListComponent>;

  beforeEach(() => {
    const ngbModalStub = { open: () => ({ result: { then: () => ({}) } }) };
    const storeStub = { dispatch: () => ({}), pipe: () => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PathListComponent],
      providers: [
        { provide: NgbModal, useValue: ngbModalStub },
        { provide: Store, useValue: storeStub }
      ]
    });

    fixture = TestBed.createComponent(PathListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
