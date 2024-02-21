# Certificate Generator

## Overview

The Certificate Generator is a web application designed to simplify the creation and distribution of certificates based on information provided in an Excel file. This project aims to streamline the certificate management process for organizations and individuals.

## Features

- **Excel File Integration:** Seamlessly integrate with Excel files for efficient data management.
- **MongoDB Database Storage:** Securely store certificate data in a scalable MongoDB database.
- **Automated Certificate Generation:** Dynamically generate certificates based on specified information and formats.
- **Email Notification:** Send personalized email notifications with certificates to recipients.
- **EJS Templating Engine:** Utilize EJS for server-side templating and dynamic HTML content generation.
- **User-Friendly Interface:** Intuitive UI for easy navigation and certificate management.
- **Secure Data Handling:** Implement security measures to protect sensitive data.

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Templating Engine:** EJS (Embedded JavaScript)
- **Integration:** Excel file processing
- **Email Services:** Nodemailer

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure the MongoDB connection details.
4. Start the application with `npm start`.

   
#Make Env

EMAIL_USER=
EMAIL_PASSWORD=

DB_USERNAME=
DB_PASSWORD=
DB_CLUSTER=
DB_NAME=

## Usage

1. Upload an Excel file containing certificate information.
2. Certificates will be generated and stored in the MongoDB database.
3. Recipients will receive personalized email notifications with their certificates attached.

## License

This project is licensed under the [MIT License](LICENSE).


---

**Disclaimer:**
This project is a demonstration of technical skills and is not intended for use in any critical or sensitive applications without thorough testing and validation.

