import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SourcesEffects } from './sources.effects';

describe('SourcesEffects', () => {
  let actions$: Observable<any>;
  let effects: SourcesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SourcesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(SourcesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
