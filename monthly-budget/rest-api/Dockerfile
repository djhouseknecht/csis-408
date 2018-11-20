# Start with a base image containing Java runtime
FROM openjdk:8-jdk-alpine

# Add Maintainer Info
LABEL maintainer="djhouseknecht@liberty.edu"

# Install Maven
ENV MAVEN_VERSION 3.5.4
ENV MAVEN_HOME /usr/lib/mvn
ENV PATH $MAVEN_HOME/bin:$PATH

RUN wget http://archive.apache.org/dist/maven/maven-3/$MAVEN_VERSION/binaries/apache-maven-$MAVEN_VERSION-bin.tar.gz && \
  tar -zxvf apache-maven-$MAVEN_VERSION-bin.tar.gz && \
  rm apache-maven-$MAVEN_VERSION-bin.tar.gz && \
  mv apache-maven-$MAVEN_VERSION /usr/lib/mvn

# Create working directory and cd into it
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# make sure the database file is created
RUN touch ./database.mv.db
# RUN chmod 755 /usr/src/app/database.mv.db

# create user and grant permissions
RUN addgroup -S appuser && adduser -S -G appuser appuser 

RUN chown -R appuser:appuser /usr/src/app/
RUN chmod 766 /usr/src/app/

# switch to newly created user
USER appuser

# Add a volume pointing to /tmp
VOLUME /tmp

# Copy pom file and download dependencies
ADD pom.xml .

RUN ["mvn", "verify", "--fail-never"]

# Copy in the source code
ADD . .

# Use Maven to build project
RUN mvn package

# Rename jar file
RUN mv target/monthly-budget-0.0.1-SNAPSHOT.jar app.jar
# RUN chmod 755 /usr/src/app/app.jar

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","app.jar"]