const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
]

function getUserById(id, callbacks) {
  const user = users.find(user => user.id === id)
  return user ? callbacks(null, user) : callbacks(`User with id ${id} not found`)
}
//getUserById(1)

module.exports = {
  getUserById
}