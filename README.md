# Project Setup 
    > git clone repo_name

    > nvm use 20 

# Update .env 
    ATLASDB_URL=
    SECRET=
    MULTER_Storage_Credentaials=

# Initiliaze Admin Databae 
    initally some listing will be there so someone should be admin of those listing so first create a user using post request example 

    Example:
    http://localhost:3000/signup
    {
        "username": "admin",
        "email": "admin@gmail.com",
        "password": "admin@123"
    };

# Next Step:
    copy the uid from the user collection and then go to /init/index.js
     update the UID in the code and then run this command 

     > node /init/index.js 

     Verify in the listing collection and loo for the admin UID is it updated or not.     

# Command to run the Project 
    Since this is not a react and next js project so build is not required.

    > node app.js
