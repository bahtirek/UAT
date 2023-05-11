export interface TestStep {
    testStepId?: number,
    description?: string,
    expected?:string,
    testCaseId?: number,
    order?: number,
    createdBY?: number,
    deleted?: boolean,
    importedTestCaseId?: number
}