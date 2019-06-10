import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPencilAlt, faTrashAlt, faPlusCircle, faBan } from '@fortawesome/free-solid-svg-icons';

import * as fromRoot from '../../store/reducers';
import * as sourcesActions from '../../store/actions/sources.actions';
import { Source } from '../../shared/sources';

@Component({
  selector: 'app-source-list',
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.scss']
})
export class SourceListComponent implements OnInit {
  source$: Observable<any[]>;
  selectPath = <Source>{};
  closedResult = '';
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faPlusCircle = faPlusCircle;
  faBan = faBan;

  constructor(
    private store: Store<fromRoot.State>,
    private modal: NgbModal
  ) { }

  ngOnInit() {
    this.store.dispatch(sourcesActions.loadSources());
    this.source$ = this.store.pipe(select(fromRoot.getSources));
  }

  deleteSource(id, deleteModal) {
    this.modal.open(deleteModal).result.then(result => {
      this.closedResult = `Closed with ${result}`;
      this.store.dispatch(sourcesActions.deleteSource({ id }));
    }, (reason) => {
      this.closedResult = `Dismissed with ${reason}`;
    });
  }

}
