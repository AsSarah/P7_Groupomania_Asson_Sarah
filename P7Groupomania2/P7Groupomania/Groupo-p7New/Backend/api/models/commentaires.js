/// Creation du modele de données pour la table Commentaires
module.exports = (sequelize, Sequelize) => {
    const Coms = sequelize.define(
        "commentaires",
        {
            userId: {
                type: Sequelize.STRING,                         // type de donnée texte
                allowNull: true,                                // autorise la valeur null
            },
            PostId: {
                type: Sequelize.STRING(2000),                   // type de donnée texte
                allowNull: true,
            },
            username: {
                type: Sequelize.STRING,                         // type de donnée texte
                allowNull : true,
            },
            desc: {
                type: Sequelize.STRING(2000),                   // type de donnée texte
                allowNull: true
            },

        },
        { timestamps: true }
    );
    return Coms;
};
