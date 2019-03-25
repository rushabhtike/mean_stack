import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let comp: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginComponent);

      comp = fixture.componentInstance; // ContactComponent test instance
      // query for the title <h1> by CSS element selector
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
  }));

  /*it(`should have as text 'Please sign in'`, async(() => {
    expect(comp.text).toEqual('Please sign in');
  }));*/

  /*it(`should set submitted to true`, async(() => {
    comp.login();
    expect(comp.submitted).toBeTruthy();
  }));*/

  it(`should call the onSubmit method`, async(() => {
    spyOn(comp, 'login');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(comp.login).toHaveBeenCalled();
  }));

 it(`form should be invalid`, async(() => {
    comp.loginForm.controls['email'].setValue('');
    comp.loginForm.controls['password'].setValue('');
    
    expect(comp.loginForm.valid).toBeFalsy();
  }));

  it(`form should be valid`, async(() => {
    comp.loginForm.controls['email'].setValue('asd@asd.com');
    comp.loginForm.controls['password'].setValue('aada');
    
    expect(comp.loginForm.valid).toBeTruthy();
  }));
});