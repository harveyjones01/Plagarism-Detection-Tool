# web-prog

This is my submission for the web programming module.

```text
node sever.js
```

```text
npm run setup
```

I have built this using node, express, PSQL and vanilla javascript for the client side. I started off by building the google sign in page to make sure that any users with a @port.ac.uk email can access the service, i then moved onto building out the client side like the drag and drop functionality. After this i proceeded to set up the database that i have and have it so i can write and execute queries to it. This then lead me into building out the server file so it is properly able to manage the communication between the browser and the database, to go along with this is the file that is responsible for calculating how similar it is to the existing files. After this it was a case of building the table and adding in the javascript so that the table will update with every file uploaded.

Some key features with are;
The flagging system put in so it alerts the user if a file has more then a 75% similarity rating to an existing file. I decided to put this in as it is a reasonable threshold for a file that definitely had components that are extremely similar.
The google sign in to validate that the person using the service is a member of the University of Portsmouth. I put this in as an authentication measure as there may be sensitive files that are uploaded to the database.
The ability to upload files that the same name because of how i have stored them with multer and finally the ability top drag in files and drop them in. This is useful as there re list of css files that are called style.css so i want to make sure that wont cause any issues.
The user is unable to upload files that aren't in the approved list of file inputs, this is so if the user tries to upload something like an image it wont wast space as as they are typically larger files and comparing files to them is not necessary.
