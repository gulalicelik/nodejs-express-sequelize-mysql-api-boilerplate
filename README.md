# nodejs-express-mysql-api-boilerplate

a simple boilerplate for nodejs express mysql api
clone this repo and start your project

## Installation

```bash
git clone https://github.com/gulalicelik/nodejs-express-sequelize-mysql-api-boilerplate.git
npm install
npm run prepare
```

## Usage

```bash
npm run start:dev
```

## Model Generation

```bash
npx sequelize-cli model:generate --name user --attributes firstname:string,lastname:string,username:string,email:string,password:string,gender:string,active:integer,deleted:integer,token:string,token_expire:string,birthday:date,role:string
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
