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
    body="""
        <div style="border:1px solid black; padding:20px;background-color:black;color:#FF6E31;">
            <div>
                <h2>Name: <span style="font-size:20px; font-weight: normal; color:#fff;">{}</span></h2>
                <h2>Mail: <a href='mailto:{}' style="font-size:20px; font-weight: normal; color:#fff;">{}</a></h2>
                <h2>Message: </h2>
                <h3><span style="font-size:20px; font-weight: normal; color:#fff;">{}</span></h3>
            </div>
            <div style="font-size:10px; border-width:1px 0px 0px 0px;border-style: solid; padding:5px; width:100%; margin-top:100px;">
                <span>Regards,<br/> Mail Merchant Team</span><br/>
                <span><a href='mailto:mailmerchant1018@gmail.com' style='color:#FF6E31;'>mailmerchant1018@gmail.com</a></span>
            </div>
        </div>
    """.format(data['name'],data['mail'],data['mail'],data['message'])
    em.set_content(body)
    em.set_type('text/html')
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

