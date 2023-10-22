import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YoutubePage } from './youtube.page';

describe('YoutubePage', () => {
  let component: YoutubePage;
  let fixture: ComponentFixture<YoutubePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(YoutubePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
