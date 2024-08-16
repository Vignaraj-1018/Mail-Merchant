from email.message import EmailMessage
import ssl
import smtplib
from bson.objectid import ObjectId


from dotenv import load_dotenv
load_dotenv()
import os
import re

import pymongo
from dotenv import load_dotenv
load_dotenv()
import os
mycol=pymongo.MongoClient(os.getenv('MONGO_CLIENT'))['Users']['user_details']

sender=os.getenv('SENDER_MAIL')
sender_pwd=os.getenv('SENDER_PASSWORD')

class Mail_Service:
    def __init__(self):
        pass

    def send_mail(self,data,user):

        valid = True
        regEx = '[a-z0-9]+@[a-z]+\.[a-z]{2,3}';

        if not re.fullmatch(regEx,user):
            valid = False
            return 0

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
            valid = False
        finally:
            server.quit()
            if valid:
                return em
            else:
                return 0

    def sendMailHandler(self, data, userid):
        user=mycol.find_one({'_id':ObjectId(userid)})
        if not user:
            return {"success":False,"message":"Invalid Credential, User Not Found","status_code":401},401

        if("toOther" in data.keys() and data['toOther']):
            resp=self.send_mail(data,user=data["mail"])
        else:
            resp=self.send_mail(data,user=user['mail'])
        
        if not resp:
            return {"success":False,"message":"Faied to send Mail","status_code":500},500

        filter = {"_id": ObjectId(userid)}
        update = {"$push": {"services": {"From":resp['From'],"To":resp['To'],"name":data['name'],"Subject":resp['Subject'],"message":data['message']}}}
        result = mycol.update_one(filter, update)
        if result:
            return {"success":True,"message":"Mail Sent Successfully","status_code":201},201
        else:
            return {"success":False,"message":"Faied to send Mail","status_code":500},500