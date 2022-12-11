import { async, TestBed } from '@angular/core/testing';
import { WelcomeComponent } from 'src/app/features/welcome/welcome.component';

describe('WelcomeComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
           declarations: [
                WelcomeComponent
            ],
        }).compileComponents();
    }));

    it('should create the component', () => {
        const fixture = TestBed.createComponent(WelcomeComponent);
        const app = fixture.debugElement.componentInstance;

        expect(app).toBeTruthy();
    });


    it('should display correct message in a h1 tag', async () => {
        const fixture = TestBed.createComponent(WelcomeComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        expect(compiled.querySelector('h1').textContent).toContain('Welcome Christian');
    });
});
