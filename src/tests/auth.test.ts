import { describe, it, expect } from "vitest";
import { getAPIKey } from "../api/auth";
import { IncomingHttpHeaders } from "http";

describe("getAPIKey", () => {
  it("returns null when no authorization header is present", () => {
    const headers: IncomingHttpHeaders = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns null when authorization header format is incorrect", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "invalidformat",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns null when authorization header does not start with ApiKey", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer abc123",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns api key when authorization header is valid", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey abc123",
    };
    expect(getAPIKey(headers)).toBe("abc123");
  });
});
