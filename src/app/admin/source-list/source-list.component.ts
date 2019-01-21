import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Source } from './../../services/sources';
import * as fromRoot from '../../store/reducers';
import * as sourcesActions from '../../store/actions/sources.actions';

@Component({
  selector: 'app-source-list',
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.scss']
})
export class SourceListComponent implements OnInit {
  source$: Observable<any[]>;
  selectPath = <Source>{};
  closedResult = '';

  constructor(
    private store: Store<fromRoot.State>,
    private modal: NgbModal
  ) { }

  ngOnInit() {
    this.store.dispatch(new sourcesActions.Load());
    this.source$ = this.store.pipe(select(fromRoot.getSources));
  }

  deleteSource(id, deleteModal) {
    this.modal.open(deleteModal).result.then(result => {
      this.closedResult = `Closed with ${result}`;
      this.store.dispatch(new sourcesActions.Delete(id));
    }, (reason) => {
      this.closedResult = `Dismissed with ${reason}`;
    });
  }

}
