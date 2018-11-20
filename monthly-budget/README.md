# Monthly Budget 

## Project Instructions
Project 2: Create a Monthly Household Budget App. You may choose any Integrated
Development Environment (IDE) you want. You may create these all as Web Apps, you do not
need to pay for Android, iOS developer accounts. Submit your URL for your project, or a zip file
of your working project folder via Blackboard. No Email submissions accepted.

## Running the Application
### Requirements
- It is best to use a new version of [Google Chrome](https://www.google.com/chrome/)
- I wrote and tested it on version `69.0.3497.100`
- [Docker](https://www.docker.com/get-started) latest version is fine
- [Docker-compose](https://docs.docker.com/compose/install/) (version 3)

### Instructions
It is easiest to use `docker-compose` to build and run that app. Pull the project down from github into a directory that the current user has read & write permissions to. 

You may need to run `docker` and `docker-compose` commands as `sudo` or as *Administrator* on windows. 

```
# cd into working directory (there should be a docker-compose.yml file present)

# build the images
sudo docker-compose build
    # this will take a while if you are running it for the first time

# run the projects
sudo docker-compose up

# ctrl + c to take down the container
```

#### Running the projects individually 
You only need to do this if the above `docker-compose` commands don't work. 

Start Rest using docker:
1. `docker build . -t project-2`
2. `docker run -p 8080:8080 project-2`

Start UI using docker: 
1. `docker build . -t ui-project-2`
2. `docker run -p 4200:4200 ui-project-2`

# TODO's (dev notes)
- [ ] .dockerignore files
- [ ] Docker commands to test the apps 
- [ ] how-instruction
    - [ ] install
    - [ ] run
    - [ ] test
    - [ ] what IDE used
- [ ] Screen shots of use/testing
- [ ] Documentation 
    - [ ] thorough walk through 
- [ ] HTML/CSS validate 
- [ ] citations

## Notes on the Project



### Project 
- Docker was used to build, test, and deploy the projects 
### Data Source
- H2 file storage
- The data is stored in the container. Once the container goes down, the data will be lost. This was for simplicity sake. I did not want to spin up another container or an external data source for this project.
### Java Backend
- Spring boot
- Maven build
- Docker 
- security
    - Using simple in-memory basic http auth. I learned alot about Spring Security, but I know there is still alot more. I would like to get a working OAuth security system in place, but the in-memory option worked for this assignment. 
    - Not using HTTP redirects because it restricts the client with the security/login implementation
### Front End 
- Angular 7

## References
This was a useful resource for the Dockerization of the Java side of this application: https://www.callicoder.com/spring-boot-docker-example/

Used this reference for Dockerfile Maven install: https://github.com/Zenika/alpine-maven/blob/master/jdk8/Dockerfile

This is Spring-boot's website: https://spring.io/projects/spring-boot. I downloaded the starter project from there. 

Useful: https://stackoverflow.com/questions/42208442/maven-docker-cache-dependencies	

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
