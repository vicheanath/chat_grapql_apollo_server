module.export = {
    Query: {
        getUsers: () => {
            const users = [
                {
                    username: "vichea",
                    email: "vichea@gmail.com",
                },
                {
                    username: "vichea2",
                    email: "vichea2@gmail.com",
                },
            ];
            return users
        },
    },
};