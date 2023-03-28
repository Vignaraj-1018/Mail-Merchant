# from email.message import EmailMessage
# import smtplib
# import ssl

# # Setup port number and servr name

# smtp_port = 587                 # Standard secure SMTP port
# smtp_server = "smtp.gmail.com"  # Google SMTP Server

# sender = "mailmerchant1018@gmail.com"
# receiver = "prabhupugal01@gmail.com"

# pswd = "hfdzvpcuttllfohn"

# # content of message

# body = """Hello from Python!
# How you doing?"""
# subject="Mail Merchant Test Mail"

# # Create context
# simple_email_context = ssl.create_default_context()

# em=EmailMessage()
# em['From']=sender
# em['To']=receiver
# em['Subject']=subject
# em.set_content(body)

# try:
#     # Connect to the server
#     print("Connecting to server...")
#     TIE_server = smtplib.SMTP(smtp_server, smtp_port)
#     TIE_server.starttls(context=simple_email_context)
#     TIE_server.login(sender, pswd)
#     print("Connected to server :-)")
    
#     # Send the actual email
#     print()
#     print(f"Sending email to - {receiver}")
#     TIE_server.sendmail(sender, receiver,em.as_string())
#     print(f"Email successfully sent to - {receiver}")

# # If there's an error, print it out
# except Exception as e:
#     print(e)

# # Close the port
# finally:
#     TIE_server.quit()

# import pymongo
# client = pymongo.MongoClient("mongodb+srv://mailmerchant1018:MailMerchant1018@mailmerchant.pkmhkhu.mongodb.net/?retryWrites=true&w=majority")
# db = client['Users']
# mycol=db['user_details']
# # coll=db.user_details
# print(mycol)
# result = mycol.insert_one({'name': 'John Doe'})
# print(result.inserted_id)

import requests
  
url = "https://mail-merchant.onrender.com/sendmail/6420a0373d4f1c6468b93e38"
data = {
    "name": "John Smith",
    "mail": "john.smith@example.com",
    "sub": "Inquiry",
    "msg": "Hello, I am interested in your services."
}
response = requests.post(url, data=data)

print(response.json()) 
