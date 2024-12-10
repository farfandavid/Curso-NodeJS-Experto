const { buildLogger } = require("./plugins");

const logger = buildLogger('app');

logger.log('Hello World!');
logger.error('Hello Error!');
//const getPokemonById = require("./js-foundation/06-promises");
/* getPokemonById(4000).then(name => {
  console.log({ name });
})
  .catch(error => {
    console.error('Error');
  }); */
/* const name = getPokemonById(4).then(name => name);
console.log({ name });
setTimeout(() => {
  console.log({ name })
}, 3000); */

//const { emailTemplate } = require('./js-foundation/01-template');
//require('./js-foundation/02-destructuring');
//console.log(emailTemplate);
//console.log(process.env.PORT)
/* const { buildMakePerson } = require("./js-foundation/05-factory");
const { getID, getBirthdate } = require("./plugins");
const makePerson = buildMakePerson({ getID, getBirthdate });

const person = { name: 'John', age: 30 }
const jhon = makePerson(person)

console.log(jhon) */
/* const { getUserById } = require('./js-foundation/03-callbacks');
getUserById(2, function (error, user) {
  if (error) {
    throw new Error(error);
  }

  console.log('User found', user);

}); */

/* getUserById(2, (error, user) => {
  if (error) {
    throw new Error(error);
  }

  console.log('User found', user);

}); */
//require('./js-foundation/05-factory')

