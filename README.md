# Big Dipper 2.0 ✨ (Cosmos Based Chains)
Big Dipper is an open-source block explorer and token management tool serving over 10 proof-of-stake blockchains. It has been forked more than 100 times on GitHub and has served audiences from 140 countries and regions.

## Running Big Dipper in development environment
In order to run big dipper in devlopment environment you need to:

1) Create `.env` file for your environment

`cp .env .env.coreznet`

2) Edit `.env.coreznet` file with your envs

`vim .env.coreznet`

3) Run the big-dipper-ui container and mount the `.env.coreznet` file inside it

`docker run -p 3000:3000 -v $(pwd)/.env:/.env.coreznet gcr.io/coreum-devnet-1/big-dipper-ui:latest-dev`

**This repo contains the UI of big dipper 2.0 only**

## Documentation
Read our official documentation at [http://docs.bigdipper.live/](http://docs.bigdipper.live/)

## Issue Reporting
For UI related issues please report it here [https://github.com/forbole/big-dipper-2.0-cosmos/issues](https://github.com/forbole/big-dipper-2.0-cosmos/issues).

For Hasura and BdJuno issues please report it here [https://github.com/forbole/bdjuno/issues](https://github.com/forbole/bdjuno/issues)

## License
Read our license at [https://raw.githubusercontent.com/forbole/big-dipper-2.0-cosmos/master/LICENSE](https://raw.githubusercontent.com/forbole/big-dipper-2.0-cosmos/master/LICENSE)

## Ledger and Transaction Support
While Big Dipper 2.0 no longer supports ledger or any kind of transactions in favor of [Forbole X](https://github.com/forbole/forbole-x), the original [Big Dipper](https://github.com/forbole/big-dipper) will continue have this feature.

## Setup Backend for Big Dipper Development

1. Pull all of the latest images

`docker compose pull`

2. Build images that couldn't be pulled

`docker compose build --build-arg NEXT_PUBLIC_GRAPHQL_URL="http://localhost:8080/v1/graphql" \
            --build-arg NEXT_PUBLIC_GRAPHQL_WS="ws://localhost:8080/v1/graphql" \
            --build-arg NEXT_PUBLIC_URL="http://0.0.0.0" \
            --build-arg NEXT_PUBLIC_RPC_WEBSOCKET="ws://localhost:26657/websocket" \
            --build-arg NEXT_PUBLIC_CHAIN_TYPE="testnet" \
            --build-arg NODE_ENV="production" \
            --build-arg PORT=3000 \
            --build-arg NEXT_PUBLIC_MATOMO_URL="https://analytics.bigdipper.live" \
            --build-arg NEXT_PUBLIC_MATOMO_SITE_ID=4`

3. Bring up all of the services BE & FE

`docker compose up -Vd db hasura bdjuno big-dipper-ui cored`

4. Run db migartion and turn on tracking for db schema

`docker compose up -Vd migration`
`docker compose up -Vd hasura-cli`