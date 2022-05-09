/// Creation du modele de donn�es pour la table Utilisateurs

module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "users",
    {
      id: {
            allowNull: false,                     // autorise la valeur null
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,                  // type de donn�e nombre entier
      },
      username: {
          type: Sequelize.STRING,                 // type de donn�e texte
          allowNull: false,                       // n'autorise pas la valeur null
      },
      email: {
          type: Sequelize.STRING,                 // type de donn�e texte
          allowNull: false,                       // n'autorise pas la valeur null
      },
      password: {
          type: Sequelize.STRING,                 // type de donn�e texte
          allowNull: false,                       // n'autorise pas la valeur null
      },
      profilePicture: {
          type: Sequelize.STRING,                 // type de donn�e texte
          allowNull: true,                        // autorise la valeur null

      },
      coverPicture: {
          type: Sequelize.STRING,                 // type de donn�e texte
          allowNull: true,                        // autorise la valeur null
     
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,                  // type de donn�e bool�en ( vrais / faux )
        defaultValue: false,                      // valeur par defaut : faux
      },
      desc: {
          type: Sequelize.STRING,                 // type de donn�e texte
          allowNull: true,                        // autorise la valeur null
      },
      Poste: {
          type: Sequelize.STRING,                 // type de donn�e texte
          allowNull: true,                        // autorise la valeur null
      },

    },

    { timestamps: true }
  );
  return Users;
};
