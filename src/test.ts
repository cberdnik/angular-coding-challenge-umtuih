import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import './app/welcome/welcome.component.spec.ts';

// The TestBed creates a dynamically-constructed Angular test module that emulates an Angular @NgModule
getTestBed().resetTestEnvironment();

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
