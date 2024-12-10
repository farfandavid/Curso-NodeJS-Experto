const { v4: uuidv4 } = require('uuid')

const getID = () => uuidv4()

module.exports = {
  getID,
}