import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.css']
})
export class ProductRegisterComponent implements OnInit {

  newProductForm: FormGroup;
  files: any;
  token: any;

  constructor(
    private router: Router,
    private productService: ProductService
  ) {
    this.newProductForm = new FormGroup({
      title: new FormControl('', []),
      photo: new FormControl('', []),
      description: new FormControl('', []),
      category: new FormControl('', [])
    })
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
  }

  async getDataForm() {
    let fd = new FormData();
    fd.append('photo', this.files);
    fd.append('title', this.newProductForm.value.title);
    fd.append('description', this.newProductForm.value.description);
    fd.append('category', this.newProductForm.value.category);
    try {
      await this.productService.createProduct(fd, this.token);
      this.router.navigate(['/dashboard', 'merchandising'])
    } catch (error) {
      await Swal.fire({
        title: 'Fail',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Retry'
      });
    }
  }

  onChange($event: any) {
    this.files = $event.target.files[0];
  }
}
