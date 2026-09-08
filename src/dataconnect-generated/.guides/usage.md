# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateClient, useUpdateClientStatus, useDeleteClient, useCreateIntegration, useDeleteIntegration, useCreateClientIntegration, useUpdateClientIntegrationStatus, useDeleteClientIntegration, useCreateAutomation, useUpdateAutomationStatus } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateClient(createClientVars);

const { data, isPending, isSuccess, isError, error } = useUpdateClientStatus(updateClientStatusVars);

const { data, isPending, isSuccess, isError, error } = useDeleteClient(deleteClientVars);

const { data, isPending, isSuccess, isError, error } = useCreateIntegration(createIntegrationVars);

const { data, isPending, isSuccess, isError, error } = useDeleteIntegration(deleteIntegrationVars);

const { data, isPending, isSuccess, isError, error } = useCreateClientIntegration(createClientIntegrationVars);

const { data, isPending, isSuccess, isError, error } = useUpdateClientIntegrationStatus(updateClientIntegrationStatusVars);

const { data, isPending, isSuccess, isError, error } = useDeleteClientIntegration(deleteClientIntegrationVars);

const { data, isPending, isSuccess, isError, error } = useCreateAutomation(createAutomationVars);

const { data, isPending, isSuccess, isError, error } = useUpdateAutomationStatus(updateAutomationStatusVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createClient, updateClientStatus, deleteClient, createIntegration, deleteIntegration, createClientIntegration, updateClientIntegrationStatus, deleteClientIntegration, createAutomation, updateAutomationStatus } from '@dataconnect/generated';


// Operation CreateClient:  For variables, look at type CreateClientVars in ../index.d.ts
const { data } = await CreateClient(dataConnect, createClientVars);

// Operation UpdateClientStatus:  For variables, look at type UpdateClientStatusVars in ../index.d.ts
const { data } = await UpdateClientStatus(dataConnect, updateClientStatusVars);

// Operation DeleteClient:  For variables, look at type DeleteClientVars in ../index.d.ts
const { data } = await DeleteClient(dataConnect, deleteClientVars);

// Operation CreateIntegration:  For variables, look at type CreateIntegrationVars in ../index.d.ts
const { data } = await CreateIntegration(dataConnect, createIntegrationVars);

// Operation DeleteIntegration:  For variables, look at type DeleteIntegrationVars in ../index.d.ts
const { data } = await DeleteIntegration(dataConnect, deleteIntegrationVars);

// Operation CreateClientIntegration:  For variables, look at type CreateClientIntegrationVars in ../index.d.ts
const { data } = await CreateClientIntegration(dataConnect, createClientIntegrationVars);

// Operation UpdateClientIntegrationStatus:  For variables, look at type UpdateClientIntegrationStatusVars in ../index.d.ts
const { data } = await UpdateClientIntegrationStatus(dataConnect, updateClientIntegrationStatusVars);

// Operation DeleteClientIntegration:  For variables, look at type DeleteClientIntegrationVars in ../index.d.ts
const { data } = await DeleteClientIntegration(dataConnect, deleteClientIntegrationVars);

// Operation CreateAutomation:  For variables, look at type CreateAutomationVars in ../index.d.ts
const { data } = await CreateAutomation(dataConnect, createAutomationVars);

// Operation UpdateAutomationStatus:  For variables, look at type UpdateAutomationStatusVars in ../index.d.ts
const { data } = await UpdateAutomationStatus(dataConnect, updateAutomationStatusVars);


```