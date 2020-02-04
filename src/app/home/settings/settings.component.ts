import { Component, OnInit } from '@angular/core';
import { PopupRef } from 'src/app/shared/popup/components/popup-ref';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShoppingService } from '../services/shopping.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settingsForm: FormGroup;

  phoneRegex: RegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g;

  constructor(private ref: PopupRef, private shoppingService: ShoppingService, private toastr: ToastrService) {
    this.settingsForm = new FormGroup({
      address: new FormGroup({
        street: new FormControl(this.shoppingService.getUserInfo.address.street, Validators.required),
        number: new FormControl(this.shoppingService.getUserInfo.address.number),
        name: new FormControl(this.shoppingService.getUserInfo.address.name)
      }),
      name: new FormControl(this.shoppingService.getUserInfo.name, Validators.required),
      phone: new FormControl(this.shoppingService.getUserInfo.phone, [Validators.required, Validators.pattern(this.phoneRegex)])
    });
  }

  ngOnInit() {
  }

  close() {
    this.ref.close();
  }

  save() {
    const userInfo = {
      name: this.settingsForm.controls.name.value,
      phone: this.settingsForm.controls.phone.value,
      address: {
        street: (this.settingsForm.get('address') as FormGroup).controls.street.value,
        number: (this.settingsForm.get('address') as FormGroup).controls.number.value,
        name: (this.settingsForm.get('address') as FormGroup).controls.name.value
      }
    };
    this.shoppingService.saveUserInfo = userInfo;
    this.toastr.success('Information Set!');
    this.ref.close();
  }

}
