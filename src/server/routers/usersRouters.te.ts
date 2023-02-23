import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectDataBase from "../../database/connectDataBase";
import User from "../../database/models/User";
import { app } from "../index";
import { type UserCredentials } from "../../types";
import { before } from "node:test";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDataBase(server.getUri());
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

afterEach(async () => {
  await User.deleteMany();
});

const mockUser: UserCredentials = {
  username: "Raimón",
  password: "raimon1234",
  avatar: "fototoguapa",
};

describe("Given a POST '/users/login' endpoint", () => {
  beforeAll(async () => {
    await User.create(mockUser);
  });

  // Const user = await User.create(mockUser)
  // const jwtpayload = {
  //   sub: user?._id,
  // }

  // const token = jwt.sign(jwtPayload, process.env.JWT_Secret!)

  describe("When it receives a request with username 'Raimón' and password 'raimon1234'", () => {
    test("Then it should response with status code '200'", async () => {
      const expectedStatus = 200;
      const response = await request(app)
        .post("/users/login")
        .send(mockUser)
        .expect(expectedStatus);
    });
  });
});
