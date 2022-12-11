import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

export class TestPage<T> {
    public component: T

    constructor(public fixture: ComponentFixture<T>) {
        this.component = fixture.componentInstance;
    }

    query(css: string): DebugElement {
        return this.fixture.debugElement.query(By.css(css));
    }
}
