#!/bin/bash

echo -e "\n~~~~~ MY SALON ~~~~~"
PSQL="psql -X --username=freecodecamp --dbname=salon --tuples-only -c"

echo -e "\nWelcome to my Salon, how can I help you\n"
MAIN_MENU() {
  if [[ $1 ]]
  then
    echo -e "\n$1"
  fi

  ALL_SERVICES=$($PSQL "SELECT * FROM services")
  echo "$ALL_SERVICES" | while read SERVICE_ID BAR SERVICE
  do
    echo "$SERVICE_ID) $SERVICE"
  done

  read SERVICE_ID_SELECTED
  # if the service is not found
  # SERVICE_FOUND=$($PSQL "SELECT * FROM services WHERE service_id='$SERVICE_ID_SELECTED'")
  if [[ ! $SERVICE_ID_SELECTED =~ ^[1-9]+$ 
  # || -z $SERVICE_FOUND 
  ]]
  then
    MAIN_MENU "I coould not find that service. What would you like today?"
  else 
    GET_INFOS $SERVICE_ID_SELECTED
  fi
}


GET_INFOS() {
  echo -e "\nWhat's your phone number?"
  read CUSTOMER_PHONE
  CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone='$CUSTOMER_PHONE'")
  # echo founded customer $CUSTOMER_ID
  if [[ -z $CUSTOMER_ID ]]
  then
    echo -e "\nI don't have a record for that phone number, What's your name?"
    read CUSTOMER_NAME
    # add a new customer
    ADDED_CUSTOMER=$($PSQL "INSERT INTO customers(phone, name) VALUES('$CUSTOMER_PHONE', '$CUSTOMER_NAME')")
    # echo $CUSTOMER_IS_ADDED
    ADDED_CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone='$CUSTOMER_PHONE'")

    echo -e "\nWhat time would you like your cut, $CUSTOMER_NAME?"
    read SERVICE_TIME
    INSERTED_APPOINTMENT=$($PSQL "INSERT INTO appointments(customer_id, service_id, time) 
                                  VALUES($ADDED_CUSTOMER_ID, $1, '$SERVICE_TIME')")
    # echo $INSERTED_APPOINTMENT

    ADDED_CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone='$CUSTOMER_PHONE'")

    SERVICE_NAME=$($PSQL "SELECT name FROM services WHERE service_id=$1")
    echo -e "\nI have put you down for a $(echo $SERVICE_NAME | sed -r 's/^ *//') at $(echo $SERVICE_TIME | sed -r 's/^ *//'), $(echo $CUSTOMER_NAME | sed -r 's/^ *//')."
  else
    SERVICE_NAME=$($PSQL "SELECT name FROM services WHERE service_id=$1")
    REGISTERED_CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone='$CUSTOMER_PHONE'")
    echo -e "\nWhat time would you like your$SERVICE_NAME,$REGISTERED_CUSTOMER_NAME?"
    read SERVICE_TIME
    INSERTED_APPOINTMENT=$($PSQL "INSERT INTO appointments(customer_id, service_id, time) VALUES($CUSTOMER_ID, $1, '$SERVICE_TIME')")
    echo $SERVICE_NAME
    echo -e "\nI have put you down for a $(echo $SERVICE_NAME | sed -r 's/^ *//') at $(echo $SERVICE_TIME | sed -r 's/^ *//'), $(echo $REGISTERED_CUSTOMER_NAME | sed -r 's/^ *//')."
  fi
}

MAIN_MENU
