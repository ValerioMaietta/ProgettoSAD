# CrossChat

CrossChat è una web app di messaggistica avanzata che offre un'esperienza di comunicazione in tempo reale, sicura e altamente reattiva. CrossChat garantisce ottime prestazioni e un'interfaccia utente intuitiva e piacevole.

Caratteristiche principali:

- Tech stack: CrossChat è costruito utilizzando lo stack MERN (MongoDB, Express.js, React e Node.js), con l'aggiunta di Socket.io per la comunicazione in tempo reale e TailwindCSS insieme a Daisy UI per uno stile moderno e personalizzabile.
- Autenticazione e Autorizzazione con JWT: La sicurezza è una priorità in CrossChat. Utilizziamo JSON Web Tokens (JWT) per garantire che solo gli utenti autorizzati possano accedere e interagire con l'app.
- Messaggistica in tempo reale con Socket.io: Comunica con i tuoi amici e colleghi istantaneamente grazie all'integrazione di Socket.io, che assicura una trasmissione di messaggi rapida e affidabile.
- Stato online degli utenti: Visualizza lo stato online dei tuoi contatti in tempo reale grazie all'uso combinato di Socket.io e React Context, migliorando l'interattività e la connessione con gli altri utenti.
- Gestione dello stato globale con Zustand: Manteniamo l'applicazione altamente reattiva e gestita in modo efficiente con Zustand per la gestione dello stato globale.
- Gestione degli errori: CrossChat gestisce gli errori sia sul lato server che sul lato client, garantendo un'esperienza utente senza intoppi e facile da risolvere in caso di problemi.

## Setup del file .env per ogni servizio del backend e del frontend con porte diverse

```js
PORT=...
MONGO_DB_URI=...
JWT_SECRET=...
NODE_ENV=...
```

## Installare le dipendenze per ogni servizio e avviarli

### authentication-service

```shell
cd backend/authentication-service
npm install
npm start
```

### message-service

```shell
cd backend/message-service
npm install
npm start
```

### user-service

```shell
cd backend/user-service
npm install
npm start
```

### frontend

```shell
cd frontend
npm install
npm run dev
```

## Setup con Docker

In alternativa è possibile eseguire il setup del progetto con Docker nel seguente modo:

### authentication-service

```shell
cd backend/authentication-service
docker build -t authentication-service .
docker run -p [port]:[port] -d authentication-service
```

### message-service

```shell
cd backend/message-service
docker build -t message-service .
docker run -p [port]:[port] -d message-service
```

### user-service

```shell
cd backend/user-service
docker build -t user-service .
docker run -p [port]:[port] -d user-service
```

### frontend

```shell
cd frontend
npm install
npm run dev
```
