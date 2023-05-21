const { DataTypes } = require("sequelize");

const chats = (sequelize) => {
	sequelize.define(
		"chats",
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
			allChats: {
				type: DataTypes.ARRAY(DataTypes.JSON),
				allowNull: false,
				validate: {
					//*validating values
					hasMessageAttribute(values) {
						if (!values || !Array.isArray(values)) {
							throw new Error("Array of JSON objects is required");
						}

						for (const value of values) {
							//*checking it does not have any other attributes
							const keys = Object.keys(value);
							const findOtherAttributes = keys.find((el) => {
								return el !== "message" && el !== "person" && el !== "date";
							});
							if (findOtherAttributes) {
								throw new Error(
									"The JSON object must not container other attributes than message, person and data"
								);
							}

							//*fields can not be null
							if (!value.hasOwnProperty("message")) {
								throw new Error('Each JSON object must have a "message" attribute');
							}
							if (!value.hasOwnProperty("person")) {
								throw new Error('Each JSON object must have a "person" attribute');
							}

							//*type of enum
							if (value?.person !== "Me" && value?.person !== "Other") {
								throw new Error('Person field must be "Me" or "Other"');
							}

							//*default date
							if (!value?.date) {
								value.date = new Date();
							}
						}
					},
				},
			},
		},
		{
			timestamps: false, // Set timestamps option to false
		}
	);
};

module.exports = chats;
