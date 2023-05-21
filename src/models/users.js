const { DataTypes } = require("sequelize");

const users = (sequelize) => {
	sequelize.define(
		"users",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			image: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing el",
			},
		},
		{
			timestamps: false, // Set timestamps option to false
		}
	);
};

module.exports = users;
