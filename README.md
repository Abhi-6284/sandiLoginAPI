# caarify 
Made By Abhi6284
fuser -k 5416/tcp

<!-- Admin Register -->
POST https://caarify-abhi.onrender.com/api/admin/register
{
    "username":"admin",
    "email":"admin@gmail.com",
    "password":"admin",
    "confirmPassword":"admin"
}

<!-- All Admin Login -->
POST https://caarify-abhi.onrender.com/api/admin/login
{
    "email":"admin@gmail.com",
    "password":"admin"
}


<!-- Add Services -->
POST https://caarify-abhi.onrender.com/api/add-service

{
    "custName":"Abhi",
    "carName":"BMW",
    "carType":"car Type",
    "carNumber":"GJ16FG9845",
    "carModel":"Model",
    "additionalService":"Add Service",
    "actions":"Repairing",
    "emergencyType":"police",
    "fuelType":"Petrol",
    "serviceType":"Service Type",
    "status":"Done",
    "totalPrice": 8526
}

<!-- All Service -->
GET https://caarify-abhi.onrender.com/api/getAll

<!-- Add Mechanic -->
POST https://caarify-abhi.onrender.com/api/admin/add-mechanic

{
    "mechanicName":"mechanic1", // More then 2 Alpha
    "email":"mechanicEmail1@gmail.com",
    "phone":"9654654654", // Start with 6,7,8,9 and 10 Only
    "service":"2"
}


<!-- Get Mechanic -->

GET https://caarify-abhi.onrender.com/api/admin/get-mechanic

<!-- Both Service / Mechanic Delete -->

POST https://caarify-abhi.onrender.com/api/admin/delete

{
    "formName": "mechanic/service",
    "id":"642a7e7841106747074df269"
}