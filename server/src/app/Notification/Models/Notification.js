module.exports = (sequelize, Sequelize) => {
    const Notification = sequelize.define('notifications', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        deadline: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        type: {
            type: Sequelize.ENUM,
            values: ['TYPE_1', 'TYPE_2', 'TYPE_3'],
            defaultValue: 'TYPE_1',
        },
        status: {
            type: Sequelize.ENUM,
            values: ['ABERTO', 'FECHADO'],
            defaultValue: 'ABERTO',
        },
    })

    Notification.associate = (models) => {
        return Notification
    }

    return Notification
}