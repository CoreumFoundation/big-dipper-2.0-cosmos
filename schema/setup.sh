#!/bin/bash

echo $POSTGRES_PASSWORD | psql -h db -W -U $POSTGRES_USER -d bdjuno -f /var/lib/postgresql/schema/00-cosmos.sql
echo $POSTGRES_PASSWORD | psql -h db -W -U $POSTGRES_USER -d bdjuno -f /var/lib/postgresql/schema/01-auth.sql
echo $POSTGRES_PASSWORD | psql -h db -W -U $POSTGRES_USER -d bdjuno -f /var/lib/postgresql/schema/02-bank.sql
echo $POSTGRES_PASSWORD | psql -h db -W -U $POSTGRES_USER -d bdjuno -f /var/lib/postgresql/schema/03-staking.sql
echo $POSTGRES_PASSWORD | psql -h db -W -U $POSTGRES_USER -d bdjuno -f /var/lib/postgresql/schema/04-consensus.sql
echo $POSTGRES_PASSWORD | psql -h db -W -U $POSTGRES_USER -d bdjuno -f /var/lib/postgresql/schema/05-mint.sql
echo $POSTGRES_PASSWORD | psql -h db -W -U $POSTGRES_USER -d bdjuno -f /var/lib/postgresql/schema/06-distribution.sql
echo $POSTGRES_PASSWORD | psql -h db -W -U $POSTGRES_USER -d bdjuno -f /var/lib/postgresql/schema/07-pricefeed.sql
echo $POSTGRES_PASSWORD | psql -h db -W -U $POSTGRES_USER -d bdjuno -f /var/lib/postgresql/schema/09-modules.sql
echo $POSTGRES_PASSWORD | psql -h db -W -U $POSTGRES_USER -d bdjuno -f /var/lib/postgresql/schema/10-slashing.sql
echo $POSTGRES_PASSWORD | psql -h db -W -U $POSTGRES_USER -d bdjuno -f /var/lib/postgresql/schema/11-feegrant.sql
