const bcrypt = require('bcryptjs')
const { UserInputError } = require('apollo-server')
const { User } = require('../models')

module.exports = {
    Query: {
        getUsers: async () => {
            try {
                const users = await User.findAll()

                return users
            } catch (err) {
                console.log(err)
            }
        },
    },
    Mutation: {
        register: async (_, args) => {
            let { username, email, password, confirmPassword } = args
            let errors = {}
            try {
                // Validate input data
                if (email.trim() === '') errors.email = "email must be empty"
                if (username.trim() === '') errors.username = "username must be empty"
                if (password.trim() === '') errors.password = "password must be empty"
                if (confirmPassword.trim() === '') errors.confirmPassword = "repeat password must be empty"
                if (password != confirmPassword) errors.confirmPassword = "password must mutch"
                // Cheack If username / email exit
                // const userByUsername = await User.findOne({ where: { username } })
                // const userByEmail = await User.findOne({ where: { email } })

                // if (userByUsername) errors.username = "Username already taken"
                // if (userByEmail) errors.email = "Email already signup plese go to login page"
                if (Object.keys(errors).length > 0) {
                    throw errors
                }


                // Has Pass
                password = await bcrypt.hash(password, 6)

                //  Create user
                const user = await User.create({
                    username, email, password
                })
                //  Return User
                return user
            } catch (err) {
                if (err.name === 'SequelizeUniqueConstraintError') {
                    err.errors.forEach((e) => errors[e.path] = `${e.path} is aleady taken`)
                }
                throw new UserInputError('Bad input', { errors })
            }
        }
    }
}