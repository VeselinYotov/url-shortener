const request = require("supertest");
const app = require("../../server/app");
const Slug = require("../../server/models/slug");
const {
    slugOne,
    slugTwo,
    slugThree,
    loadDatabase,
    slugFour,
} = require("../testData/integration.data");

beforeEach(loadDatabase);

test("Should create a slug with random value when user doesnt specified one ", async () => {
    const response = await request(app)
        .post("/slug")
        .send({
            URL: slugThree.URL,
            slug: "",
        })
        .expect(201);

    // Check if slug is added to the database
    const slug = await Slug.findById(slugThree._id);
    expect(slug).not.toBeNull();

    // Check if response is correct
    expect(response.body.slug.URL).toBe(slugThree.URL);
    expect(response.body.slug.slug).not.toBeNull();
});

test("Should not create named slug without authorization ", async () => {
    await request(app)
        .post("/slug")
        .send({
            URL: slugFour.URL,
            slug: slugFour.slug,
        })
        .expect(400);
});

test("Should not create a slug with host URL ", async (done) => {
    await request(app)
        .post("/slug")
        .send({
            URL: slugOne.URL,
        })
        .expect(400);
    done();
});

//Should i use HTTP CONNECT?
test("Should redirect to URL by slug", async () => {
    await request(app).get("/slug").send(slugTwo.slug).expect(302);
});
