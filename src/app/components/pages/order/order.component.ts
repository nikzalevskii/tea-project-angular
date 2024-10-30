import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpServiceService} from "../../../services/http-service.service";
import {Subscription} from "rxjs";
import {CustomValidators} from "../../../shared/custom-validators";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  isError:boolean = false;
  orderForm!: FormGroup;
  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;
  public isOrdered:boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private httpService: HttpServiceService, private activatedRoute: ActivatedRoute) {
    this.orderForm = this.fb.group({
      name: ['', {
        validators: [Validators.required, CustomValidators.nameValidator],
        updateOn: 'blur'
      }],
      last_name: ['', {
        validators: [Validators.required, CustomValidators.nameValidator],
        updateOn: 'blur'
    }],
      phone: ['', {
        validators: [Validators.required, CustomValidators.phoneValidator],
        updateOn: 'blur'
    }],
      country: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      product: ['', [Validators.required]],
      address: ['', {
        validators: [Validators.required, CustomValidators.addressValidator],
        updateOn: 'blur'
      }],
      comment: [''],
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
  }

  ngOnInit(): void {
    this.isOrdered = false;
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product_title']) {
        this.orderForm.patchValue({
          product: params['product_title']
        })
      }
    })

  }

  public createOrder() {
    this.subscriptionOrder = this.httpService.createOrder({
      name: this.orderForm.value.name,
      last_name: this.orderForm.value.last_name,
      phone: this.orderForm.value.phone,
      country: this.orderForm.value.country,
      zip: this.orderForm.value.zip,
      product: this.orderForm.value.product,
      address: this.orderForm.value.address,
      comment: this.orderForm.value.comment,
    })
      .subscribe({
        next: (response) => {
          if (response && response.success) {
            console.log(response.success);
            this.isOrdered = true;
          } else {
            alert('Ошибка');
          }
        },
        error: (error) => {
          this.isError = true;
          this.orderForm.reset();
          setTimeout(() => {
            this.isError = false;
          }, 3000)
        }
      })
  }

  get name() { return this.orderForm.get('name'); }
  get lastName() { return this.orderForm.get('last_name'); }
  get phone() { return this.orderForm.get('phone'); }
  get country() { return this.orderForm.get('country'); }
  get zip() { return this.orderForm.get('zip'); }
  get address() { return this.orderForm.get('address'); }
  get comment() { return this.orderForm.get('comment'); }

}
