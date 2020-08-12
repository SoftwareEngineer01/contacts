import { HttpDataService } from './../../services/http-data.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from "../../models/contact";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public form: FormGroup;
  public contactData = {} as Contact;
  public contacts: Contact;
  public text: string;
  public isEditMode = false;
  public save = false;

  constructor(private formbuilder: FormBuilder,
              private httpDataService: HttpDataService) { }

  ngOnInit(){
    this.getContacts();
    this.createForm();
  }

  createForm(){
    this.form = this.formbuilder.group({
      nombre : ['',  [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      entidad : ['',  [Validators.required, Validators.pattern('^[a-z 0-9.-]+$')]],
      email : ['', [Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"), Validators.required]]
    });
  }

  getContacts(){
    this.httpDataService.getContacts().subscribe((response:any) => {
      this.contacts = response;
    })
  }

  addContact(){
    this.save = true;
    if (!this.form.valid) {
      alert('Validar todos los campos');
    }else{
      this.httpDataService.createContact(this.form.value).subscribe(() => {
        this.contactData =  {} as Contact;
        this.getContacts();
        this.save = false;
      })
    }
  }

  editContact(contact){
    this.isEditMode = true;
    this.contactData = contact;
  }

  updateContact(){
    this.isEditMode = !this.isEditMode;
    this.httpDataService.updateContact(this.contactData).subscribe(() => {
      this.getContacts();
      this.save = false;
      location.reload();
    })
  }

  deleteContact(contact){
    this.httpDataService.deleteContact(contact).subscribe(() => {
        this.getContacts();
    })
  }

}
