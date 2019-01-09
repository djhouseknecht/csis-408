# Monthly Budget 

## Project Instructions
Project 2: Create a Monthly Household Budget App. You may choose any Integrated
Development Environment (IDE) you want. You may create these all as Web Apps, you do not
need to pay for Android, iOS developer accounts. Submit your URL for your project, or a zip file
of your working project folder via Blackboard. No Email submissions accepted.


## Notes on the Project

### Server

This was built to be deployed as a web application. For a production level application, I would configure a datasource on it's own server; as well as deploy the java rest project and the angular ui project to their own servers. Once this is all setup, the user would simply go to the website and interact with the app. 

The project uses Docker to run locally. This prevents version conflicts when trying to get the needed dependency to run it. There are instructions on how to use Docker to run this later in the README. 

### Security 

I learned alot about Spring Security, but I know there is still alot more. 

The security uses Basic Auth on the frontend and backend. It was alot easier to implement this rather than write a full fledged security implementation. It uses in-memory storage for a couple named users. I would like to get a working OAuth security system in place, but the in-memory option worked for this assignment. 

It is not using HTTP redirects on successful login/logout attempts because it restricts the client with the security/login implementation

## Running the Application

### Requirements
- It is best to use a new version of [Google Chrome](https://www.google.com/chrome/)
    - I wrote and tested it on version `69.0`
- [Docker](https://www.docker.com/get-started)'s latest version is fine
- [Docker-compose](https://docs.docker.com/compose/install/) (version 3)

### Instructions
It is easiest to use `docker-compose` to build and run that app. Pull the project down from github into a directory that the current user has read & write permissions to. 

You may need to run `docker` and `docker-compose` commands as `sudo` or as *Administrator* on windows. 

```
# clone the repository
git clone https://github.com/djhouseknecht/csis-408.git 

# cd into working directory (there should be a docker-compose.yml file present)
cd $pwd/monthly-budget

# build the images (this will take a while if you are running it for the first time)
sudo docker-compose build

# run the projects
sudo docker-compose up

# ctrl + c to take down the container
```

Once you have the container running, go to http://localhost:4200 to reach the applicaiton. There is an **instructions** link in the nav-bar that will open a pdf with instructions for the user. The instructions can also be found [here.](/rest-api/src/main/resources/static/instructions.pdf)

#### Running the projects individually 
You only need to do this if the above `docker-compose` commands don't work. 

Start Rest using docker:
1. `cd ./monthly-budget/rest-api`
2. `docker build . -t project-2`
3. `docker run -p 8080:8080 project-2`

Start UI using docker: 
1. `cd ./monthly-budget/ui`
2. `docker build . -t ui-project-2`
3. `docker run -p 4200:4200 ui-project-2`

### Project 
- Docker was used to build, test, and deploy the projects 
### Data Source
- H2 file storage was used for the rest-api datasoure. 
- The data is stored in the container. Once the container goes down, the data will be lost. This was for simplicity sake. I did not want to spin up another container or an external data source for this project.
- Once the app is running, you can navigate to http://localhost:8080/h2 to access the database. The user is `sa` and there is no password. 
- Also, I wasn't super happy with the data structure I used. It was a little rushed because I only had a week to write this app. It worked for what I needed it to do. But if I was really going to take this app somewhere, the data would need a few tweaks. 
### Java Backend
Check out the backend's [README](/rest-api/README.md) for code documentation. It was developed using: 
- Spring boot
- Maven build
- Docker 

### Front End 
Check out the frontend's [README](/ui/README.md) for code documentation. It was developed using: 
- Angular 7

## References
This was a useful resource for the Dockerization of the Java side of this application: https://www.callicoder.com/spring-boot-docker-example/

Used this reference for Dockerfile Maven install: https://github.com/Zenika/alpine-maven/blob/master/jdk8/Dockerfile

This is Spring-boot's website: https://spring.io/projects/spring-boot. I downloaded the starter project from there. 

Useful Docker and maven caching information: https://stackoverflow.com/questions/42208442/maven-docker-cache-dependencies	

Spring Security: 
- https://www.baeldung.com/role-and-privilege-for-spring-security-registration
- http://websystique.com/spring-security/secure-spring-rest-api-using-basic-authentication/
- https://github.com/eugenp/tutorials/tree/master/spring-security-rest
- https://javarevisited.blogspot.com/2018/01/how-to-enable-http-basic-authentication-spring-security-java-xml-configuration.html
- https://spring.io/guides/tutorials/spring-security-and-angular-js/
- https://stackoverflow.com/questions/24839760/spring-boot-responsebody-doesnt-serialize-entity-id

As you can see I struggled finding my way around spring security. It was my first time working with it. 

## IDE Used
I used [VScode](https://code.visualstudio.com/) to write the front end of this application.

I used [IntelliJ](https://www.jetbrains.com/idea/download/#section=linux) to write the Java backend of this application. 
