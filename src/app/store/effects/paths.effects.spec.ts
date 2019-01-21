import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PathsEffects } from './paths.effects';

describe('PathsEffects', () => {
  let actions$: Observable<any>;
  let effects: PathsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PathsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(PathsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
