import {
  Component,
  Type,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ComponentFactoryResolver,
  ComponentRef,
  ChangeDetectorRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { InsertionDirective } from '../directives/insertion.directive';
import { PopupRef } from '../components/popup-ref';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements AfterViewInit, OnDestroy {
  componentRef: ComponentRef<any>;
  childComponentType: Type<any>;

  @ViewChild(InsertionDirective, {static: false}) insertionPoint: InsertionDirective;

  private readonly _onClose = new Subject<any>();
  public onClose = this._onClose.asObservable();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetector: ChangeDetectorRef,
    private popupRef: PopupRef
  ) { }

  ngAfterViewInit() {
    this._loadChildComponent(this.childComponentType);
    this.changeDetector.detectChanges();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  _onOverlayClicked(evt: MouseEvent) {
    this.popupRef.close();
  }

  _onPopupClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }

  _loadChildComponent(componentType: Type<any>) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      componentType
    );

    const viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

  close() {
    this._onClose.next();
  }
}
