const User = require("../../server/models/user");
require("../../server/helpers/db");
const { validUser, UserWithInvalidEmail } = require("../testData/unit.data");

const dump = async () => {
    await User.deleteMany();
};
afterEach(dump);

test("Should Create and Save new User", async () => {
    const saved_validUser = await new User(validUser).save();
    expect(saved_validUser._id).toBeDefined();
    expect(saved_validUser.username).toBe(validUser.username);
    expect(saved_validUser.email).toBe(validUser.email);
    expect(saved_validUser.password).not.toBe(validUser.password);
    expect(saved_validUser.tokens[1]).toBe(validUser.tokens[1]);
});

test("Should return validation error on wrong email", async () => {
    await new User(UserWithInvalidEmail).save((err) => {
        if (err){
            expect(err._message).toBe("User validation failed");
        } 
    });
});
