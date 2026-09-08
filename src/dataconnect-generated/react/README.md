# Generated React README
This README will guide you through the process of using the generated React SDK package for the connector `platform-preview`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `JavaScript README`, you can find it at [`dataconnect-generated/README.md`](../README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@dataconnect/generated/react` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#react).

# Table of Contents
- [**Overview**](#generated-react-readme)
- [**TanStack Query Firebase & TanStack React Query**](#tanstack-query-firebase-tanstack-react-query)
  - [*Package Installation*](#installing-tanstack-query-firebase-and-tanstack-react-query-packages)
  - [*Configuring TanStack Query*](#configuring-tanstack-query)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListClients*](#listclients)
  - [*GetPersonaOverview*](#getpersonaoverview)
  - [*GetPersonaAutomations*](#getpersonaautomations)
  - [*GetPersonaIntegrations*](#getpersonaintegrations)
  - [*GetPersonaCommunications*](#getpersonacommunications)
  - [*GetPersonaReports*](#getpersonareports)
- [**Mutations**](#mutations)
  - [*CreateClient*](#createclient)
  - [*UpdateClientStatus*](#updateclientstatus)
  - [*DeleteClient*](#deleteclient)
  - [*CreateIntegration*](#createintegration)
  - [*DeleteIntegration*](#deleteintegration)
  - [*CreateClientIntegration*](#createclientintegration)
  - [*UpdateClientIntegrationStatus*](#updateclientintegrationstatus)
  - [*DeleteClientIntegration*](#deleteclientintegration)
  - [*CreateAutomation*](#createautomation)
  - [*UpdateAutomationStatus*](#updateautomationstatus)
  - [*DeleteAutomation*](#deleteautomation)
  - [*CreateAutomationRun*](#createautomationrun)
  - [*DeleteAutomationRun*](#deleteautomationrun)
  - [*CreateCommunication*](#createcommunication)
  - [*DeleteCommunication*](#deletecommunication)
  - [*CreateMetricsSnapshot*](#createmetricssnapshot)
  - [*DeleteMetricsSnapshot*](#deletemetricssnapshot)

# TanStack Query Firebase & TanStack React Query
This SDK provides [React](https://react.dev/) hooks generated specific to your application, for the operations found in the connector `platform-preview`. These hooks are generated using [TanStack Query Firebase](https://react-query-firebase.invertase.dev/) by our partners at Invertase, a library built on top of [TanStack React Query v5](https://tanstack.com/query/v5/docs/framework/react/overview).

***You do not need to be familiar with Tanstack Query or Tanstack Query Firebase to use this SDK.*** However, you may find it useful to learn more about them, as they will empower you as a user of this Generated React SDK.

## Installing TanStack Query Firebase and TanStack React Query Packages
In order to use the React generated SDK, you must install the `TanStack React Query` and `TanStack Query Firebase` packages.
```bash
npm i --save @tanstack/react-query @tanstack-query-firebase/react
```
```bash
npm i --save firebase@latest # Note: React has a peer dependency on ^11.3.0
```

You can also follow the installation instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#tanstack-install), or the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react) and [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/installation).

## Configuring TanStack Query
In order to use the React generated SDK in your application, you must wrap your application's component tree in a `QueryClientProvider` component from TanStack React Query. None of your generated React SDK hooks will work without this provider.

```javascript
import { QueryClientProvider } from '@tanstack/react-query';

// Create a TanStack Query client instance
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <MyApplication />
    </QueryClientProvider>
  )
}
```

To learn more about `QueryClientProvider`, see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/quick-start) and the [TanStack Query Firebase documentation](https://invertase.docs.page/tanstack-query-firebase/react#usage).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `platform-preview`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#emulator-react-angular).

```javascript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) using the hooks provided from your generated React SDK.

# Queries

The React generated SDK provides Query hook functions that call and return [`useDataConnectQuery`](https://react-query-firebase.invertase.dev/react/data-connect/querying) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and the most recent data returned by the Query, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/querying).

TanStack React Query caches the results of your Queries, so using the same Query hook function in multiple places in your application allows the entire application to automatically see updates to that Query's data.

Query hooks execute their Queries automatically when called, and periodically refresh, unless you change the `queryOptions` for the Query. To learn how to stop a Query from automatically executing, including how to make a query "lazy", see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries).

To learn more about TanStack React Query's Queries, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/queries).

## Using Query Hooks
Here's a general overview of how to use the generated Query hooks in your code:

- If the Query has no variables, the Query hook function does not require arguments.
- If the Query has any required variables, the Query hook function will require at least one argument: an object that contains all the required variables for the Query.
- If the Query has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Query's variables are optional, the Query hook function does not require any arguments.
- Query hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Query hooks functions can be called with or without passing in an `options` argument of type `useDataConnectQueryOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/query-options).
  - ***Special case:***  If the Query has all optional variables and you would like to provide an `options` argument to the Query hook function without providing any variables, you must pass `undefined` where you would normally pass the Query's variables, and then may provide the `options` argument.

Below are examples of how to use the `platform-preview` connector's generated Query hook functions to execute each Query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## ListClients
You can execute the `ListClients` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListClients(dc: DataConnect, options?: useDataConnectQueryOptions<ListClientsData>): UseDataConnectQueryResult<ListClientsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListClients(options?: useDataConnectQueryOptions<ListClientsData>): UseDataConnectQueryResult<ListClientsData, undefined>;
```

