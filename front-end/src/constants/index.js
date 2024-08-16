export const navLinks=[
    {id:1,title:'Home',link:'/'},
    {id:2,title:'Docs',link:'/docs'},
    {id:3,title:'Contact',link:'/contact'},
]

export const API='https://mail-merchant-10.el.r.appspot.com'

export const myHelperBackendAPI = "https://helper-api-vignu.el.r.appspot.com"

export const endpointExampleCode=`POST /send_mail/:userid

Input:
{
    "name"\: "John Smith",
    "mail": "john.smith@example.com",
    "subject": "Inquiry",
    "message": "Hello, I am interested in your services."
}

Output:
{
  "message": "Mail Sent Successfully",
  "status_code": 201,
  "success": true
}
`

export const pythonExampleCode=`import requests

url = "<your-api-link>"
data = {
    "name": "John Smith",
    "mail": "john.smith@example.com",
    "subject": "Inquiry",
    "message": "Hello, I am interested in your services."
}
# Set the content type header
headers = {'Content-Type': 'application/json'}

# Send the POST request
response = requests.post(url, json=data, headers=headers)

# Check the response status code
if response.status_code == 201:
    print('Mail sent successfully')       # Request was successful
else:
    print('Failed to send Mail')          # Request failed`

export const reactExampleCode =`import React, { useState } from "react";

function ContactForm() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("<your-api-link>", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, mail, subject, message }),
    });
    const data = await response.json();
    console.log(data);
    setName("");
    setMail("");
    setSubject("");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
      </label>
      <label>
        Subject:
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </label>
      <label>
        Message:
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ContactForm;
`

export const angularExampleCode=`import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact-form',
  template: "
    <form (submit)="onSubmit()">
      <label>
        Name:
        <input [(ngModel)]="name" name="name" type="text" required>
      </label>
      <label>
        Email:
        <input [(ngModel)]="mail" name="mail" type="email" required>
      </label>
      <label>
        Subject:
        <input [(ngModel)]="subject" name="subject" type="text" required>
      </label>
      <label>
        Message:
        <textarea [(ngModel)]="message" name="message" required></textarea>
      </label>
      <button type="submit">Submit</button>
    </form>
  ",
})
export class ContactFormComponent {
  name: string;
  mail: string;
  subject: string;
  message: string;

  constructor(private http: HttpClient) {}

  onSubmit() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { name: this.name, mail: this.mail, subject: this.subject, message: this.message };
    this.http.post('<your-api-link>', body, { headers }).subscribe((response) => {
      console.log(response);
      this.name = '';
      this.mail = '';
      this.subject = '';
      this.message = '';
    });
  }
}
`

export const normaljsExampleCode=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Contact Form</title>
  <style>
    label {
      display: block;
      margin-bottom: 10px;
    }
    input, textarea {
      display: block;
      width: 100%;
      padding: 5px;
      margin-bottom: 20px;
    }
    button {
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>Contact Us</h1>
  <form id="contact-form">
    <label>
      Name:
      <input id="name" type="text" required>
    </label>
    <label>
      Email:
      <input id="mail" type="email" required>
    </label>
    <label>
      Subject:
      <input id="subject" type="text" required>
    </label>
    <label>
      Message:
      <textarea id="message" required></textarea>
    </label>
    <button type="submit">Submit</button>
  </form>

  <script>
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const mail = document.getElementById('mail').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      const xhr = new XMLHttpRequest();
      const url = '<your-api-link>';
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 201) {
          console.log(xhr.responseText);
          form.reset();
        }
      };
      const data = JSON.stringify({ name, mail, subject, message });
      xhr.send(data);
    });
  </script>
</body>
</html>
`