import HydraClient from "../src";
import nock = require("nock");
import OAuth2Client from "../src/types/OAuth2Client";

const MOCK_URL = "http://localhost";

describe("GET /clients endpoint", () => {
  let client: HydraClient;

  beforeEach(() => {
    client = new HydraClient(MOCK_URL);
  });

  test("request succeeds with expected clients", async () => {
    const MOCK_CLIENTS: OAuth2Client[] = [
      {
        client_id: "1"
      },
      {
        client_id: "2"
      }
    ];

    nock(MOCK_URL)
      .get("/clients")
      .reply(200, [...MOCK_CLIENTS]);

    expect.assertions(1);
    await expect(client.getClients()).resolves.toEqual(MOCK_CLIENTS);
  });

  test("request sends correct limit and offset parameters", async () => {
    nock(MOCK_URL)
      .get("/clients?limit=1&offset=1")
      .reply(200, []);

    expect.assertions(1);
    await expect(client.getClients(1, 1)).resolves.toEqual([]);
  });

  test("request fails with expected error", async () => {
    const MOCK_ERROR = {
      error: "error",
      error_code: 500,
      error_debug: "debug",
      error_hint: "hint",
    };

    nock(MOCK_URL)
      .get("/clients")
      .reply(500, MOCK_ERROR);

    expect.assertions(1);
    await expect(client.getClients()).rejects.toMatchObject(MOCK_ERROR);
  });
});
