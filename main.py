import json
from flask import Flask,request
from flask_cors import CORS, cross_origin
from mail import *

import pymongo
from bson.objectid import ObjectId
from bson import json_util

app = Flask(__name__)
CORS(app, support_credentials=True)


client = pymongo.MongoClient("mongodb+srv://mailmerchant1018:MailMerchant1018@mailmerchant.pkmhkhu.mongodb.net/?retryWrites=true&w=majority")
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
    user=mycol.find_one({'mail':data['mail']})
    if user:
        return {"success":False,"msg":"User Already Exist","status_code":409},409
    else:
        res=mycol.insert_one({'name':data['name'],'mail':data['mail'],'password':data['pwd'],'services':[]})

    return {'id':str(res.inserted_id)},201

@cross_origin(supports_credentials=True)
@app.route("/login",methods=["POST"])
def login():
    data=request.get_json()
    user=mycol.find_one({'mail':data['mail'], 'password':data['pwd']})
    if user:
        return {'id':str(user['_id'])}
    else:
        return {"success":False,"msg":"Login Failed","status_code":401},401

@cross_origin(supports_credentials=True)
@app.route("/sendmail/<userid>",methods=['POST'])
def sendmail(userid):
    # print("Sendmail, ",userid)
    user=mycol.find_one({'_id':ObjectId(userid)})
    # print('user: ',user)
    if not user:
        return {"success":False,"msg":"Invalid Credential, User Not Found","status_code":401},401
    # print(user['mail'])
    resp=send_mail(request.get_json(),user=user['mail'])
    filter = {"_id": ObjectId(userid)}
    update = {"$push": {"services": {"From":resp['From'],"To":resp['To'],"name":request.get_json()['name'],"Subject":resp['Subject'],"msg":resp.get_content()}}}

    # print('Mail: ',resp,"update",update)
    result = mycol.update_one(filter, update)
    if result:
        return {"success":True,"msg":"Mail Sent Successfully","status_code":201},201
    else:
        return {"success":False,"msg":"Faied to send Mail","status_code":500},500

@cross_origin(supports_credentials=True)
@app.route("/users",methods=['GET'])
def users():
    users=mycol.find({})
    documents=[]
    for document in users:
        document["_id"] = str(document["_id"])
        documents.append(document)
    json_string= json.dumps(documents, default=json_util.default)
    # print('Output',json_string)
    return json_string

@cross_origin(supports_credentials=True)
@app.route("/user/<userid>",methods=['GET', 'POST'])
def user(userid):
    user=mycol.find_one({'_id':ObjectId(userid)})
    # print('user: ',user)
    user["_id"] = str(user["_id"])
    
    return user
     

app.run(debug=True,host='0.0.0.0',port=8080)