# caarify 
Made By Abhi6284
fuser -k 5416/tcp

<!-- Admin Register -->
POST /api/register

<!-- For Admin -->
{
    "fullName":"Abhishek Lugun",
    "email":"admin@gmail.com",
    "role": "admin",
    "password":"admin",
    "confirmPassword":"admin"
}

<!-- For User -->
{
    "fullName":"UserOne",
    "email":"user@gmail.com",
    "role": "user",
    "password":"User@123",
    "confirmPassword":"User@123"
}

<!-- All Admin Login -->
POST /api/login

{
    "email":"admin@gmail.com",
    "password":"admin"
}
# sandiLoginAPI
