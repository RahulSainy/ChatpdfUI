// customize form-data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private formData: any = {
    'chat-heading': '',
    'color': '',
    'welcome-message': '',
    'error-message': '',
    'availability': 'always',
    'channels': [],
  };

  getFormData() {
    return this.formData;
  }

  setFormData(formData: any) {
    this.formData = formData;
  }
}
