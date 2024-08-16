from bson.objectid import ObjectId
from bson import json_util
import json

from dotenv import load_dotenv
load_dotenv()
import os
import pymongo
import bcrypt

mycol=pymongo.MongoClient(os.getenv('MONGO_CLIENT'))['Users']['user_details']

from .mail_service import Mail_Service

mail_service = Mail_Service()

class Login_Service:
    def __init__(self):
        pass

    def signup(self,data):
        data['password'] = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
        user=mycol.find_one({'mail':data['mail']})
        if user:
            return {"success":False,"message":"User Already Exist","status_code":409},409
        else:
            res=mycol.insert_one({'name':data['name'],'mail':data['mail'],'password':data['password'],'services':[],"verified":False,"google":False})
            mail={'name':'Mail Merchant','mail':'mailmercant1018@gmail.com','subject':'Welcome to Mail Merchant',
            'message':'\nExplore the Documentation of Mail Merchant to see how it works!\nVerify your email to get started with using the Mail Merchant API!'}
            resp = mail_service.send_mail(mail,user=data['mail'])
            if not resp:
                return {"success":False,"message":"Faied to send Mail","status_code":500},500

        return {'id':str(res.inserted_id)},201

    def g_signup(self,data):
        data['password'] = bcrypt.hashpw(data['name'].encode('utf-8'), bcrypt.gensalt())
        user=mycol.find_one({'mail':data['mail']})
        if user:
            return {"success":False,"message":"User Already Exist","status_code":409},409
        else:
            res=mycol.insert_one({'name':data['name'],'mail':data['mail'],'password':data['password'],'services':[],"verified":True,"google":True})
            mail={'name':'Mail Merchant','mail':'mailmercant1018@gmail.com','subject':'Welcome to Mail Merchant',
            'message':'\nExplore the Documentation of Mail Merchant to see how it works!'}
            resp=mail_service.send_mail(mail,user=data['mail'])

            if not resp:
                return {"success":False,"message":"Faied to send Mail","status_code":500},500
        return {'id':str(res.inserted_id)},201

    def login(self,data):
        user=mycol.find_one({'mail':data['mail']})
        if user:
            if user['google']:
                return {"success":False,"message":"Google Account!","status_code":406},406
            if bcrypt.checkpw(data['password'].encode('utf-8'), user['password']):
                return {'id':str(user['_id']),"success":True},200
            else:
                return {"success":False,"message":"Wrong Password","status_code":403},403
                
        else:
            return {"success":False,"message":"Login Failed","status_code":401},401
        
    def g_login(self,data):
        user=mycol.find_one({'mail':data['mail']})
        if user:
            return {'id':str(user['_id']),"success":True},200
        else:
            return {"success":False,"message":"User Not Found","status_code":404},404

    def pre_forgot_password(self,data):
        url=data['url']
        user=mycol.find_one({'mail':(data['mail'])})

        if user['google']:
            return {"success":False,"message":"Google Account!","status_code":406},406
        if not user:
            return {"success":False,"message":"Invalid Credential, User Not Found","status_code":401},401
        mail={'name':'Mail Merchant','mail':'mailmercant1018@gmail.com','subject':'Change Password',
            'message':'Link the Link to Continue to Changing the Password: {}/{}'.format(url,str(user['_id']))}
        resp=mail_service.send_mail(mail,user=user['mail'])
        if not resp:
            return {"success":False,"message":"Faied to send Mail","status_code":500},500
        if resp:
            return "Success"
        return "Failure",500 

    def post_forgot_password(self,data,userid):
        data['password'] = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
        filter = {"_id": ObjectId(userid)}
        update = {"$set":{"password":data['password']}} 
        res=mycol.update_one(filter,update)
        if res.matched_count==0:
            return {"success":False,"message":"Invalid Credential, User Not Found","status_code":401},401

        return "Success"

    def pre_mail_verify(self,data):
        url=data['url']+"/mail-verify"
        mail={'name':'Mail Merchant','mail':'mailmercant1018@gmail.com','subject':'Mail Verification',
            'message':'Here is the Link to Verify your Mail Address:\n{}\nClick to verify the Mail!'.format(url)}
        user=mycol.find_one({'_id':ObjectId(url.split("/")[4])})
        if user['google']:
            return {"success":False,"message":"Google Account!","status_code":406},406
        resp=mail_service.send_mail(mail,user=user['mail'])
        
        if resp:
            return {"success":True,"status_code":200},200
        return {"success":False,"message":"Please SignUp with a Valid Email Account!","status_code":500},500


    def post_mail_verify(self,userid):
        filter = {"_id": ObjectId(userid)}
        update = {"$set":{"verified":True}}
        res=mycol.update_one(filter,update)
        if res.matched_count==0:
            return {"success":False,"message":"Invalid Credential, User Not Found","status_code":401},401

        return {"success":True,"status_code":200},200

    def close_account(self,data):
        res=mycol.delete_one({"_id": ObjectId(data['id'])})
        if res:
            return "Success"
        return {"success":False,"message":"Some Error Occured!","status_code":500},500

    def users(self):
        users=mycol.find({})
        documents=[]
        for document in users:
            document["_id"] = str(document["_id"])
            document["password"] = str(document["password"])
            documents.append(document)
        json_string= json.dumps(documents, default=json_util.default)
        return json_string

    def user(self,userid):
        user=mycol.find_one({'_id':ObjectId(userid)})
        if user:
            user["_id"] = str(user["_id"])
            user["password"] = str(user["password"]) 
            
            return user
        return {"success":False,"message":"User not Found","status_code":401},401
    