import { Screenshot } from "./screenshot.interface";

export interface TestStep {
    testStepId?: number,
    description?: string,
    expected?:string,
    testCaseId?: number,
    order?: number,
    createdBY?: number,
    deleted?: boolean,
    actualResult?: string,
    screenshots?: Screenshot[],
    importedTestCaseId?: number,
    status?: string,
    index?: number,
    result?: string,
    sequence?: number,
    testStepExecutionId?: number,
}
