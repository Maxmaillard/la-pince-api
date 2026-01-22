# Modéle Physique des Données:
Creation des tables :

```CREATE TABLE "USER" (
  id_user SERIAL PRIMARY KEY,
  email VARCHAR(15) NOT NULL UNIQUE,
  password VARCHAR(65) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100)
);

CREATE TABLE CATEGORY ( id_category SERIAL PRIMARY KEY,
 name VARCHAR(100) NOT NULL, 
 color VARCHAR(9) 
 );

 CREATE TABLE EXPENSE (
  id_expense SERIAL PRIMARY KEY,
  amount DECIMAL(10,2) NOT NULL,
  date DATE NOT NULL,
  description VARCHAR(250),
  id_user INT NOT NULL REFERENCES "USER"(id_user) ON DELETE CASCADE,
  id_category INT NOT NULL REFERENCES category(id_category)
);

CREATE TABLE budget (
  id_budget SERIAL PRIMARY KEY,
  alert_threshold DECIMAL(10,2),
  total_amount DECIMAL(10,2),
  id_user INT NOT NULL REFERENCES "USER"(id_user) ON DELETE CASCADE,
  id_category INT NOT NULL REFERENCES Category
  (id_category)
);
CREATE TABLE alert (
  id_alert SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  description VARCHAR(255),
  id_budget INT NOT NULL REFERENCES budget(id_budget) ON DELETE CASCADE
);
CREATE TABLE savings_goal (
  id_savings_goal SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  target_amount DECIMAL(10,2),
  actual_amount DECIMAL(10,2),
  id_user INT NOT NULL REFERENCES "user"(id_user) ON DELETE CASCADE
);




