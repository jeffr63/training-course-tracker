import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';

import { Path } from '../../services/paths';
import * as fromRoot from '../../store/reducers';
import * as pathsActions from '../../store/actions/paths.actions';

@Component({
  selector: 'app-path-edit',
  templateUrl: './path-edit.component.html',
  styleUrls: ['./path-edit.component.scss']
})
export class PathEditComponent implements OnInit, OnDestroy {
  path = <Path>{};
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
        this.store.dispatch(new pathsActions.Get(params.id));
        this.store.pipe(select(fromRoot.getCurrentPath), takeWhile(() => this.componentActive))
          .subscribe((path: Path) => this.path = path);
      }
    });
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  save() {
    this.store.dispatch(new pathsActions.Save(this.path));
    this.location.back();
  }

}
