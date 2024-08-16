from flask import Flask
from flask_cors import CORS

import mail_merchant_controller as mail_merchant_routes

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.register_blueprint(mail_merchant_routes.app)


@app.route("/")
def hello_world():
    return "Hello, World!"

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=False)