import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentationService } from 'src/app/services/documentation.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-documentation-view',
  templateUrl: './documentation-view.component.html',
  styleUrls: ['./documentation-view.component.css']
})
export class DocumentationViewComponent implements OnInit {

  filesForm: FormGroup;
  user: any
  token: any
  file: any
  notApproved: any
  approved: any
  userDoc: any

  constructor(
    private usersService: UsersServiceService,
    private documentationService: DocumentationService
  ) {
    this.filesForm = new FormGroup({
      file: new FormControl('', [
        Validators.required
      ]),
      category_id: new FormControl('', [
        Validators.required
      ]),
      subcategory: new FormControl('', [

      ])
    });
  }

  async ngOnInit() {
    this.token = localStorage.getItem('token');
    try {
      this.user = await this.usersService.getUser(this.token);
      this.notApproved = await this.documentationService.getNotApproved(this.token);
      this.approved = await this.documentationService.getApproved(this.token);
      this.userDoc = await this.documentationService.getById(this.token, this.user.id);
    } catch (err: any) {
      await Swal.fire({
        title: 'Fail',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Retry'
      });
    }
  }

  async getDataForm() {
    let fd = new FormData();
    fd.append('document', this.file);
    fd.append('category_id', this.filesForm.value.category_id);
    fd.append('subcategory', this.filesForm.value.subcategory);
    try {
      const response = await this.documentationService.uploadDoc(this.token, fd);
      this.notApproved = await this.documentationService.getNotApproved(this.token);
      this.approved = await this.documentationService.getApproved(this.token);
      this.userDoc = await this.documentationService.getById(this.token, this.user.id);
      await Swal.fire({
        title: 'Success',
        text: 'File has been uploaded. Pending approval',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (err) {
      await Swal.fire({
        title: 'Fail',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Retry'
      });
    }
  }

  async uploadDoc($event: any) {
    this.file = $event.target.files[0]
  }

  async authorization(id: any) {
    try {
      await this.documentationService.authorization(this.token, id);
      this.notApproved = await this.documentationService.getNotApproved(this.token);
      this.approved = await this.documentationService.getApproved(this.token);
      this.userDoc = await this.documentationService.getById(this.token, this.user.id);
      await Swal.fire({
        title: 'Success',
        text: 'Document has been approved',
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

  delete(id: any) {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure you want to delete the document?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await this.documentationService.delete(this.token, id);
          this.notApproved = await this.documentationService.getNotApproved(this.token);
          this.approved = await this.documentationService.getApproved(this.token);
          this.userDoc = await this.documentationService.getById(this.token, this.user.id);
        } catch (err: any) {
          await Swal.fire({
            title: 'Fail',
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Retry'
          });
        }
        Swal.fire('Document deleted!', '', 'success')
      }
    })
  }
}
