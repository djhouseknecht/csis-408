# Monthly Budget 

## Project Instructions
Project 2: Create a Monthly Household Budget App. You may choose any Integrated
Development Environment (IDE) you want. You may create these all as Web Apps, you do not
need to pay for Android, iOS developer accounts. Submit your URL for your project, or a zip file
of your working project folder via Blackboard. No Email submissions accepted.

## Running the Application
#### Requirements
- It is best to use a new version of [Google Chrome](https://www.google.com/chrome/)
- I wrote and tested it on version `69.0.3497.100`
- Docker (what version?)
- `docker` and `docker-compose` (version 3)
    - `sudo apt install docker-compose`

#### Instructions
Start Rest using docker (note: you may need to run `docker` as `sudo` or `Administrator` on Windows)
1. `docker build . -t project-2`
2. `docker run -p 8080:8080 project-2`
1. Pull down the project onto your locally machine

UI: 
`docker build . -t ui-project-2`
`docker run -p 4200:4200 ui-project-2`
tests
`docker run --entrypoint npm  project-2-ui test`

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
- Flyway migration 
### Java Backend
- Spring boot
- Maven build
- Docker 
- security
    - Not using HTTP redirects because it restricts the clien with the security/login implementation
- Tests
    - tests are run when the application is being built 
- swagger
### Front End 
- Angular 7
- Tests

## References
This was a useful resource for the Dockerization of the Java side of this application: https://www.callicoder.com/spring-boot-docker-example/

Used this reference for Dockerfile Maven install: https://github.com/Zenika/alpine-maven/blob/master/jdk8/Dockerfile

This is Spring-boot's website: https://spring.io/projects/spring-boot. I downloaded the starter project from there. 

Useful: https://stackoverflow.com/questions/42208442/maven-docker-cache-dependencies	

Spring Security: https://www.baeldung.com/role-and-privilege-for-spring-security-registration
and http://websystique.com/spring-security/secure-spring-rest-api-using-basic-authentication/

## IDE Used
I used [VScode](https://code.visualstudio.com/) to write the front end of this application.

I used [IntelliJ]() to write the Java backend of this application. 
