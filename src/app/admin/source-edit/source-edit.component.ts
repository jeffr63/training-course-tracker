import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';

import * as fromRoot from '../../store/reducers';
import * as sourcesActions from '../../store/actions/sources.actions';
import { Source } from '../../shared/sources';

@Component({
  selector: 'app-source-edit',
  templateUrl: './source-edit.component.html',
  styleUrls: ['./source-edit.component.scss']
})
export class SourceEditComponent implements OnInit, OnDestroy {
  source = <Source>{};
  componentActive = true;
  faSave = faSave;
  faBan = faBan;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id !== 'new') {
        this.store.dispatch(sourcesActions.getSource({ id: params.id }));
        this.store.pipe(select(fromRoot.getCurrentSource), takeWhile(() => this.componentActive))
          .subscribe((source: Source) => this.source = source);
      }
    });
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  save() {
    this.store.dispatch(sourcesActions.saveSource({ source: this.source }));
    this.location.back();
  }

}

