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

# Add a volume pointing to /tmp
VOLUME /tmp

# Change working directory
#WORKDIR /usr/src/app

# Copy in the source code
ADD . .

# Use Maven to build project
RUN mvn package

# Rename jar file
RUN mv target/monthly-budget-0.0.1-SNAPSHOT.jar app.jar

# Make port 8080 available to the world outside this container
EXPOSE 8080

# The application's jar file
# ARG JAR_FILE=target/monthly-budget-0.0.1-SNAPSHOT.jar

# Add the application's jar to the container
# ADD ${JAR_FILE} websocket-demo.jar

# Run the jar file
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]