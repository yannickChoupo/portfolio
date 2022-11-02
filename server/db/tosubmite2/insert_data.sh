#! /bin/bash

if [[ $1 == "test" ]]
then
echo test modus
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.
echo truncate tables
TRUNC=$($PSQL "TRUNCATE TABLE games, teams")
if [[ $TRUNC == "TRUNCATE TABLE" ]]
then
echo table truncated
fi

cat games.csv | while IFS="," read YEAR ROUND WINNER OPPONENT WINNERGOAL OPPONENTGOAL
do
  if [[ $YEAR != "year" ]]
  then
    echo $WINNER : $OPPONENT
    INSERTEDTEAM=$($PSQL "INSERT INTO teams(name) VALUES('$WINNER')")
    INSERTEDOPPONENT=$($PSQL "INSERT INTO teams(name) VALUES('$OPPONENT')")
    if [[ $INSERTEDTEAM != "INSERT 0 1" ]]
    then
     echo Inserted team, $INSERTEDTEAM
    fi
    if [[ $INSERTEDOPPONENT == "INSERT 0 1" ]]
    then
     echo Inserted opponent, $INSERTEDOPPONENT
    fi
    echo round : $ROUND

    WINNER_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$WINNER'")
    OPPONENT_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$OPPONENT'")

    ADDEDGAME=$($PSQL "INSERT INTO games(year, round, winner_id, opponent_id, winner_goals, opponent_goals)
                       VALUES ($YEAR, '$ROUND', $WINNER_ID, $OPPONENT_ID, $WINNERGOAL, $OPPONENTGOAL)")
    echo $ADDEDGAME

  fi


done

