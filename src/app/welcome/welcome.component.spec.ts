import { TestBed, ComponentFixture } from '@angular/core/testing';
import { WelcomeComponent } from './welcome.component';

describe('welcome.component', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
    });

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
