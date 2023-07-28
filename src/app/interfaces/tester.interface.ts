import { Browser } from "./browser.interface";

export interface Tester {
    testerId?: number,
    email?: string,
    firstname?: string,
    lastname?: string,
    instructions?: string,
    browsers?: Browser[]
}
