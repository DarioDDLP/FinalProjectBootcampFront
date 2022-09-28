import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MailsServiceService } from 'src/app/services/mails-service.service';
import { ProductService } from 'src/app/services/product.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-merchandising',
  templateUrl: './merchandising.component.html',
  styleUrls: ['./merchandising.component.css']
})
export class MerchandisingComponent implements OnInit {

  products: any;
  token: any;
  user: any;
  categories: any;
  emailForm: FormGroup;
  admins: any;
  page!: number;

  constructor(
    private usersService: UsersServiceService,
    private productService: ProductService,
  ) {
    this.emailForm = new FormGroup({
      subject: new FormControl('', []),
      text: new FormControl('', []),
      eventInfo: new FormControl('', []),
      deliveryAddress: new FormControl('', []),
      date: new FormControl('', []),
      quantity: new FormControl('', [])
    })
  }

  async ngOnInit(): Promise<any> {
    this.token = localStorage.getItem('token');
    try {
      this.user = await this.usersService.getUser(this.token)
      this.products = await this.productService.getAll(this.token)
      this.categories = await this.productService.getCategories(this.token)
    } catch (error: any) {
      await Swal.fire({
        title: 'Fail',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Retry'
      });
    }
  }

  async changeStatus(id: number) {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure you want to delete this product?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await this.productService.changeStatus(id, this.token)
          this.products = await this.productService.getAll(this.token)
          this.categories = await this.productService.getCategories(this.token)
        } catch (err: any) {
          await Swal.fire({
            title: 'Fail',
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Retry'
          });
        }
        Swal.fire('Product Deleted!', '', 'success')
      }
    })
  }

  async sendEmail(product: any) {
    const { id } = product;
    this.emailForm.value.subject = product.title;
    if (this.emailForm.value.text.trim() === "") {
      await Swal.fire({
        title: 'Fail',
        text: 'Comment field can not be empty',
        icon: 'error',
        confirmButtonText: 'Retry'
      });
      return
    }
    try {
      await this.productService.sendEmail(id, this.token, this.emailForm.value);
      await Swal.fire({
        title: 'Success',
        text: 'Email has been sent',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (err: any) {
      await Swal.fire({
        title: 'Fail',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Retry'
      });
    }
  }

  async filterByCategory(event: any) {
    const obj = {
      category: event.target.value
    }
    if (event.target.value === "") {
      try {
        this.products = await this.productService.getAll(this.token);
      } catch (error) {
        await Swal.fire({
          title: 'Fail',
          text: 'Something went wrong',
          icon: 'error',
          confirmButtonText: 'Retry'
        });
      }
    } else {
      try {
        this.products = await this.productService.getByCategory(this.token, obj);
      } catch (error) {
        await Swal.fire({
          title: 'Fail',
          text: 'Something went wrong',
          icon: 'error',
          confirmButtonText: 'Retry'
        });
      }
    }
  }
}