### Variables
The `ListClients` Query has no variables.
### Return Type
Recall that calling the `ListClients` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListClients` Query is of type `ListClientsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListClientsData {
  clients: ({
    id: UUIDString;
    name: string;
    industry: string;
    status: string;
  } & Client_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListClients`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListClients } from '@dataconnect/generated/react'

export default function ListClientsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListClients();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListClients(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListClients(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListClients(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.clients);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetPersonaOverview
You can execute the `GetPersonaOverview` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetPersonaOverview(dc: DataConnect, vars: GetPersonaOverviewVariables, options?: useDataConnectQueryOptions<GetPersonaOverviewData>): UseDataConnectQueryResult<GetPersonaOverviewData, GetPersonaOverviewVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetPersonaOverview(vars: GetPersonaOverviewVariables, options?: useDataConnectQueryOptions<GetPersonaOverviewData>): UseDataConnectQueryResult<GetPersonaOverviewData, GetPersonaOverviewVariables>;
```

### Variables
The `GetPersonaOverview` Query requires an argument of type `GetPersonaOverviewVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetPersonaOverviewVariables {
  industry: string;
}
```
### Return Type
Recall that calling the `GetPersonaOverview` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetPersonaOverview` Query is of type `GetPersonaOverviewData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetPersonaOverviewData {
  clients: ({
    id: UUIDString;
    name: string;
    industry: string;
    contactName?: string | null;
    contactEmail?: string | null;
    status: string;
    createdAt: TimestampString;
  } & Client_Key)[];
  automations: ({
    id: UUIDString;
    name: string;
    status: string;
  } & Automation_Key)[];
  automationRuns: ({
    id: UUIDString;
    runAt: TimestampString;
    status: string;
    summary?: string | null;
    recordsProcessed?: number | null;
    automation: {
      id: UUIDString;
      name: string;
    } & Automation_Key;
  } & AutomationRun_Key)[];
  metricsSnapshots: ({
    hoursSaved: number;
    tasksAutomated: number;
    avgResponseSeconds?: number | null;
    snapshotDate: DateString;
  })[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetPersonaOverview`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetPersonaOverviewVariables } from '@dataconnect/generated';
import { useGetPersonaOverview } from '@dataconnect/generated/react'

export default function GetPersonaOverviewComponent() {
  // The `useGetPersonaOverview` Query hook requires an argument of type `GetPersonaOverviewVariables`:
  const getPersonaOverviewVars: GetPersonaOverviewVariables = {
    industry: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetPersonaOverview(getPersonaOverviewVars);
  // Variables can be defined inline as well.
  const query = useGetPersonaOverview({ industry: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetPersonaOverview(dataConnect, getPersonaOverviewVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetPersonaOverview(getPersonaOverviewVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetPersonaOverview(dataConnect, getPersonaOverviewVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.clients);
    console.log(query.data.automations);
    console.log(query.data.automationRuns);
    console.log(query.data.metricsSnapshots);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetPersonaAutomations
You can execute the `GetPersonaAutomations` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetPersonaAutomations(dc: DataConnect, vars: GetPersonaAutomationsVariables, options?: useDataConnectQueryOptions<GetPersonaAutomationsData>): UseDataConnectQueryResult<GetPersonaAutomationsData, GetPersonaAutomationsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetPersonaAutomations(vars: GetPersonaAutomationsVariables, options?: useDataConnectQueryOptions<GetPersonaAutomationsData>): UseDataConnectQueryResult<GetPersonaAutomationsData, GetPersonaAutomationsVariables>;
```

### Variables
The `GetPersonaAutomations` Query requires an argument of type `GetPersonaAutomationsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetPersonaAutomationsVariables {
  industry: string;
}
```
### Return Type
Recall that calling the `GetPersonaAutomations` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetPersonaAutomations` Query is of type `GetPersonaAutomationsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetPersonaAutomationsData {
  automations: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    triggerType: string;
    status: string;
    createdAt: TimestampString;
  } & Automation_Key)[];
  automationRuns: ({
    id: UUIDString;
    runAt: TimestampString;
    status: string;
    summary?: string | null;
    recordsProcessed?: number | null;
    automation: {
      id: UUIDString;
    } & Automation_Key;
  } & AutomationRun_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetPersonaAutomations`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetPersonaAutomationsVariables } from '@dataconnect/generated';
import { useGetPersonaAutomations } from '@dataconnect/generated/react'

export default function GetPersonaAutomationsComponent() {
  // The `useGetPersonaAutomations` Query hook requires an argument of type `GetPersonaAutomationsVariables`:
  const getPersonaAutomationsVars: GetPersonaAutomationsVariables = {
    industry: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetPersonaAutomations(getPersonaAutomationsVars);
  // Variables can be defined inline as well.
  const query = useGetPersonaAutomations({ industry: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetPersonaAutomations(dataConnect, getPersonaAutomationsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetPersonaAutomations(getPersonaAutomationsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetPersonaAutomations(dataConnect, getPersonaAutomationsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.automations);
    console.log(query.data.automationRuns);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetPersonaIntegrations
You can execute the `GetPersonaIntegrations` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetPersonaIntegrations(dc: DataConnect, vars: GetPersonaIntegrationsVariables, options?: useDataConnectQueryOptions<GetPersonaIntegrationsData>): UseDataConnectQueryResult<GetPersonaIntegrationsData, GetPersonaIntegrationsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetPersonaIntegrations(vars: GetPersonaIntegrationsVariables, options?: useDataConnectQueryOptions<GetPersonaIntegrationsData>): UseDataConnectQueryResult<GetPersonaIntegrationsData, GetPersonaIntegrationsVariables>;
```

### Variables
The `GetPersonaIntegrations` Query requires an argument of type `GetPersonaIntegrationsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetPersonaIntegrationsVariables {
  industry: string;
}
```
### Return Type
Recall that calling the `GetPersonaIntegrations` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetPersonaIntegrations` Query is of type `GetPersonaIntegrationsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetPersonaIntegrationsData {
  clientIntegrations: ({
    status: string;
    connectedAt?: TimestampString | null;
    integration: {
      id: UUIDString;
      name: string;
      category: string;
      logoUrl?: string | null;
    } & Integration_Key;
  })[];
  integrations: ({
    id: UUIDString;
    name: string;
    category: string;
    logoUrl?: string | null;
  } & Integration_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetPersonaIntegrations`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetPersonaIntegrationsVariables } from '@dataconnect/generated';
import { useGetPersonaIntegrations } from '@dataconnect/generated/react'

export default function GetPersonaIntegrationsComponent() {
  // The `useGetPersonaIntegrations` Query hook requires an argument of type `GetPersonaIntegrationsVariables`:
  const getPersonaIntegrationsVars: GetPersonaIntegrationsVariables = {
    industry: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetPersonaIntegrations(getPersonaIntegrationsVars);
  // Variables can be defined inline as well.
  const query = useGetPersonaIntegrations({ industry: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetPersonaIntegrations(dataConnect, getPersonaIntegrationsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetPersonaIntegrations(getPersonaIntegrationsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetPersonaIntegrations(dataConnect, getPersonaIntegrationsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.clientIntegrations);
    console.log(query.data.integrations);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetPersonaCommunications
You can execute the `GetPersonaCommunications` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetPersonaCommunications(dc: DataConnect, vars: GetPersonaCommunicationsVariables, options?: useDataConnectQueryOptions<GetPersonaCommunicationsData>): UseDataConnectQueryResult<GetPersonaCommunicationsData, GetPersonaCommunicationsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetPersonaCommunications(vars: GetPersonaCommunicationsVariables, options?: useDataConnectQueryOptions<GetPersonaCommunicationsData>): UseDataConnectQueryResult<GetPersonaCommunicationsData, GetPersonaCommunicationsVariables>;
```

### Variables
The `GetPersonaCommunications` Query requires an argument of type `GetPersonaCommunicationsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetPersonaCommunicationsVariables {
  industry: string;
}
```
### Return Type
Recall that calling the `GetPersonaCommunications` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetPersonaCommunications` Query is of type `GetPersonaCommunicationsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetPersonaCommunicationsData {
  communications: ({
    id: UUIDString;
    channel: string;
    direction: string;
    summary?: string | null;
    transcriptUrl?: string | null;
    occurredAt: TimestampString;
    handledBy: string;
  } & Communication_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetPersonaCommunications`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetPersonaCommunicationsVariables } from '@dataconnect/generated';
import { useGetPersonaCommunications } from '@dataconnect/generated/react'

export default function GetPersonaCommunicationsComponent() {
  // The `useGetPersonaCommunications` Query hook requires an argument of type `GetPersonaCommunicationsVariables`:
  const getPersonaCommunicationsVars: GetPersonaCommunicationsVariables = {
    industry: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetPersonaCommunications(getPersonaCommunicationsVars);
  // Variables can be defined inline as well.
  const query = useGetPersonaCommunications({ industry: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetPersonaCommunications(dataConnect, getPersonaCommunicationsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetPersonaCommunications(getPersonaCommunicationsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetPersonaCommunications(dataConnect, getPersonaCommunicationsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.communications);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetPersonaReports
You can execute the `GetPersonaReports` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetPersonaReports(dc: DataConnect, vars: GetPersonaReportsVariables, options?: useDataConnectQueryOptions<GetPersonaReportsData>): UseDataConnectQueryResult<GetPersonaReportsData, GetPersonaReportsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetPersonaReports(vars: GetPersonaReportsVariables, options?: useDataConnectQueryOptions<GetPersonaReportsData>): UseDataConnectQueryResult<GetPersonaReportsData, GetPersonaReportsVariables>;
```

### Variables
The `GetPersonaReports` Query requires an argument of type `GetPersonaReportsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetPersonaReportsVariables {
  industry: string;
}
```
### Return Type
Recall that calling the `GetPersonaReports` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetPersonaReports` Query is of type `GetPersonaReportsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetPersonaReportsData {
  metricsSnapshots: ({
    id: UUIDString;
    snapshotDate: DateString;
    hoursSaved: number;
    tasksAutomated: number;
    avgResponseSeconds?: number | null;
  } & MetricsSnapshot_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetPersonaReports`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetPersonaReportsVariables } from '@dataconnect/generated';
import { useGetPersonaReports } from '@dataconnect/generated/react'

export default function GetPersonaReportsComponent() {
  // The `useGetPersonaReports` Query hook requires an argument of type `GetPersonaReportsVariables`:
  const getPersonaReportsVars: GetPersonaReportsVariables = {
    industry: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetPersonaReports(getPersonaReportsVars);
  // Variables can be defined inline as well.
  const query = useGetPersonaReports({ industry: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetPersonaReports(dataConnect, getPersonaReportsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetPersonaReports(getPersonaReportsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetPersonaReports(dataConnect, getPersonaReportsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.metricsSnapshots);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

# Mutations

The React generated SDK provides Mutations hook functions that call and return [`useDataConnectMutation`](https://react-query-firebase.invertase.dev/react/data-connect/mutations) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, and the most recent data returned by the Mutation, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/mutations).

Mutation hooks do not execute their Mutations automatically when called. Rather, after calling the Mutation hook function and getting a `UseMutationResult` object, you must call the `UseMutationResult.mutate()` function to execute the Mutation.

To learn more about TanStack React Query's Mutations, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations).

## Using Mutation Hooks
Here's a general overview of how to use the generated Mutation hooks in your code:

- Mutation hook functions are not called with the arguments to the Mutation. Instead, arguments are passed to `UseMutationResult.mutate()`.
- If the Mutation has no variables, the `mutate()` function does not require arguments.
- If the Mutation has any required variables, the `mutate()` function will require at least one argument: an object that contains all the required variables for the Mutation.
- If the Mutation has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Mutation's variables are optional, the Mutation hook function does not require any arguments.
- Mutation hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Mutation hooks also accept an `options` argument of type `useDataConnectMutationOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations#mutation-side-effects).
  - `UseMutationResult.mutate()` also accepts an `options` argument of type `useDataConnectMutationOptions`.
  - ***Special case:*** If the Mutation has no arguments (or all optional arguments and you wish to provide none), and you want to pass `options` to `UseMutationResult.mutate()`, you must pass `undefined` where you would normally pass the Mutation's arguments, and then may provide the options argument.

Below are examples of how to use the `platform-preview` connector's generated Mutation hook functions to execute each Mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## CreateClient
You can execute the `CreateClient` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateClient(options?: useDataConnectMutationOptions<CreateClientData, FirebaseError, CreateClientVariables>): UseDataConnectMutationResult<CreateClientData, CreateClientVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateClient(dc: DataConnect, options?: useDataConnectMutationOptions<CreateClientData, FirebaseError, CreateClientVariables>): UseDataConnectMutationResult<CreateClientData, CreateClientVariables>;
```

### Variables
The `CreateClient` Mutation requires an argument of type `CreateClientVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateClientVariables {
  name: string;
  industry: string;
  contactName?: string | null;
  contactEmail?: string | null;
  status?: string | null;
}
```
### Return Type
Recall that calling the `CreateClient` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateClient` Mutation is of type `CreateClientData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateClientData {
  client_insert: Client_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateClient`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateClientVariables } from '@dataconnect/generated';
import { useCreateClient } from '@dataconnect/generated/react'

export default function CreateClientComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateClient();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateClient(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateClient(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateClient(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateClient` Mutation requires an argument of type `CreateClientVariables`:
  const createClientVars: CreateClientVariables = {
    name: ..., 
    industry: ..., 
    contactName: ..., // optional
    contactEmail: ..., // optional
    status: ..., // optional
  };
  mutation.mutate(createClientVars);
  // Variables can be defined inline as well.
  mutation.mutate({ name: ..., industry: ..., contactName: ..., contactEmail: ..., status: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createClientVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.client_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateClientStatus
You can execute the `UpdateClientStatus` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateClientStatus(options?: useDataConnectMutationOptions<UpdateClientStatusData, FirebaseError, UpdateClientStatusVariables>): UseDataConnectMutationResult<UpdateClientStatusData, UpdateClientStatusVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateClientStatus(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateClientStatusData, FirebaseError, UpdateClientStatusVariables>): UseDataConnectMutationResult<UpdateClientStatusData, UpdateClientStatusVariables>;
```

### Variables
The `UpdateClientStatus` Mutation requires an argument of type `UpdateClientStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateClientStatusVariables {
  id: UUIDString;
  status: string;
}
```
### Return Type
Recall that calling the `UpdateClientStatus` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateClientStatus` Mutation is of type `UpdateClientStatusData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateClientStatusData {
  client_update?: Client_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateClientStatus`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateClientStatusVariables } from '@dataconnect/generated';
import { useUpdateClientStatus } from '@dataconnect/generated/react'

export default function UpdateClientStatusComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateClientStatus();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateClientStatus(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateClientStatus(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateClientStatus(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateClientStatus` Mutation requires an argument of type `UpdateClientStatusVariables`:
  const updateClientStatusVars: UpdateClientStatusVariables = {
    id: ..., 
    status: ..., 
  };
  mutation.mutate(updateClientStatusVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., status: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateClientStatusVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.client_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteClient
You can execute the `DeleteClient` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteClient(options?: useDataConnectMutationOptions<DeleteClientData, FirebaseError, DeleteClientVariables>): UseDataConnectMutationResult<DeleteClientData, DeleteClientVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteClient(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteClientData, FirebaseError, DeleteClientVariables>): UseDataConnectMutationResult<DeleteClientData, DeleteClientVariables>;
```

### Variables
The `DeleteClient` Mutation requires an argument of type `DeleteClientVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteClientVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteClient` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteClient` Mutation is of type `DeleteClientData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteClientData {
  client_delete?: Client_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteClient`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteClientVariables } from '@dataconnect/generated';
import { useDeleteClient } from '@dataconnect/generated/react'

export default function DeleteClientComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteClient();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteClient(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteClient(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteClient(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteClient` Mutation requires an argument of type `DeleteClientVariables`:
  const deleteClientVars: DeleteClientVariables = {
    id: ..., 
  };
  mutation.mutate(deleteClientVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteClientVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.client_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateIntegration
You can execute the `CreateIntegration` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateIntegration(options?: useDataConnectMutationOptions<CreateIntegrationData, FirebaseError, CreateIntegrationVariables>): UseDataConnectMutationResult<CreateIntegrationData, CreateIntegrationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateIntegration(dc: DataConnect, options?: useDataConnectMutationOptions<CreateIntegrationData, FirebaseError, CreateIntegrationVariables>): UseDataConnectMutationResult<CreateIntegrationData, CreateIntegrationVariables>;
```

### Variables
The `CreateIntegration` Mutation requires an argument of type `CreateIntegrationVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateIntegrationVariables {
  name: string;
  category: string;
  logoUrl?: string | null;
}
```
### Return Type
Recall that calling the `CreateIntegration` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateIntegration` Mutation is of type `CreateIntegrationData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateIntegrationData {
  integration_insert: Integration_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateIntegration`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateIntegrationVariables } from '@dataconnect/generated';
import { useCreateIntegration } from '@dataconnect/generated/react'

export default function CreateIntegrationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateIntegration();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateIntegration(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateIntegration(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateIntegration(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateIntegration` Mutation requires an argument of type `CreateIntegrationVariables`:
  const createIntegrationVars: CreateIntegrationVariables = {
    name: ..., 
    category: ..., 
    logoUrl: ..., // optional
  };
  mutation.mutate(createIntegrationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ name: ..., category: ..., logoUrl: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createIntegrationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.integration_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteIntegration
You can execute the `DeleteIntegration` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteIntegration(options?: useDataConnectMutationOptions<DeleteIntegrationData, FirebaseError, DeleteIntegrationVariables>): UseDataConnectMutationResult<DeleteIntegrationData, DeleteIntegrationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteIntegration(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteIntegrationData, FirebaseError, DeleteIntegrationVariables>): UseDataConnectMutationResult<DeleteIntegrationData, DeleteIntegrationVariables>;
```

### Variables
The `DeleteIntegration` Mutation requires an argument of type `DeleteIntegrationVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteIntegrationVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteIntegration` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteIntegration` Mutation is of type `DeleteIntegrationData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteIntegrationData {
  integration_delete?: Integration_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteIntegration`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteIntegrationVariables } from '@dataconnect/generated';
import { useDeleteIntegration } from '@dataconnect/generated/react'

export default function DeleteIntegrationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteIntegration();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteIntegration(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteIntegration(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteIntegration(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteIntegration` Mutation requires an argument of type `DeleteIntegrationVariables`:
  const deleteIntegrationVars: DeleteIntegrationVariables = {
    id: ..., 
  };
  mutation.mutate(deleteIntegrationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteIntegrationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.integration_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateClientIntegration
You can execute the `CreateClientIntegration` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateClientIntegration(options?: useDataConnectMutationOptions<CreateClientIntegrationData, FirebaseError, CreateClientIntegrationVariables>): UseDataConnectMutationResult<CreateClientIntegrationData, CreateClientIntegrationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateClientIntegration(dc: DataConnect, options?: useDataConnectMutationOptions<CreateClientIntegrationData, FirebaseError, CreateClientIntegrationVariables>): UseDataConnectMutationResult<CreateClientIntegrationData, CreateClientIntegrationVariables>;
```

### Variables
The `CreateClientIntegration` Mutation requires an argument of type `CreateClientIntegrationVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateClientIntegrationVariables {
  clientId: UUIDString;
  integrationId: UUIDString;
  status?: string | null;
  connectedAt?: TimestampString | null;
}
```
### Return Type
Recall that calling the `CreateClientIntegration` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateClientIntegration` Mutation is of type `CreateClientIntegrationData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateClientIntegrationData {
  clientIntegration_insert: ClientIntegration_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateClientIntegration`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateClientIntegrationVariables } from '@dataconnect/generated';
import { useCreateClientIntegration } from '@dataconnect/generated/react'

export default function CreateClientIntegrationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateClientIntegration();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateClientIntegration(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateClientIntegration(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateClientIntegration(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateClientIntegration` Mutation requires an argument of type `CreateClientIntegrationVariables`:
  const createClientIntegrationVars: CreateClientIntegrationVariables = {
    clientId: ..., 
    integrationId: ..., 
    status: ..., // optional
    connectedAt: ..., // optional
  };
  mutation.mutate(createClientIntegrationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ clientId: ..., integrationId: ..., status: ..., connectedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createClientIntegrationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.clientIntegration_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateClientIntegrationStatus
You can execute the `UpdateClientIntegrationStatus` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateClientIntegrationStatus(options?: useDataConnectMutationOptions<UpdateClientIntegrationStatusData, FirebaseError, UpdateClientIntegrationStatusVariables>): UseDataConnectMutationResult<UpdateClientIntegrationStatusData, UpdateClientIntegrationStatusVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateClientIntegrationStatus(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateClientIntegrationStatusData, FirebaseError, UpdateClientIntegrationStatusVariables>): UseDataConnectMutationResult<UpdateClientIntegrationStatusData, UpdateClientIntegrationStatusVariables>;
```

### Variables
The `UpdateClientIntegrationStatus` Mutation requires an argument of type `UpdateClientIntegrationStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateClientIntegrationStatusVariables {
  clientId: UUIDString;
  integrationId: UUIDString;
  status: string;
}
```
### Return Type
Recall that calling the `UpdateClientIntegrationStatus` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateClientIntegrationStatus` Mutation is of type `UpdateClientIntegrationStatusData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateClientIntegrationStatusData {
  clientIntegration_update?: ClientIntegration_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateClientIntegrationStatus`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateClientIntegrationStatusVariables } from '@dataconnect/generated';
import { useUpdateClientIntegrationStatus } from '@dataconnect/generated/react'

export default function UpdateClientIntegrationStatusComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateClientIntegrationStatus();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateClientIntegrationStatus(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateClientIntegrationStatus(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateClientIntegrationStatus(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateClientIntegrationStatus` Mutation requires an argument of type `UpdateClientIntegrationStatusVariables`:
  const updateClientIntegrationStatusVars: UpdateClientIntegrationStatusVariables = {
    clientId: ..., 
    integrationId: ..., 
    status: ..., 
  };
  mutation.mutate(updateClientIntegrationStatusVars);
  // Variables can be defined inline as well.
  mutation.mutate({ clientId: ..., integrationId: ..., status: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateClientIntegrationStatusVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.clientIntegration_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteClientIntegration
You can execute the `DeleteClientIntegration` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteClientIntegration(options?: useDataConnectMutationOptions<DeleteClientIntegrationData, FirebaseError, DeleteClientIntegrationVariables>): UseDataConnectMutationResult<DeleteClientIntegrationData, DeleteClientIntegrationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteClientIntegration(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteClientIntegrationData, FirebaseError, DeleteClientIntegrationVariables>): UseDataConnectMutationResult<DeleteClientIntegrationData, DeleteClientIntegrationVariables>;
```

### Variables
The `DeleteClientIntegration` Mutation requires an argument of type `DeleteClientIntegrationVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteClientIntegrationVariables {
  clientId: UUIDString;
  integrationId: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteClientIntegration` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteClientIntegration` Mutation is of type `DeleteClientIntegrationData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteClientIntegrationData {
  clientIntegration_delete?: ClientIntegration_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteClientIntegration`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteClientIntegrationVariables } from '@dataconnect/generated';
import { useDeleteClientIntegration } from '@dataconnect/generated/react'

export default function DeleteClientIntegrationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteClientIntegration();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteClientIntegration(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteClientIntegration(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteClientIntegration(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteClientIntegration` Mutation requires an argument of type `DeleteClientIntegrationVariables`:
  const deleteClientIntegrationVars: DeleteClientIntegrationVariables = {
    clientId: ..., 
    integrationId: ..., 
  };
  mutation.mutate(deleteClientIntegrationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ clientId: ..., integrationId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteClientIntegrationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.clientIntegration_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateAutomation
You can execute the `CreateAutomation` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateAutomation(options?: useDataConnectMutationOptions<CreateAutomationData, FirebaseError, CreateAutomationVariables>): UseDataConnectMutationResult<CreateAutomationData, CreateAutomationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateAutomation(dc: DataConnect, options?: useDataConnectMutationOptions<CreateAutomationData, FirebaseError, CreateAutomationVariables>): UseDataConnectMutationResult<CreateAutomationData, CreateAutomationVariables>;
```

### Variables
The `CreateAutomation` Mutation requires an argument of type `CreateAutomationVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateAutomationVariables {
  clientId: UUIDString;
  name: string;
  description?: string | null;
  triggerType: string;
  status?: string | null;
}
```
### Return Type
Recall that calling the `CreateAutomation` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateAutomation` Mutation is of type `CreateAutomationData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateAutomationData {
  automation_insert: Automation_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateAutomation`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateAutomationVariables } from '@dataconnect/generated';
import { useCreateAutomation } from '@dataconnect/generated/react'

export default function CreateAutomationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateAutomation();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateAutomation(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateAutomation(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateAutomation(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateAutomation` Mutation requires an argument of type `CreateAutomationVariables`:
  const createAutomationVars: CreateAutomationVariables = {
    clientId: ..., 
    name: ..., 
    description: ..., // optional
    triggerType: ..., 
    status: ..., // optional
  };
  mutation.mutate(createAutomationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ clientId: ..., name: ..., description: ..., triggerType: ..., status: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createAutomationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.automation_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateAutomationStatus
You can execute the `UpdateAutomationStatus` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateAutomationStatus(options?: useDataConnectMutationOptions<UpdateAutomationStatusData, FirebaseError, UpdateAutomationStatusVariables>): UseDataConnectMutationResult<UpdateAutomationStatusData, UpdateAutomationStatusVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateAutomationStatus(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateAutomationStatusData, FirebaseError, UpdateAutomationStatusVariables>): UseDataConnectMutationResult<UpdateAutomationStatusData, UpdateAutomationStatusVariables>;
```

### Variables
The `UpdateAutomationStatus` Mutation requires an argument of type `UpdateAutomationStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateAutomationStatusVariables {
  id: UUIDString;
  status: string;
}
```
### Return Type
Recall that calling the `UpdateAutomationStatus` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateAutomationStatus` Mutation is of type `UpdateAutomationStatusData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateAutomationStatusData {
  automation_update?: Automation_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateAutomationStatus`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateAutomationStatusVariables } from '@dataconnect/generated';
import { useUpdateAutomationStatus } from '@dataconnect/generated/react'

export default function UpdateAutomationStatusComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateAutomationStatus();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateAutomationStatus(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateAutomationStatus(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateAutomationStatus(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateAutomationStatus` Mutation requires an argument of type `UpdateAutomationStatusVariables`:
  const updateAutomationStatusVars: UpdateAutomationStatusVariables = {
    id: ..., 
    status: ..., 
  };
  mutation.mutate(updateAutomationStatusVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., status: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateAutomationStatusVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.automation_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteAutomation
You can execute the `DeleteAutomation` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteAutomation(options?: useDataConnectMutationOptions<DeleteAutomationData, FirebaseError, DeleteAutomationVariables>): UseDataConnectMutationResult<DeleteAutomationData, DeleteAutomationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteAutomation(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteAutomationData, FirebaseError, DeleteAutomationVariables>): UseDataConnectMutationResult<DeleteAutomationData, DeleteAutomationVariables>;
```

### Variables
The `DeleteAutomation` Mutation requires an argument of type `DeleteAutomationVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteAutomationVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteAutomation` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteAutomation` Mutation is of type `DeleteAutomationData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteAutomationData {
  automation_delete?: Automation_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteAutomation`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteAutomationVariables } from '@dataconnect/generated';
import { useDeleteAutomation } from '@dataconnect/generated/react'

export default function DeleteAutomationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteAutomation();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteAutomation(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteAutomation(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteAutomation(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteAutomation` Mutation requires an argument of type `DeleteAutomationVariables`:
  const deleteAutomationVars: DeleteAutomationVariables = {
    id: ..., 
  };
  mutation.mutate(deleteAutomationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteAutomationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.automation_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateAutomationRun
You can execute the `CreateAutomationRun` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateAutomationRun(options?: useDataConnectMutationOptions<CreateAutomationRunData, FirebaseError, CreateAutomationRunVariables>): UseDataConnectMutationResult<CreateAutomationRunData, CreateAutomationRunVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateAutomationRun(dc: DataConnect, options?: useDataConnectMutationOptions<CreateAutomationRunData, FirebaseError, CreateAutomationRunVariables>): UseDataConnectMutationResult<CreateAutomationRunData, CreateAutomationRunVariables>;
```

### Variables
The `CreateAutomationRun` Mutation requires an argument of type `CreateAutomationRunVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateAutomationRunVariables {
  automationId: UUIDString;
  runAt?: TimestampString | null;
  status: string;
  summary?: string | null;
  recordsProcessed?: number | null;
}
```
### Return Type
Recall that calling the `CreateAutomationRun` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateAutomationRun` Mutation is of type `CreateAutomationRunData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateAutomationRunData {
  automationRun_insert: AutomationRun_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateAutomationRun`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateAutomationRunVariables } from '@dataconnect/generated';
import { useCreateAutomationRun } from '@dataconnect/generated/react'

export default function CreateAutomationRunComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateAutomationRun();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateAutomationRun(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateAutomationRun(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateAutomationRun(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateAutomationRun` Mutation requires an argument of type `CreateAutomationRunVariables`:
  const createAutomationRunVars: CreateAutomationRunVariables = {
    automationId: ..., 
    runAt: ..., // optional
    status: ..., 
    summary: ..., // optional
    recordsProcessed: ..., // optional
  };
  mutation.mutate(createAutomationRunVars);
  // Variables can be defined inline as well.
  mutation.mutate({ automationId: ..., runAt: ..., status: ..., summary: ..., recordsProcessed: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createAutomationRunVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.automationRun_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteAutomationRun
You can execute the `DeleteAutomationRun` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteAutomationRun(options?: useDataConnectMutationOptions<DeleteAutomationRunData, FirebaseError, DeleteAutomationRunVariables>): UseDataConnectMutationResult<DeleteAutomationRunData, DeleteAutomationRunVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteAutomationRun(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteAutomationRunData, FirebaseError, DeleteAutomationRunVariables>): UseDataConnectMutationResult<DeleteAutomationRunData, DeleteAutomationRunVariables>;
```

### Variables
The `DeleteAutomationRun` Mutation requires an argument of type `DeleteAutomationRunVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteAutomationRunVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteAutomationRun` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteAutomationRun` Mutation is of type `DeleteAutomationRunData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteAutomationRunData {
  automationRun_delete?: AutomationRun_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteAutomationRun`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteAutomationRunVariables } from '@dataconnect/generated';
import { useDeleteAutomationRun } from '@dataconnect/generated/react'

export default function DeleteAutomationRunComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteAutomationRun();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteAutomationRun(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteAutomationRun(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteAutomationRun(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteAutomationRun` Mutation requires an argument of type `DeleteAutomationRunVariables`:
  const deleteAutomationRunVars: DeleteAutomationRunVariables = {
    id: ..., 
  };
  mutation.mutate(deleteAutomationRunVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteAutomationRunVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.automationRun_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateCommunication
You can execute the `CreateCommunication` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateCommunication(options?: useDataConnectMutationOptions<CreateCommunicationData, FirebaseError, CreateCommunicationVariables>): UseDataConnectMutationResult<CreateCommunicationData, CreateCommunicationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateCommunication(dc: DataConnect, options?: useDataConnectMutationOptions<CreateCommunicationData, FirebaseError, CreateCommunicationVariables>): UseDataConnectMutationResult<CreateCommunicationData, CreateCommunicationVariables>;
```

### Variables
The `CreateCommunication` Mutation requires an argument of type `CreateCommunicationVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateCommunicationVariables {
  clientId: UUIDString;
  channel: string;
  direction: string;
  summary?: string | null;
  transcriptUrl?: string | null;
  occurredAt?: TimestampString | null;
  handledBy?: string | null;
}
```
### Return Type
Recall that calling the `CreateCommunication` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateCommunication` Mutation is of type `CreateCommunicationData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateCommunicationData {
  communication_insert: Communication_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateCommunication`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateCommunicationVariables } from '@dataconnect/generated';
import { useCreateCommunication } from '@dataconnect/generated/react'

export default function CreateCommunicationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateCommunication();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateCommunication(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateCommunication(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateCommunication(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateCommunication` Mutation requires an argument of type `CreateCommunicationVariables`:
  const createCommunicationVars: CreateCommunicationVariables = {
    clientId: ..., 
    channel: ..., 
    direction: ..., 
    summary: ..., // optional
    transcriptUrl: ..., // optional
    occurredAt: ..., // optional
    handledBy: ..., // optional
  };
  mutation.mutate(createCommunicationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ clientId: ..., channel: ..., direction: ..., summary: ..., transcriptUrl: ..., occurredAt: ..., handledBy: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createCommunicationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.communication_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteCommunication
You can execute the `DeleteCommunication` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteCommunication(options?: useDataConnectMutationOptions<DeleteCommunicationData, FirebaseError, DeleteCommunicationVariables>): UseDataConnectMutationResult<DeleteCommunicationData, DeleteCommunicationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteCommunication(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteCommunicationData, FirebaseError, DeleteCommunicationVariables>): UseDataConnectMutationResult<DeleteCommunicationData, DeleteCommunicationVariables>;
```

### Variables
The `DeleteCommunication` Mutation requires an argument of type `DeleteCommunicationVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteCommunicationVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteCommunication` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteCommunication` Mutation is of type `DeleteCommunicationData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteCommunicationData {
  communication_delete?: Communication_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteCommunication`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteCommunicationVariables } from '@dataconnect/generated';
import { useDeleteCommunication } from '@dataconnect/generated/react'

export default function DeleteCommunicationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteCommunication();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteCommunication(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteCommunication(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteCommunication(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteCommunication` Mutation requires an argument of type `DeleteCommunicationVariables`:
  const deleteCommunicationVars: DeleteCommunicationVariables = {
    id: ..., 
  };
  mutation.mutate(deleteCommunicationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteCommunicationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.communication_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateMetricsSnapshot
You can execute the `CreateMetricsSnapshot` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateMetricsSnapshot(options?: useDataConnectMutationOptions<CreateMetricsSnapshotData, FirebaseError, CreateMetricsSnapshotVariables>): UseDataConnectMutationResult<CreateMetricsSnapshotData, CreateMetricsSnapshotVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateMetricsSnapshot(dc: DataConnect, options?: useDataConnectMutationOptions<CreateMetricsSnapshotData, FirebaseError, CreateMetricsSnapshotVariables>): UseDataConnectMutationResult<CreateMetricsSnapshotData, CreateMetricsSnapshotVariables>;
```

### Variables
The `CreateMetricsSnapshot` Mutation requires an argument of type `CreateMetricsSnapshotVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateMetricsSnapshotVariables {
  clientId: UUIDString;
  snapshotDate: DateString;
  hoursSaved: number;
  tasksAutomated: number;
  avgResponseSeconds?: number | null;
}
```
### Return Type
Recall that calling the `CreateMetricsSnapshot` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateMetricsSnapshot` Mutation is of type `CreateMetricsSnapshotData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateMetricsSnapshotData {
  metricsSnapshot_insert: MetricsSnapshot_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateMetricsSnapshot`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateMetricsSnapshotVariables } from '@dataconnect/generated';
import { useCreateMetricsSnapshot } from '@dataconnect/generated/react'

export default function CreateMetricsSnapshotComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateMetricsSnapshot();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateMetricsSnapshot(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateMetricsSnapshot(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateMetricsSnapshot(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateMetricsSnapshot` Mutation requires an argument of type `CreateMetricsSnapshotVariables`:
  const createMetricsSnapshotVars: CreateMetricsSnapshotVariables = {
    clientId: ..., 
    snapshotDate: ..., 
    hoursSaved: ..., 
    tasksAutomated: ..., 
    avgResponseSeconds: ..., // optional
  };
  mutation.mutate(createMetricsSnapshotVars);
  // Variables can be defined inline as well.
  mutation.mutate({ clientId: ..., snapshotDate: ..., hoursSaved: ..., tasksAutomated: ..., avgResponseSeconds: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createMetricsSnapshotVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.metricsSnapshot_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteMetricsSnapshot
You can execute the `DeleteMetricsSnapshot` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteMetricsSnapshot(options?: useDataConnectMutationOptions<DeleteMetricsSnapshotData, FirebaseError, DeleteMetricsSnapshotVariables>): UseDataConnectMutationResult<DeleteMetricsSnapshotData, DeleteMetricsSnapshotVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteMetricsSnapshot(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteMetricsSnapshotData, FirebaseError, DeleteMetricsSnapshotVariables>): UseDataConnectMutationResult<DeleteMetricsSnapshotData, DeleteMetricsSnapshotVariables>;
```

### Variables
The `DeleteMetricsSnapshot` Mutation requires an argument of type `DeleteMetricsSnapshotVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteMetricsSnapshotVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteMetricsSnapshot` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteMetricsSnapshot` Mutation is of type `DeleteMetricsSnapshotData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteMetricsSnapshotData {
  metricsSnapshot_delete?: MetricsSnapshot_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteMetricsSnapshot`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteMetricsSnapshotVariables } from '@dataconnect/generated';
import { useDeleteMetricsSnapshot } from '@dataconnect/generated/react'

export default function DeleteMetricsSnapshotComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteMetricsSnapshot();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteMetricsSnapshot(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteMetricsSnapshot(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteMetricsSnapshot(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteMetricsSnapshot` Mutation requires an argument of type `DeleteMetricsSnapshotVariables`:
  const deleteMetricsSnapshotVars: DeleteMetricsSnapshotVariables = {
    id: ..., 
  };
  mutation.mutate(deleteMetricsSnapshotVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteMetricsSnapshotVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.metricsSnapshot_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

