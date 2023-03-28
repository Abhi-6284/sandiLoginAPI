# caarify
Made By Abhi6284

<!-- Admin Register -->
https://coin-a-abhi6284.onrender.com/api/admin/register  ==> POST
{
    "username":"admin",
    "email":"admin@gmail.com",
    "password":"admin",
    "confirmPassword":"admin"
}

<!-- All Admin Login -->
https://caarify-abhi.onrender.com/api/admin/login ==> POST
{
    "email":"admin@gmail.com",
    "password":"admin"
}


<!-- Add Services -->
https://caarify-abhi.onrender.com/api/add-service ==> POST

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
https://caarify-abhi.onrender.com/api/getAll ==> GET

<!-- All Logout -->
https://caarify-abhi.onrender.com/api/logout ==> GET