import { Observable, Subject } from 'rxjs';

export class PopupRef {
  constructor() {}

  private readonly _afterClosed = new Subject<any>();
  afterClosed: Observable<any> = this._afterClosed.asObservable();

  close(result?: any) {
    this._afterClosed.next(result);
  }
}
