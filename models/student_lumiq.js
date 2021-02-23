// eslint-disable-next-line func-names
// export registration model for use in other files.
module.exports = function (sequelize, DataTypes) {
  const student_lumiq = sequelize.define(
    `student_lumiq`,
    {
      student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: `student_id`,
      },
      student_name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: `student_name`,
      },
      student_age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: `student_age`,
      },
    },
    {
      tableName: `student_lumiq`,
      timestamps: false,
    }
  );

  return student_lumiq;
};
