import json
from flask import Flask,request
from flask_cors import CORS, cross_origin
from mail import *

import bcrypt

import pymongo
from bson.objectid import ObjectId
from bson import json_util

from dotenv import load_dotenv
load_dotenv()
import os
mongoClient = os.getenv('MONGO_CLIENT')

app = Flask(__name__)
CORS(app, support_credentials=True)


client = pymongo.MongoClient(mongoClient)
db = client['Users']
mycol=db['user_details']

@cross_origin(supports_credentials=True)
@app.route("/")
def hello_world():
    return "Hello, World!"

@cross_origin(supports_credentials=True)
@app.route("/signup",methods=["POST"])
def signup():
    data=request.get_json()
    data['password'] = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    user=mycol.find_one({'mail':data['mail']})
    if user:
        return {"success":False,"message":"User Already Exist","status_code":409},409
    else:
        res=mycol.insert_one({'name':data['name'],'mail':data['mail'],'password':data['password'],'services':[],"verified":False})

    return {'id':str(res.inserted_id)},201

@cross_origin(supports_credentials=True)
@app.route("/g/signup",methods=["POST"])
def g_signup():
    data=request.get_json()
    data['password'] = bcrypt.hashpw(data['name'].encode('utf-8'), bcrypt.gensalt())
    user=mycol.find_one({'mail':data['mail']})
    if user:
        return {"success":False,"message":"User Already Exist","status_code":409},409
    else:
        res=mycol.insert_one({'name':data['name'],'mail':data['mail'],'password':data['password'],'services':[],"verified":True})

    return {'id':str(res.inserted_id)},201

@cross_origin(supports_credentials=True)
@app.route("/login",methods=["POST"])
def login():
    data=request.get_json()
    user=mycol.find_one({'mail':data['mail']})
    if user:
        if bcrypt.checkpw(data['password'].encode('utf-8'), user['password']):
            return {'id':str(user['_id']),"success":True},200
        else:
            return {"success":False,"message":"Wrong Password","status_code":403},403
            
    else:
        return {"success":False,"message":"Login Failed","status_code":401},401
    
@cross_origin(supports_credentials=True)
@app.route("/g/login",methods=["POST"])
def g_login():
    data=request.get_json()
    user=mycol.find_one({'mail':data['mail']})
    if user:
        if bcrypt.checkpw(data['password'].encode('utf-8'), user['name']):
            return {'id':str(user['_id']),"success":True},200
        else:
            return {"success":False,"message":"Wrong Password","status_code":403},403
            
    else:
        return {"success":False,"message":"Login Failed","status_code":401},401

@cross_origin(supports_credentials=True)
@app.route("/sendmail/<userid>",methods=['POST'])
def sendmail(userid):
    user=mycol.find_one({'_id':ObjectId(userid)})
    if not user:
        return {"success":False,"message":"Invalid Credential, User Not Found","status_code":401},401

    resp=send_mail(request.get_json(),user=user['mail'])
    filter = {"_id": ObjectId(userid)}
    update = {"$push": {"services": {"From":resp['From'],"To":resp['To'],"name":request.get_json()['name'],"Subject":resp['Subject'],"message":request.get_json()['message']}}}
    result = mycol.update_one(filter, update)
    if result:
        return {"success":True,"message":"Mail Sent Successfully","status_code":201},201
    else:
        return {"success":False,"message":"Faied to send Mail","status_code":500},500

@cross_origin(supports_credentials=True)
@app.route("/users",methods=['GET'])
def users():
    users=mycol.find({})
    documents=[]
    for document in users:
        document["_id"] = str(document["_id"])
        document["password"] = str(document["password"])
        documents.append(document)
    json_string= json.dumps(documents, default=json_util.default)
    return json_string

@cross_origin(supports_credentials=True)
@app.route("/user/<userid>",methods=['GET', 'POST'])
def user(userid):
    user=mycol.find_one({'_id':ObjectId(userid)})
    if user:
        user["_id"] = str(user["_id"])
        user["password"] = str(user["password"]) 
        
        return user
    return {"success":False,"message":"User Found","status_code":401},401
    

@cross_origin(supports_credentials=True)
@app.route("/forgot-password",methods=["POST"])
def pre_forgot_password():
    data=request.get_json()
    url=data['url']
    user=mycol.find_one({'mail':(data['mail'])})

    if not user:
        return {"success":False,"message":"Invalid Credential, User Not Found","status_code":401},401
    mail={'name':'Mail Merchant','mail':'mailmercant1018@gmail.com','subject':'Change Password',
          'message':'Link the Link to Continue to Changing the Password: {}/{}'.format(url,str(user['_id']))}
    resp=send_mail(mail,user=user['mail'])
    if resp:
        return "Success"
    return "Failure",500 

@cross_origin(supports_credentials=True)
@app.route("/forgot-password/<userid>",methods=["POST"])
def post_forgot_password(userid):
    data=request.get_json()
    data['password'] = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    filter = {"_id": ObjectId(userid)}
    update = {"$set":{"password":data['password']}} 
    res=mycol.update_one(filter,update)
    if res.matched_count==0:
        return {"success":False,"message":"Invalid Credential, User Not Found","status_code":401},401

    return "Success"

@cross_origin(supports_credentials=True)
@app.route("/mail-verify-request",methods=["POST"])
def pre_mail_verify():
    data=request.get_json()
    url=data['url']+"/mail-verify"
    mail={'name':'Mail Merchant','mail':'mailmercant1018@gmail.com','subject':'Mail Verification',
          'message':'Here is the Link to Verify your Mail Address:\n{}\nClick to verify the Mail!'.format(url)}
    user=mycol.find_one({'_id':ObjectId(url.split("/")[4])})
    resp=send_mail(mail,user=user['mail'])
    resp=True
    if resp:
        return {"success":True,"status_code":200},200
    return {"success":False,"message":"Please SignUp with a Valid Email Account!","status_code":500},500


@cross_origin(supports_credentials=True)
@app.route("/mail-verify-request/<userid>",methods=["POST","GET"])
def post_mail_verify(userid):
    filter = {"_id": ObjectId(userid)}
    update = {"$set":{"verified":True}}
    res=mycol.update_one(filter,update)
    if res.matched_count==0:
        return {"success":False,"message":"Invalid Credential, User Not Found","status_code":401},401

    return {"success":True,"status_code":200},200

@cross_origin(supports_credentials=True)
@app.route("/closeaccount",methods=["POST"])
def close_account():
    data=request.get_json()
    res=mycol.delete_one({"_id": ObjectId(data['id'])})
    if res:
        return "Success"
    return {"success":False,"message":"Some Error Occured!","status_code":500},500


app.run(debug=True,host='0.0.0.0',port=8080) 