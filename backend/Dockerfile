FROM openjdk:17-jdk-slim AS build

WORKDIR /home/project

COPY . .

RUN apt-get update && apt-get install -y curl unzip && \
    curl -L -s https://services.gradle.org/distributions/gradle-8.12.1-bin.zip -o gradle.zip && \
    unzip gradle.zip -d /opt && \
    mv /opt/gradle-8.12.1 /opt/gradle

ENV GRADLE_HOME=/opt/gradle

ENV PATH=$PATH:$GRADLE_HOME/bin

RUN gradle build --no-daemon -x test


FROM openjdk:17-jdk-slim

RUN apt-get update && apt-get install -y curl 

WORKDIR /app

COPY --from=build /home/project/build/libs/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]

