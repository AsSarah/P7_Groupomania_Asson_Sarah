/// Creation du modele de données pour la table Likes

module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define(
        "likes",
        {
            userId: {
                type: Sequelize.STRING,                 // type de donnée texte
                allowNull: true,                        // autorise la valeur null
            },
            PostId: {
                type: Sequelize.STRING(2000),           // type de donnée texte
                allowNull: true,                        // autorise la valeur null
            },
            Isliked: {
                type: Sequelize.INTEGER,                // type de donnée nombre entier
                allowNull: true,                        // autorise la valeur null
                defaultValue : 1                        // valeur par defaut 1 ( lors de la création d'un like, il est forcement a 1)

            },
            
        },
        { timestamps: true }
    );
    return Like;
};
