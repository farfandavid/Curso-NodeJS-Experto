


const getBirthdate = (age) => {
  if (!age) {
    throw new Error('Age is required');
  }
  return new Date().getFullYear() - age
}

module.exports = {
  getBirthdate,
}