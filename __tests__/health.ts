import HydraClient from "../src";
import nock = require("nock");

const MOCK_URL = "http://localhost";

describe("GET /health/alive endpoint", () => {
  let client: HydraClient;

  beforeEach(() => {
    client = new HydraClient(MOCK_URL);
  });

  test("request succeeds with expected status", async () => {
    const MOCK_STATUS = "ok";

    nock(MOCK_URL)
      .get("/health/alive")
      .reply(200, {
        status: MOCK_STATUS,
      });

    expect.assertions(1);
    await expect(client.checkAliveStatus()).resolves.toBe(MOCK_STATUS);
  });

  test("request fails with expected error", async () => {
    const MOCK_ERROR = {
      error: "error",
      error_code: 500,
      error_debug: "debug",
      error_hint: "hint",
    };

    nock(MOCK_URL)
      .get("/health/alive")
      .reply(500, MOCK_ERROR);

    expect.assertions(1);

    await expect(client.checkAliveStatus()).rejects.toMatchObject(MOCK_ERROR);
  });
});

describe("GET /health/ready endpoint", () => {
  let client: HydraClient;

  beforeEach(() => {
    client = new HydraClient(MOCK_URL);
  });

  test("request succeeds with expected status", async () => {
    const MOCK_STATUS = "ok";

    nock(MOCK_URL)
      .get("/health/ready")
      .reply(200, {
        status: MOCK_STATUS,
      });

    expect.assertions(1);
    await expect(client.checkReadinessStatus()).resolves.toBe(MOCK_STATUS);
  });

  test("request fails with expected error", async () => {
    const MOCK_ERROR = {
      errors: {
        "error1": "1",
      },
    };

    nock(MOCK_URL)
      .get("/health/ready")
      .reply(500, MOCK_ERROR);

    expect.assertions(1);

    await expect(client.checkReadinessStatus()).rejects.toMatchObject(MOCK_ERROR);
  });
});
