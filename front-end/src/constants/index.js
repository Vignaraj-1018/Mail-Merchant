export const navLinks=[
    {id:1,title:'Home',link:'/'},
    {id:2,title:'Docs',link:'/docs'},
    {id:3,title:'Contact',link:'/contact'},
]

export const exampleCode=` # Endpoint for sending email via Mail Merchant
  POST /send_mail
  
  Input:
  {
      "name"\: "John Smith",
      "email": "john.smith@example.com",
      "subject": "Inquiry",
      "message": "Hello, I am interested in your services."
  }
  
  Output:
  {
      "status": "success",
      "message": "Email sent successfully."
  }
  
  # Example usage in Python:
  
  import requests
  
  url = "<your-api-link>"
  data = {
      "name": "John Smith",
      "email": "john.smith@example.com",
      "subject": "Inquiry",
      "message": "Hello, I am interested in your services."
  }
  response = requests.post(url, data=data)
  
  print(response.json()) `

export const reactExampleCode =`import React, { useState } from "react";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("<your-api-link>", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, subject, message }),
    });
    const data = await response.json();
    console.log(data);
    setName("");
    setEmail("");
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <input [(ngModel)]="email" name="email" type="email" required>
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
  email: string;
  subject: string;
  message: string;

  constructor(private http: HttpClient) {}

  onSubmit() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { name: this.name, email: this.email, subject: this.subject, message: this.message };
    this.http.post('<your-api-link>', body, { headers }).subscribe((response) => {
      console.log(response);
      this.name = '';
      this.email = '';
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
      <input id="email" type="email" required>
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
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      const xhr = new XMLHttpRequest();
      const url = '<your-api-link>';
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log(xhr.responseText);
          form.reset();
        }
      };
      const data = JSON.stringify({ name, email, subject, message });
      xhr.send(data);
    });
  </script>
</body>
</html>
`