export interface TestStep {
    testStepId?: number,
    description?: string,
    expected?:string,
    testCaseId?: number,
    order?: number,
    createdBY?: number,
    deleted?: boolean,
    actualResults?: string,
    screenshots?: string[],
    importedTestCaseId?: number,
    status?: number,
    index?: number
}
