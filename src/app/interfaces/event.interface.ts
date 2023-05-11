import { Browser } from "./device.interface";
import { Environment } from "./environment.interface";
import { Tester } from "./tester.interface";

export interface Event {
    eventId?: number,
    title?: string,
    description?: string,
    caseId?: number,
    environment?: Environment,
    testers?: Tester[],
    browsers?: Browser[],
}

export interface ServerResponse <T> {
    result: T
}