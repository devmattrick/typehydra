import fetch from "node-fetch";
import urljoin = require("url-join");

import { URLSearchParams } from "url";
import AcceptConsentRequest from "./types/AcceptConsentRequest";
import AcceptLoginRequest from "./types/AcceptLoginRequest";
import CompletedRequest from "./types/CompletedRequest";
import ConsentRequest from "./types/ConsentRequest";
import EmptyResponse from "./types/EmptyResponse";
/* tslint:disable-next-line */
import FlushInactiveOAuth2TokensRequest from "./types/FlushInactiveOAuth2TokensRequest";
import GenericError from "./types/GenericError";
import HealthStatus from "./types/HealthStatus";
import JSONWebKey from "./types/JSONWebKey";
import JSONWebKeySet from "./types/JSONWebKeySet";
/* tslint:disable-next-line */
import JSONWebKeySetGeneratorRequest from "./types/JSONWebKeySetGeneratorRequest";
import OAuth2Client from "./types/OAuth2Client";
import OAuth2TokenIntrospection from "./types/OAuth2TokenIntrospection";
import PreviousConsentSession from "./types/PreviousConsentSession";
import RejectRequest from "./types/RejectRequest";
import Version from "./types/Version";

export default class HydraClient {

  private uri: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  public getURI() {
    return this.uri;
  }

  public async getClients(): Promise<OAuth2Client[]> {
    return this.get<OAuth2Client[]>("/clients");
  }

  public async createClient(client: OAuth2Client): Promise<OAuth2Client> {
    return this.post<OAuth2Client>("/clients", client);
  }

  public async getClient(id: string): Promise<OAuth2Client> {
    return this.get<OAuth2Client>(`/clients/${id}`);
  }

  public async updateClient(
    id: string,
    client: OAuth2Client,
  ): Promise<OAuth2Client> {
    return this.put<OAuth2Client>(`/clients/${id}`, client);
  }

  public async deleteClient(id: string): Promise<EmptyResponse> {
    return this.delete<EmptyResponse>(`/clients/${id}`);
  }

  public async getJSONWebKeySet(set: string) {
    return this.get<JSONWebKeySet>(`/keys/${set}`);
  }

  public async updateJSONWebKeySet(
    set: string,
    body: JSONWebKeySet,
  ): Promise<JSONWebKeySet> {
    return this.put(`/keys/${set}`, body);
  }

  public async generateJSONWebKey(
    set: string,
    body: JSONWebKeySetGeneratorRequest,
  ): Promise<JSONWebKeySet> {
    return this.post<JSONWebKeySet>(`/keys/${set}`, body);
  }

  public async deleteJSONWebKeySet(set: string): Promise<EmptyResponse> {
    return this.delete<EmptyResponse>(`/keys/${set}`);
  }

  public async fetchJSONWebKey(
    kid: string,
    set: string,
  ): Promise<JSONWebKeySet> {
    return this.get<JSONWebKeySet>(`/keys/${set}/${kid}`);
  }

  public async updateJSONWebKey(
    set: string,
    kid: string,
    body: JSONWebKey,
  ): Promise<JSONWebKey> {
    return this.put<JSONWebKey>(`/keys/${set}/${kid}`, body);
  }

  public async deleteJSONWebKey(
    set: string,
    kid: string,
  ): Promise<EmptyResponse> {
    return this.delete<EmptyResponse>(`/keys/${set}/${kid}`);
  }

  public async getConsentRequest(challenge: string): Promise<ConsentRequest> {
    return this.get<ConsentRequest>(
      `/oauth2/auth/requests/consent/${challenge}`,
    );
  }

  public async acceptConsentRequest(
    challenge: string,
    body: AcceptConsentRequest,
  ): Promise<CompletedRequest> {
    return this.put<CompletedRequest>(
      `/oauth2/auth/requests/consent/${challenge}/accept`,
      body,
    );
  }

