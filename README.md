# Mail Merchant

Mail Merchant is a free email integration API built with Python Flask and MongoDB. Users can create an account, verify their email address, and obtain an API link. The API takes in four fields (name, email, subject, message) using the POST method, and returns a 201 status code once the email is successfully sent.

## Installation

1. Clone the repository: `git clone https://github.com/<your-username>/mail-merchant.git`
2. Navigate to the project directory: `cd mail-merchant`
3. Create a virtual environment: `python3 -m venv env`
4. Activate the virtual environment: `source env/bin/activate`
5. Install dependencies: `pip install -r requirements.txt`
6. Start the Flask server: `python main.py`

## Usage

1. Create an account on the Mail Merchant website.
2. Verify your email address.
3. Log in to your account to obtain your API link.
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
