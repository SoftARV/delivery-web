import { PopupComponent } from '../components/popup.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

describe('Modal Component', () => {
  let component: PopupComponent;
  let el: DebugElement;
  let spies;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: []
    });
  });

  beforeEach(() => {
    loadMocks();
    loadSpies();
  });

  beforeEach(() => {});

  it('should create', () => {
    expect(component).toBeDefined();
  });

  function loadMocks() {}

  function loadSpies() {
    spies = {};
  }
});
