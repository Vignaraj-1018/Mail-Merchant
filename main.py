import json
from flask import Flask,request
from mail import *
app = Flask(__name__)

import pymongo
from bson.objectid import ObjectId
from bson import json_util

client = pymongo.MongoClient("mongodb+srv://mailmerchant1018:MailMerchant1018@mailmerchant.pkmhkhu.mongodb.net/?retryWrites=true&w=majority")
db = client['Users']
mycol=db['user_details']

@app.route("/")
def hello_world():
    return "Hello, World!"

@app.route("/signup",methods=["POST"])
def signup():
    data=request.get_json()
    user=mycol.find_one({'mail':data['mail']})
    if user:
        return "User Already Exist",409
    else:
        res=mycol.insert_one({'name':data['name'],'mail':data['mail'],'password':data['pwd'],'services':[]})

    return {'id':str(res.inserted_id)},201

@app.route("/login",methods=["POST"])
def login():
    data=request.get_json()
    user=mycol.find_one({'mail':data['mail'], 'password':data['pwd']})
    if user:
        return {'id':str(user['_id'])},201
    else:
        return "Login failed",401

@app.route("/sendmail/<userid>",methods=['POST'])
def sendmail(userid):
    # print("Sendmail, ",userid)
    user=mycol.find_one({'_id':ObjectId(userid)})
    # print('user: ',user)
    if not user:
        return "Failed to send",401
    # print(user['mail'])
    resp=send_mail(request.get_json(),user=user['mail'])
    filter = {"_id": ObjectId(userid)}
    update = {"$push": {"services": {"From":resp['From'],"To":resp['To'],"name":request.get_json()['name'],"Subject":resp['Subject'],"msg":resp.get_content()}}}

    # print('Mail: ',resp,"update",update)
    result = mycol.update_one(filter, update)
    if result:
        return 'Success',201
    else:
        return 'Failure',500

@app.route("/users",methods=['GET'])
def users():
    users=mycol.find({})
    documents=[]
    for document in users:
        document["_id"] = str(document["_id"])
        documents.append(document)
    json_string= json.dumps(documents, default=json_util.default)
    # print('Output',json_string)
    return json_string,201

@app.route("/user/<userid>",methods=['GET', 'POST'])
def user(userid):
    user=mycol.find_one({'_id':ObjectId(userid)})
    # print('user: ',user)
    user["_id"] = str(user["_id"])
    
    return user,201
    

app.run(debug=True)