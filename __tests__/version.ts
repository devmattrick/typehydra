import HydraClient from "../src";
import nock = require("nock");

const MOCK_URL = "http://localhost";

describe("/version endpoint", () => {
  let client: HydraClient;

  beforeEach(() => {
    client = new HydraClient(MOCK_URL);
  });

  test("request succeeds with expected version", async () => {
    const MOCK_VERSION = "v1.0.0-rc.6+oryOS.10";

    nock(MOCK_URL)
      .get("/version")
      .reply(200, {
        version: MOCK_VERSION
      });

    expect.assertions(1);
    await expect(client.getVersion()).resolves.toBe(MOCK_VERSION);
  });
});
