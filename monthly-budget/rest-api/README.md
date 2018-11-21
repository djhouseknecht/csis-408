# Back end project for Monthly Budget
The bulk of the source code for this project is under the `src/main/java/com/djhouseknecht/monthlybudget/` directory. 

I tried my best to use REST structure. I broke it up into feature modules. 

***Definition***: A standard feature module contains a model, repository, and controller

#### budget 
This is a standard feature module. It manages the budget resources. 

#### category
This is a standard feature module. It manages the category resources. 

#### config
This holds all configuration that I needed for this app. It also has the security configuration

#### user and util
This directory holds some useful services. 

#### balancesheet 
This is a standard feature module. It allows users to log actually expenses/income to track them as they happen. Unfortunately, I did not have time to implement this on the frontend.

#### src/main/resources/application.properties
This holds some configuration and datasource configs