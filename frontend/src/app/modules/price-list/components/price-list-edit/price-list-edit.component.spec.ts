import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import {RestrictedExtErpIdDirective} from './restricted-ext-erp-id.directive'
import { PriceListEditComponent } from './price-list-edit.component';

describe('PriceListEditComponent', () => {
  let component: PriceListEditComponent;
  let fixture: ComponentFixture<PriceListEditComponent>;
  let debugElement: DebugElement;
  let formElem: DebugElement
  let formControl: NgForm
  
  /**
   * Gets form control or undefined
   * @param name form control name
   * @returns FormControl
   */
   function getFormControl(name:string) {
    return formControl && formControl.form.get(name)
  }

  /**
   * Returns form error nativeElement for given field
   * @param fieldName
   */
  function getFormError(fieldName:string) {
    const elem = fixture.debugElement.query(
      By.css(`.form-${fieldName}-error`)
    )
    return elem && elem.nativeElement
  }

  /**
   * @returns Array<String> array of form field names
   */
  function getFormFieldNames() {
    return formControl && Object.keys(formControl.form.controls)
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        PriceListEditComponent,
        RestrictedExtErpIdDirective
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement
    formElem = debugElement.query(By.directive(NgForm))
    formControl = formElem && formElem.injector.get(NgForm)
  });

  beforeEach((done) => {
    fixture.whenStable().then(done)
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has a form control', () => {
    let formElem = debugElement.query(By.directive(NgForm))
    let formControl = formElem && formElem.injector.get(NgForm)
    expect(formControl).toBeTruthy('form should have NgForm control')
  })
  it('has "priceListName" form control', () => {
    expect(getFormFieldNames()).toContain('priceListName', 'Missing NgModel or FormControl')
  })

  it('should validate priceListName is required', () => {
    // get control
    let control = getFormControl('priceListName')

    // expect invalid
    expect(control && control.valid).toBeFalsy('priceListName invalid when empty')

    // set value
    control && control.setValue('value')
    // expect valid
    expect(control && control.valid).toBeTruthy('priceListName valid when not empty')
  })

  it('should validate extErpPriceListID is correct', () => {
    // get control
    let control = getFormControl('extErpPriceListID')

    control && control.setValue('test')
    // expect invalid
    expect(control && control.valid).toBeFalsy('extErpPriceListID should be invalid')

    // set value
    control && control.setValue('2312')
    // expect valid
    expect(control && control.valid).toBeTruthy('extErpPriceListID should be valid')
  })
});
