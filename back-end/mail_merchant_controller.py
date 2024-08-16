from flask import Blueprint, request
from flask_cors import CORS

from services.login_service import Login_Service
from services.mail_service import Mail_Service

login_service = Login_Service()
mail_service = Mail_Service()

app = Blueprint('mail-merchant', __name__)
CORS(app, supports_credentials=True)

from concurrent.futures import ThreadPoolExecutor
executor = ThreadPoolExecutor(max_workers=10)
def handle_request(func, *args, **kwargs):
    print("Thread Started For", func)
    return executor.submit(func, *args, **kwargs).result()

@app.route("/")
def mail_mailchant_hello_world():
    return "Hello world!\nFrom Mail Merchant!!"

@app.route("/signup",methods=["POST"])
def signup():
    data=request.get_json()
    return handle_request(login_service.signup, data)

@app.route("/g/signup",methods=["POST"])
def g_signup():
    data=request.get_json()
    return handle_request(login_service.g_signup, data)

@app.route("/login",methods=["POST"])
def login():
    data=request.get_json()
    return handle_request(login_service.login, data)
    
@app.route("/g/login",methods=["POST"])
def g_login():
    # print(request.headers, request.method)
    data=request.get_json()
    return handle_request(login_service.g_login, data)

@app.route("/sendmail/<userid>",methods=['POST'])
def sendmail(userid):
    data = request.get_json()
    return handle_request(mail_service.sendMailHandler, data, userid)

@app.route("/users",methods=['GET'])
def users():
    return handle_request(login_service.users)

@app.route("/user/<userid>",methods=['GET', 'POST'])
def user(userid):
    return handle_request(login_service.user, userid)
    

@app.route("/forgot-password",methods=["POST"])
def pre_forgot_password():
    data=request.get_json()
    return handle_request(login_service.pre_forgot_password, data)

@app.route("/forgot-password/<userid>",methods=["POST"])
def post_forgot_password(userid):
    data=request.get_json()
    return handle_request(login_service.post_forgot_password, data, userid)

@app.route("/mail-verify-request",methods=["POST"])
def pre_mail_verify():
    data=request.get_json()
    return handle_request(login_service.pre_mail_verify, data)

@app.route("/mail-verify-request/<userid>",methods=["POST","GET"])
def post_mail_verify(userid):
    return handle_request(login_service.post_mail_verify, userid)

@app.route("/closeaccount",methods=["POST"])
def close_account():
    data=request.get_json()
    return handle_request(login_service.close_account, data)
