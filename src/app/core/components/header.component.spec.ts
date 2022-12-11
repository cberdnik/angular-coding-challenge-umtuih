import { async, TestBed } from '@angular/core/testing';
import { HeaderComponent } from 'src/app/core/components/header.component';

describe('HeaderComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HeaderComponent
            ],
        }).compileComponents();
    }));

    it('should create the component', () => {
        const fixture = TestBed.createComponent(HeaderComponent);
        const app = fixture.debugElement.componentInstance;

        expect(app).toBeTruthy();
    });
});
