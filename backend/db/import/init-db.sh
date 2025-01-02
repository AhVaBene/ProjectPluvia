#!/bin/bash

DB_NAME="dbPluvia"
#DB_COLLECTION="pluvia"

echo "Importing databases"

#for f in "docker-entrypoint-initdb.d/db/*.json"
#do
    #mongoimport --host localhost --db $DB_NAME --collection $DB_COLLECTION --file $f
#done

mongoimport --host localhost --db $DB_NAME --collection reports --file docker-entrypoint-initdb.d/db/db_reports.json
mongoimport --host localhost --db $DB_NAME --collection users --file docker-entrypoint-initdb.d/db/db_users.json

echo "Imported data in $DB_NAME"