  public async rejectConsentRequest(
    challenge: string,
    body: AcceptConsentRequest,
  ): Promise<CompletedRequest> {
    return this.put<CompletedRequest>(
      `/oauth2/auth/requests/consent/${challenge}/reject`,
      body,
    );
  }

  public async getLoginRequest(challenge: string): Promise<ConsentRequest> {
    return this.get<ConsentRequest>(
      `/oauth2/auth/requests/login/${challenge}`,
    );
  }

  public async acceptLoginRequest(
    challenge: string,
    body: AcceptLoginRequest,
  ): Promise<CompletedRequest> {
    return this.put<CompletedRequest>(
      `/oauth2/auth/requests/login/${challenge}/accept`,
      body,
    );
  }

  public async rejectLoginRequest(
    challenge: string,
    body: RejectRequest,
  ): Promise<CompletedRequest> {
    return this.put<CompletedRequest>(
      `/oauth2/auth/requests/login/${challenge}/reject`,
      body,
    );
  }

  public async getConsentSessions(
    user: string,
  ): Promise<[PreviousConsentSession]> {
    return this.get<[PreviousConsentSession]>(
      `/oauth2/auth/sessions/consent/${user}`,
    );
  }

  public async revokeConsentSessions(user: string): Promise<EmptyResponse> {
    return this.delete<EmptyResponse>(`/oauth2/auth/sessions/consent/${user}`);
  }

  public async revokeConsentSession(
    user: string,
    client: string,
  ): Promise<EmptyResponse> {
    return this.delete<EmptyResponse>(
      `/oauth2/auth/sessions/consent/${user}/${client}`,
    );
  }

  public async invalidateUserSession(user: string): Promise<EmptyResponse> {
    return this.delete<EmptyResponse>(`/oauth2/auth/sessions/login/${user}`);
  }

  public async flushExpiredOAuth2AccessTokens(
    body?: FlushInactiveOAuth2TokensRequest,
  ): Promise<EmptyResponse> {
    return this.post<EmptyResponse>("/oauth2/flush", body);
  }

  public async introspectOAuth2Token(
    token: string,
    scope?: string,
  ): Promise<OAuth2TokenIntrospection> {
    // This endpoint uses application/x-www-form-urlencoded isntead of
    // application/json, so we need to handle it differently.

    const body = new URLSearchParams();
    body.append("token", token);

    if (scope) {
      body.append("scope", scope);
    }

    return fetch(this.joinPath("/oauth2/introspect"), {
      body,
      headers: {
        "Accept":       "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    })
      .then((res) => res.json());
  }

  public async checkAliveStatus(): Promise<HealthStatus> {
    return this.get<HealthStatus>("/health/alive");
  }

  public async checkReadinessStatus(): Promise<HealthStatus> {
    return this.get<HealthStatus>("/health/ready");
  }

  public async getVersion(): Promise<Version> {
    return this.get<Version>("/version");
  }

  private async get<T>(path: string): Promise<T> {
    return fetch(this.joinPath(path), {
      headers: {
        Accept: "application/json",
      },
      method: "GET",
    })
      .then((res) => res.json());
  }

  private async post<T>(path: string, body?: object): Promise<T> {
    return fetch(this.joinPath(path), {
      body: JSON.stringify(body),
      headers: {
        "Accept":       "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((res) => res.json());
  }

  private async put<T>(path: string, body?: object): Promise<T> {
    return fetch(this.joinPath(path), {
      body: JSON.stringify(body),
      headers: {
        "Accept":       "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
    })
      .then((res) => res.json());
  }

  private async delete<T>(path: string): Promise<T> {
    return fetch(this.joinPath(path), {
      headers: {
        Accept: "application/json",
      },
      method: "DELETE",
    })
      .then((res) => res.json());
  }

  private joinPath(path: string) {
    return urljoin(this.uri, path);
  }

}
