/// Creation du modele de données pour la table posts

module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define(
    "posts",
    {
      userId: {
        type: Sequelize.STRING,                 // type de donnée texte
            allowNull: true,                    // autorise  la valeur null
      },
      desc: {
        type: Sequelize.STRING(2000),           // type de donnée texte
          allowNull: true,                      // autorise  la valeur null
      },
      img: {
        type: Sequelize.STRING,                 // type de donnée texte
          allowNull: true,                      // autorise  la valeur null
      },
      likes: {
          type: Sequelize.INTEGER,              // type de donnée texte
          allowNull: true,                      // autorise  la valeur null
        defaultValue: 0,                        // valeur pas defaut 0
      },
    },
    { timestamps: true }
  );
  return Post;
};
