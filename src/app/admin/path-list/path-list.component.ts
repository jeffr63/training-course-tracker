import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faPencilAlt, faTrashAlt, faPlusCircle, faBan } from '@fortawesome/free-solid-svg-icons';

import { Path } from '../../services/paths';
import * as fromRoot from '../../store/reducers';
import * as pathsActions from '../../store/actions/paths.actions';

@Component({
  selector: 'app-path-list',
  templateUrl: './path-list.component.html',
  styleUrls: ['./path-list.component.scss']
})
export class PathListComponent implements OnInit {
  paths$: Observable<any[]>;
  selectPath = <Path>{};
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
    this.store.dispatch(new pathsActions.Load());
    this.paths$ = this.store.pipe(select(fromRoot.getPaths));
  }

  deletePath(id, deleteModal) {
    this.modal.open(deleteModal).result.then(result => {
      this.closedResult = `Closed with ${result}`;
      this.store.dispatch(new pathsActions.Delete(id));
    }, (reason) => {
      this.closedResult = `Dismissed with ${reason}`;
    });
  }

}
