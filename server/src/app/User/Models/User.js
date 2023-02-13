module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        role: {
            type: Sequelize.ENUM,
            values: ['ADMINISTRATOR'],
            defaultValue: 'ADMINISTRATOR',
        },
    })

    // User.associate = (models) => {
    //     User.hasMany(models.Session, {
    //         onDelete: 'CASCADE',
    //     })
    //     return User
    // }

    return User
}