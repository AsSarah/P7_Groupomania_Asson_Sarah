/// Creation du modele de données pour la table Utilisateurs

module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "users",
    {
      id: {
            allowNull: false,                     // autorise la valeur null
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,                  // type de donnée nombre entier
      },
      username: {
          type: Sequelize.STRING,                 // type de donnée texte
          allowNull: false,                       // n'autorise pas la valeur null
      },
      email: {
          type: Sequelize.STRING,                 // type de donnée texte
          allowNull: false,                       // n'autorise pas la valeur null
      },
      password: {
          type: Sequelize.STRING,                 // type de donnée texte
          allowNull: false,                       // n'autorise pas la valeur null
      },
      profilePicture: {
          type: Sequelize.STRING,                 // type de donnée texte
          allowNull: true,                        // autorise la valeur null

      },
      coverPicture: {
          type: Sequelize.STRING,                 // type de donnée texte
          allowNull: true,                        // autorise la valeur null
     
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,                  // type de donnée booléen ( vrais / faux )
        defaultValue: false,                      // valeur par defaut : faux
      },
      desc: {
          type: Sequelize.STRING,                 // type de donnée texte
          allowNull: true,                        // autorise la valeur null
      },
      Poste: {
          type: Sequelize.STRING,                 // type de donnée texte
          allowNull: true,                        // autorise la valeur null
      },

    },

    { timestamps: true }
  );
  return Users;
};
