import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { FormDataService } from 'src/app/Service/FormDataService';

@Component({
  selector: 'app-setup-form',
  templateUrl: './setup-form.component.html',
  styleUrls: ['./setup-form.component.css']
})
export class SetupFormComponent implements OnInit {
  selectedOption!: string;
  selectedColor: string = 'gradient1'; // Default color
  userFile: File | null = null; // To store the uploaded PDF file
  submitted: boolean = false; // For showing submission confirmation

  constructor(
    private route: ActivatedRoute,
    private formDataService: FormDataService, // Inject the service
    private router: Router // Inject the router for navigation 
  ) {}

  ngOnInit() {
    // Retrieve the selected option from the route parameter
    this.route.queryParams.subscribe(params => {
      this.selectedOption = params['option'];
    });
  }

  formData: any = {
    'chat-heading': '',
    'color': '',
    'welcome-message': '',
    'error-message': '',
    'availability': 'always',
    'channels': []
  };

  formErrors: { [key: string]: string } = {}; // Error messages

  currentStep = 0;

  nextStep() {
    if (this.currentStep < 2 && this.isStepValid(this.currentStep)) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  // Method to set the selected color
  setColor(color: string) {
    this.selectedColor = color;
    this.formData['color'] = color; // Update the form data
  }

  // Method to handle file selection
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.userFile = event.target.files[0];
    }
  }

  // Method to check if the current step's form is valid
  isStepValid(step: number): boolean {
    switch (step) {
      case 0:
        // Validate Step 1 fields
        if (!this.formData['chat-heading']) {
          this.formErrors['chat-heading'] = 'Chat Bot Name is required.';
          return false;
        }
        break;
      case 1:
        // Validate Step 2 fields
        if (!this.formData['welcome-message']) {
          this.formErrors['welcome-message'] = 'Welcome Message is required.';
          return false;
        }
        if (!this.formData['error-message']) {
          this.formErrors['error-message'] = 'Error Message is required.';
          return false;
        }
        break;
      default:
        return true;
    }
    return true;
  }

  // Method to submit the form
  onSubmit() {
    if (this.userFile && this.isStepValid(this.currentStep)) {
      // Prepare data for API request, e.g., create a FormData object
      const formData = new FormData();
      formData.append('pdfFile', this.userFile);

      // Upload the PDF file to ChatPDF.com using FormData
      axios.post('https://api.chatpdf.com/v1/sources/add-file', formData, {
        headers: {
          'x-api-key': 'sec_4puyAwfuTudnn8AvNvzgSDNnpPRzmyqK', // Replace with your ChatPDF.com API key
          // Do not set Content-Type here; Axios will set it automatically for FormData
        },
      })
        .then((response: any) => {
          // Store the source ID in formData
          this.formData['pdfData'] = { sourceId: response.data.sourceId };

          // Save the form data to the service
          this.formDataService.setFormData(this.formData);

          // Navigate to the ChatbotComponent
          this.router.navigate(['/chatbot']);

          // Set submitted to true for showing the confirmation message
          this.submitted = true;
        })
        .catch((error: any) => {
          console.error('Error uploading PDF:', error);
          // Handle the error, if needed
        });
    } else {
      // Handle the case where no file was selected
    }
  }
}
