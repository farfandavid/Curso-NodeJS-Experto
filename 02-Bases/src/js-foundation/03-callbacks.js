const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
]

const getUserById = (id, callbacks) => {
  const user = users.find(user => user.id === id)

  if (!user) {
    return callbacks(`User with id ${id} not found`)
  }
  return callbacks(null, user)
}
//getUserById(1)

module.exports = {
  getUserById
}