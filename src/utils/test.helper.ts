import { test } from '../fixtures/global-setup';
import { ApiReqresPage } from '../pom/reqres.page';

export const setupTest = () => {
    // Declare variable outside to track across scope
    const testData = {
        apiClient: undefined as ApiReqresPage | undefined
    };

    test.beforeAll(async ({ authenticatedRequest }) => {
        testData.apiClient = new ApiReqresPage(authenticatedRequest);
    });

    return {
        get apiClient() {
            if (!testData.apiClient) {
                throw new Error('API Client not initialized');
            }
            return testData.apiClient;
        }
    };
};


// export const setupTest = () => {
//     let apiClient: ApiReqresPage;

//     test.beforeAll(async ({ authenticatedRequest }) => {
//         // Setup chỉ chạy một lần
//         apiClient = new ApiReqresPage(authenticatedRequest);
//     });

//     return { apiClient };
// };