## Project design documentation

#### Subject Proposal

Create a RESTful Web Service for movie tickes online booking. It allows customer to register, login and book the ticket of a movie in the specific time, and seat. Customers also allow to book multiple seat at once.  The service allows staff of movie theater to add a movie in the specific theater and time. Optional part is the payment method that use mock up online payment processing. This project also provide simple front-end to test the web service.

#### Subject Project

1. Tools that used in project

   1. VSCode: for coding
   2. Github: for version controlling
   3. Postman: to test API
   4. Trello: for task management
   5. Discord: for team communication
   6. Terminal: for excuting the project
   7. Typora: for documenation
   8. Firefox: for testing front-end
   9. Datagrip: for database management
2. List the API used to implement the project

   1. POST `/api/customer/auth/login`
   2. POST `/api/customer/auth/register`
   3. GET `/api/customer/profile`
   4. GET `/api/locations`
   5. GET `/api/locations/:id`
   6. GET `/api/:locationID/shows`
   7. GET `/api/:locationID/shows/:showID`
   8. POST `/api/customer/reserve/:locationID/:showID`
   9. POST `/api/staff/auth/login`
   10. GET `/api/staff/movies`
   11. GET `/api/staff/slot/:date`
   12. POST `/api/staff/show`
   13. PATCH `/api/staff/show/showID`
   14. DELETE `/api/staff/show/showID`
   15. GET `/api/admin/staff`
   16. POST `/api/admin/staff`
   17. PATCH `/api/admin/staff/staffID`
   18. DELETE `/api/admin/staff/staffID`
   19. POST `/api/admin/location`
   20. PATCH `/api/admin/location/:locationID`
   21. DELETE `/api/admin/location/:locationID`
   22. GET `/api/admin/movies`
   23. POST `/api/admin/movie`
   24. PATCH `/api/admin/movie/:movieID`
   25. DELETE `/api/admin/movie/:movieID`
3. List What kind of data storage methods is used in the project

   - Relational database using MySQL 
4. What is the target runtime environment where your service application will be run?

   - At least 2GB of RAM
   - At least 4 core of CPU
   - At least 25 GB of storage
5. What programming language and libraries you will use in the final project?

   - Programming langugaes
     - Javascript

   - Libraries
     - Node.js
     - Next.js
     - Express
6. Optional part
   1. Payment method by using mock up online payment processing such as stripe

#### System atchitecture

<img src="https://drive.google.com/uc?export=view&id=1klEDP-4lt6w_9cwkd16zsGoh_YsqeMN0" style="width: 650px; max-width: 100%; height: auto" title="System architecture" />

#### Conceptual model of database (UML)

<img src="https://drive.google.com/uc?export=view&id=10S8t1JNiojwcV1iFSDchYxloeiSMwNuq" style="width: 650px; max-width: 100%; height: auto" title="UML" />

#### Logical model of database (crow's feet diagram)

<img src="https://drive.google.com/uc?export=view&id=1wLe25HYpvt0EfvBKaQt9NBwuWZUMgLCK" style="width: 650px; max-width: 100%; height: auto" title="Logical model" />

#### Goal

We set the goal that we should be able to get grade 5 from this course because we put the effort and divided the work as effectively as we can. We also hope that we can learn somethings new from this project such as learning new tools that can automate some tasks.

#### How the work is divided and members

These are plan of how we divide the works (some of them is already completed) but it can be flexible.

1. Thanaphon Sombunkaeo (AC3837)
   - Conceptual model, system architecture, host free datase on heroku, authentication API
   - Design API route
   - Construct the project structure
   - Manage the team: divide the work, see the progress of members
   - API for customer and admin
2. Teerapat mongkolchaichana (AC3836)
   - Logical model, design the API route
   - Define business process
   - API for staff
   - Do some part of front-end
3. Parinthon Puksuriwong (AC3832)
   - Define business process and constraints
   - Design API route
   - API for customer
   - Do some part of front-end