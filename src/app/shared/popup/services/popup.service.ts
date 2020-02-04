import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  ComponentRef,
  Type
} from '@angular/core';
import { PopupModule } from '../popup.module';
import { PopupComponent } from '../components/popup.component';
import { PopupConfig } from '../components/popup-config';
import { PopupRef } from '../components/popup-ref';
import { PopupInjector } from '../components/popup-injector';

@Injectable({
  providedIn: PopupModule
})
export class PopupService {
  popupComponentRef: ComponentRef<PopupComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  public open(componentType: Type<any>, config?: PopupConfig) {
    let popupRef;
    if (config) {
      popupRef = this.appendPopupComponentToBody(config);
    } else { popupRef = this.appendPopupComponentToBody({}); }



    this.popupComponentRef.instance.childComponentType = componentType;
    return popupRef;
  }

  public close() {
    this.removePopupComponentFromBody();
  }

  appendPopupComponentToBody(config: PopupConfig) {
    const map = new WeakMap();
    map.set(PopupConfig, config);

    const popupRef = new PopupRef();
    map.set(PopupRef, popupRef);

    const sub = popupRef.afterClosed.subscribe(() => {
      this.removePopupComponentFromBody();
      sub.unsubscribe();
    });

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      PopupComponent
    );
    const componentRef = componentFactory.create(
      new PopupInjector(this.injector, map)
    );

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.popupComponentRef = componentRef;

    this.popupComponentRef.instance.onClose.subscribe(() => {
      this.removePopupComponentFromBody();
    });

    return popupRef;
  }

  public isOpen() {
    return document.getElementsByClassName('popup').length != 0;
  }

  private removePopupComponentFromBody() {
    try { this.appRef.detachView(this.popupComponentRef.hostView); } catch (err) { }
    try { this.popupComponentRef.destroy(); } catch (err) { }
  }
}
