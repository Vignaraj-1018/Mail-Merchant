from email.message import EmailMessage
import ssl
import smtplib

from dotenv import load_dotenv
load_dotenv()
import os

sender=os.getenv('SENDER_MAIL')
sender_pwd=os.getenv('SENDER_PASSWORD')

def send_mail(data,user):

    em=EmailMessage()
    em['From']=data['mail']
    em['To']=user
    em['Subject']=data['subject']
    body="""Mail from {}\n\nMail: {}\n\nMessage:\n{}\n\n\nRegards,\nMail Merchant Team""".format(data['name'],data['mail'],data['message'])
    em.set_content(body)
    
    cntxt=ssl.create_default_context()
    try:
        
        server=smtplib.SMTP('smtp.gmail.com',587)
        server.starttls(context=cntxt)
        server.login(sender,sender_pwd)
        server.sendmail(sender,user,em.as_string())
        
    except Exception as e:
        print(e)
        return 0
    finally:
        server.quit()
        return em

