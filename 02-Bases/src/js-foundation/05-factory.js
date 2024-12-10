//const { getID, getBirthdate } = require("../plugins/")

const buildMakePerson = ({ getID, getBirthdate }) => {
  return ({ name, age }) => {
    return {
      id: getID(),
      name,
      age,
      birthdate: getBirthdate(age),
    }
  }
}

/* const buildPerson = ({ name, age }) => {
  return {
    id: getID(),
    name,
    age,
    birthdate: getBirthdate(age),
  }
}
 */
/* const person = { name: 'John', age: 30 }

const jhon = buildPerson(person)
console.log(jhon) */

module.exports = {
  buildMakePerson
}