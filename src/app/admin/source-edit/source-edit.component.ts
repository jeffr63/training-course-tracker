import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';

import { Source } from '../../services/sources';
import * as fromRoot from '../../store/reducers';
import * as sourcesActions from '../../store/actions/sources.actions';

@Component({
  selector: 'app-source-edit',
  templateUrl: './source-edit.component.html',
  styleUrls: ['./source-edit.component.scss']
})
export class SourceEditComponent implements OnInit, OnDestroy {
  source = <Source>{};
  componentActive = true;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id !== 'new') {
        this.store.dispatch(new sourcesActions.Get(params.id));
        this.store.pipe(select(fromRoot.getCurrentSource), takeWhile(() => this.componentActive))
          .subscribe((source: Source) => this.source = source);
      }
    });
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  save() {
    this.store.dispatch(new sourcesActions.Save(this.source));
    this.location.back();
  }

}

