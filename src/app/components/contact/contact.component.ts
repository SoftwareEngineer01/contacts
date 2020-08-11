import { HttpDataService } from './../../services/http-data.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from "../../models/contact";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


  contactData = {} as Contact;
  public contacts: Contact;

  isEditMode = false;

  constructor(public httpDataService: HttpDataService) { }

  ngOnInit(){
    this.getContacts();
  }

  getContacts(){
    this.httpDataService.getContacts().subscribe((response:any) => {
      this.contacts = response;
    })
  }

  addContact(){
    this.httpDataService.createContact(this.contactData).subscribe((response:any) => {
      this.contactData =  {} as Contact;
      this.getContacts();
    })
  }

  editContact(contact){
    this.isEditMode = true;
    this.contactData = contact;
  }

  updateContact(){
    this.isEditMode = !this.isEditMode;
    this.httpDataService.updateContact(this.contactData).subscribe(() => {
      this.getContacts();
      location.reload();
    })
  }

  deleteContact(contact){
    this.httpDataService.deleteContact(contact).subscribe(() => {
        this.getContacts();
    })
  }

}
