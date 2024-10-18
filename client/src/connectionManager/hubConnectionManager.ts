import * as signalR from '@microsoft/signalr';
import { times } from 'lodash';
import { Subject } from 'rxjs';

const connectionHubs = ['RpsBondHub'] as const;

export type ConnectionHub = (typeof connectionHubs)[number];

const defaultRetrials = [0, 2_000, 10_000, 30_000];
const fastRetrials = times(
  configuration.signalR?.fastRetrials.times ?? 0,
  () => configuration.signalR?.fastRetrials.durationMs ?? 0,
);
const longRetrials = times(
  configuration.signalR?.longRetrials.times ?? 0,
  () => configuration.signalR?.longRetrials.durationMs ?? 0,
);
const retrialPolicy = [...defaultRetrials, ...fastRetrials, ...longRetrials];

export class HubConnectionManager {
  #connection: signalR.HubConnection;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #methodNameSubjectsMap: Record<string, { subject: Subject<any>; observer: (data: any) => void }> = {};
  #groupName: string | undefined = undefined;

  constructor(hubName: ConnectionHub) {
    this.#connection = this.#createConnection(hubName);
    this.#connection.serverTimeoutInMilliseconds = 60_000;
    this.#connection.keepAliveIntervalInMilliseconds = 10_000;
  }

  public subscribe<T>(methodName: string, callback: (data: T | null) => void): void {
    const methodNameSource = this.#methodNameSubjectsMap[methodName];
    if (!methodNameSource) {
      this.#initSubscription<T>(methodName, callback);
    }
  }

  public unsubscribe(methodName: string): void {
    const methodNameSource = this.#methodNameSubjectsMap[methodName];
    if (methodNameSource) {
      this.#connection.off(methodName);
      methodNameSource.subject.complete();

      delete this.#methodNameSubjectsMap[methodName];
    }
  }

  public start(): void {
    if (this.#connection.state === 'Disconnected') {
      Object.keys(this.#methodNameSubjectsMap).forEach((methodName) =>
        this.#initSubscription(methodName, this.#methodNameSubjectsMap[methodName].observer),
      );
      this.#handleConnectionClose();
      const onConnectionEstablished = () => this.#groupName && this.#connection.invoke('Subscribe', this.#groupName);
      this.#connection.start().then(onConnectionEstablished);
      this.#connection.onreconnected(onConnectionEstablished);
    }
  }

  public subscribeToGroup(groupName: string): void {
    this.#groupName = groupName;
    if (this.#connection.state === 'Connected') {
      this.#connection.invoke('Subscribe', groupName);
    }
  }

  public unsubscribeFromGroup(groupName: string): void {
    this.#connection.invoke('Unsubscribe', groupName);
  }

  public stop(): void {
    if (this.#connection.state !== 'Disconnected') {
      Object.keys(this.#methodNameSubjectsMap).forEach((methodName) => this.#connection.off(methodName));
      this.#connection.stop();
    }
  }

  #initSubscription<T>(methodName: string, callback: (data: T | null) => void) {
    const subject = new Subject<T | null>();
    this.#methodNameSubjectsMap[methodName] = { subject, observer: callback };
    this.#connection.on(methodName, this.#getConnectionCallback(subject));
    subject.subscribe(callback);
  }

  #createConnection(hubName: ConnectionHub): signalR.HubConnection {
    const hubUrl = `${configuration.serverUrl}${hubName}`;
    return new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect(retrialPolicy)
      .withKeepAliveInterval(10_000)
      .withServerTimeout(60_000)
      .build();
  }

  #handleConnectionClose(): void {
    this.#connection.onclose((error) => {
      const subjects = Object.values(this.#methodNameSubjectsMap);
      error
        ? subjects.forEach(({ subject }) => subject.error(error))
        : subjects.forEach(({ subject }) => subject.complete());
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #getConnectionCallback(subject: Subject<any>): (message: string | object) => void {
    return (message: string | object) => {
      subject.next(typeof message === 'string' ? JSON.parse(message) : message);
    };
  }
}
