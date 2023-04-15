# Mail Merchant

Mail Merchant is a free email integration API built with Python Flask and MongoDB. Users can create an account, verify their email address, and obtain an API link. The API takes in four fields (name, email, subject, message) using the POST method, and returns a 201 status code once the email is successfully sent.

## Installation

1. Clone the repository: `git clone https://github.com/Vignaraj-1018/mail-merchant.git`
2. Navigate to the project directory: `cd mail-merchant`
- Backend
    1. Navigate to Backend folder: `cd back-end`
    2. Create a virtual environment: `python3 -m venv env`
    3. Activate the virtual environment: `env\Scripts\activate.bat`
    4. Install dependencies: `pip install -r requirements.txt`
    5. Change file name `.env.example` to `.env` and add your credentials.
    6. Start the Flask server: `python main.py`
- Frontend
    1. Navigate to Frontend folder: `cd front-end`
    2. Install the Node Modules: `npm install`
    3. Change the API link in `/src/constants/index.js` to you local API link
    4. Change file name `.env.example` to `.env` and add your credentials.
    5. Start the App: `npm run dev`

## Usage

1. Create an account on the Mail Merchant website using your email address or Google Account.
2. Verify your email address if not Google Account.
3. Log in to your account and go to profile page to obtain your API link.
4. Use your API link to integrate the Mail Merchant API with your application.

## API Endpoints

- `/sendmail/:userid`: Sends an email using the POST method.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/<feature-name>`
3. Make your changes and commit them: `git commit -m '<commit-message>'`
4. Push to the branch: `git push origin feature/<feature-name>`
5. Submit a pull request.

## License

Mail Merchant is released under the MIT License. See [LICENSE](LICENSE.md) for details.
