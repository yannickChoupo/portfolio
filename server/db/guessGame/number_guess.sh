#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=guess_game --no-align --tuples-only -c"
# echo $($PSQL "TRUNCATE users")
# INPUT=$1

LOGIN() {
  echo Enter your username:
  read USERNAMEINPUT
  # USER=$($PSQL "SELECT * FROM users WHERE username='$USERNAMEINPUT'")
  USER_ID=$($PSQL "SELECT user_id FROM users WHERE username='$USERNAMEINPUT'")
  if [[ $USER_ID ]]
  then
    USERDISPLAYNAME=$($PSQL "SELECT username FROM users WHERE user_id=$USER_ID")
    NUMBEROFGAMES=$($PSQL "SELECT games_played FROM users WHERE user_id=$USER_ID")
    BESTGAME=$($PSQL "SELECT best_game FROM users WHERE user_id=$USER_ID")
    echo Welcome back, $USERDISPLAYNAME! You have played $NUMBEROFGAMES games, and your best game took $BESTGAME guesses.
    CURGAMESPLAYED=$($PSQL "SELECT games_played FROM users WHERE user_id=$USER_ID")
    GAMEPLAYED=$((CURGAMESPLAYED+1))
    UPDATEDGAMESPLAYED=$($PSQL "UPDATE users SET games_played=$GAMEPLAYED WHERE user_id=$USER_ID")
    MAIN_MENU "$USER_ID"
  else
    NEW_USER=$($PSQL "INSERT INTO users(username, games_played, best_game) VALUES ('$USERNAMEINPUT', 1, 1000)")
    # USERDISPLAYNAME=$($PSQL "SELECT username FROM users WHERE username=$USERNAMEINPUT")
    echo Welcome, $USERNAMEINPUT! It looks like this is your first time here.
    USERID=$($PSQL "SELECT user_id FROM users WHERE username='$USERNAMEINPUT'")
    # if [[ $USER ]]
    # then
    #   echo "$USER" | while read user_id
    #   do
        MAIN_MENU "$USERID"
      # done
    # fi
  fi
}

RANDOM_NUMBER=$[($RANDOM % 1000 )  + 1 ]
NUMBEROFTRIES=0
MAIN_MENU() {
  # Greeting message
  if [[ $2 ]]
  then
    WELCOMETEXT="$2"
  else
    WELCOMETEXT="Guess the secret number between 1 and 1000:"
  fi
  echo $WELCOMETEXT
  echo number, $RANDOM_NUMBER

  # User Input aquirering
  read USERINPUT
  if [[ $USERINPUT =~ ^[0-9]+$ && $USERINPUT -le 1000 && $USERINPUT -ge 1 ]]
  then
    if [[ $USERINPUT -eq $RANDOM_NUMBER ]]
    then
      NUMBEROFTRIES=$((NUMBEROFTRIES+1))
      # get the current best score
      CURBESTSCORE=$($PSQL "SELECT best_game FROM users WHERE user_id='$1'")
      # echo $CURBESTSCORE
      if [[ $NUMBEROFTRIES -le $CURBESTSCORE ]]
      then
        UPDATEDBESTGAME=$($PSQL "UPDATE users SET best_game=$NUMBEROFTRIES WHERE user_id=$1")
      fi
      CURGAMESPLAYED=$($PSQL "SELECT games_played FROM users WHERE user_id=$1")
      GAMEPLAYED=$((CURGAMESPLAYED+1))
      # echo game played so far , $GAMESPLAYED
      echo You guessed it in $NUMBEROFTRIES tries. The secret number was $RANDOM_NUMBER. Nice job!
    fi

    if [[ $USERINPUT -lt $RANDOM_NUMBER ]]
    then
      NUMBEROFTRIES=$((NUMBEROFTRIES+1))
      MAIN_MENU $1 "It's higher than that, guess again:"
    fi

    if [[ $USERINPUT -gt $RANDOM_NUMBER ]]
    then
      NUMBEROFTRIES=$((NUMBEROFTRIES+1))
      MAIN_MENU $1 "It's lower than that, guess again:"
    fi
    # else
    #   echo default case
    # fi
  else 
    NUMBEROFTRIES=$((NUMBEROFTRIES+1))
    MAIN_MENU $1 "That is not an integer, guess again:"
  fi
}
CHECK_INPUT() {
  if [[ ! $1 ]]
  then
    echo Please provide an element as an argument.
  fi
}

LOGIN

