PSQL="psql --username=freecodecamp --dbname=periodic_table --no-align --tuples-only -c"

INPUT=$1

MAIN() {

  if [[ $1 =~ [0-9] ]]
  then
    # atomic number = input
    ATOMIC_NUMBER=$1
    # is it available in der database
    ATOMIC_NUMBER=$($PSQL "SELECT atomic_number FROM elements WHERE atomic_number=$1")
    # [[ -z $ATOMIC_NUMBER ]] | EXIT
  fi

  if [[ $1 =~ [a-zA-Z] ]]
  then 
    if [[ ${#INPUT} == 1 || ${#INPUT} == 2 ]]
    then
      # echo input is a single letter
      ATOMIC_NUMBER=$($PSQL "SELECT atomic_number FROM elements WHERE symbol='$1'")
      # [[ -z $ATOMIC_NUMBER ]] | EXIT

    else
      # echo input is a more than 1 letter
      ATOMIC_NUMBER=$($PSQL "SELECT atomic_number FROM elements WHERE name='$1'")
    fi
  fi

  if [[ -z $ATOMIC_NUMBER ]] 
  then
    EXIT
  else
    ELEMENT_SYMBOL=$($PSQL "SELECT symbol FROM elements WHERE atomic_number=$ATOMIC_NUMBER")
    ELEMENT_NAME=$($PSQL "SELECT name FROM elements WHERE atomic_number=$ATOMIC_NUMBER")
    TYPE_ID=$($PSQL "SELECT type_id FROM properties WHERE atomic_number=$ATOMIC_NUMBER")
    ELEMENT_TYPE=$($PSQL "SELECT type FROM types WHERE type_id=$TYPE_ID")
    ELEMENT_MASS=$($PSQL "SELECT atomic_mass FROM properties WHERE atomic_number=$ATOMIC_NUMBER")
    MELTING_POINT=$($PSQL "SELECT melting_point_celsius FROM properties WHERE atomic_number=$ATOMIC_NUMBER")
    BOILING_POINT=$($PSQL "SELECT boiling_point_celsius FROM properties WHERE atomic_number=$ATOMIC_NUMBER")


    echo "The element with atomic number $ATOMIC_NUMBER is $ELEMENT_NAME ($ELEMENT_SYMBOL). It's a $ELEMENT_TYPE, with a mass of $ELEMENT_MASS amu. $ELEMENT_NAME has a melting point of $MELTING_POINT celsius and a boiling point of $BOILING_POINT celsius."
  fi


}

CHECK_INPUT() {
  if [[ ! $1 ]]
  then
    echo Please provide an element as an argument.
  fi
}


EXIT() {
  echo "I could not find that element in the database."
}

if [[ ! $1 ]]
then
    echo Please provide an element as an argument.
else 
    MAIN $1
fi

