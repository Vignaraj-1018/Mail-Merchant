from email.message import EmailMessage
import ssl
import smtplib

sender='mailmerchant1018@gmail.com'
sender_pwd='hfdzvpcuttllfohn'
# receiver='vignaraj03@gmail.com'

# subject='Mail from Python'
# body="""Hello from Python,
# Successfully sent mail from Python!"""

# em=EmailMessage()
# em['From']=sender
# em['To']=receiver
# em['Subject']=subject
# em.set_content(body)

# cntxt=ssl.create_default_context()
# try:
    
#     server=smtplib.SMTP('smtp.gmail.com',587)
#     server.starttls(context=cntxt)
#     server.login(sender,sender_pwd)
#     server.sendmail(sender,receiver,em.as_string())
#     print("Mail sent successfully")
# except Exception as e:
#     print(e)
# finally:
#     server.quit()


def send_mail(data,user):
    # print('Data:',data)
    em=EmailMessage()
    em['From']=data['mail']
    em['To']=user
    em['Subject']=data['subject']
    body="""Mail from {}
    Mail: {}
    Message:
    {}""".format(data['name'],data['mail'],data['message'])
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

