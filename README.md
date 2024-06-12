# Sequelize Migration Script

This script generates Sequelize migration files from your models.

## Setup

1. Your Sequelize models should be located in a directory named 'models' in the same directory as the script.

2. If you don't have Sequelize models yet, you can generate them using the [sequelize-auto](https://github.com/sequelize/sequelize-auto) package. Install it with:

```
npm install -g sequelize-auto
```

## Usage

1. Run the script with Node.js:

```
node app.js
```

2. The script will create a directory named 'migrations'.

3. The script will then read each file in the 'models' directory, generate a migration file for each model, and save the migration files in the 'migrations' directory.

## Notes

This script assumes that your Sequelize models are defined in separate files in the 'models' directory, and that each file exports a function that defines a model.
The script does not automatically run the migrations. You can run the migrations with the Sequelize CLI:

```
npx sequelize-cli db:migrate
```