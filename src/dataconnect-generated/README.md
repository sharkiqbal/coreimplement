# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `platform-preview`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
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

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `platform-preview`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `platform-preview` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListClients
You can execute the `ListClients` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listClients(options?: ExecuteQueryOptions): QueryPromise<ListClientsData, undefined>;

interface ListClientsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListClientsData, undefined>;
}
export const listClientsRef: ListClientsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listClients(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListClientsData, undefined>;

interface ListClientsRef {
  ...
  (dc: DataConnect): QueryRef<ListClientsData, undefined>;
}
export const listClientsRef: ListClientsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listClientsRef:
```typescript
const name = listClientsRef.operationName;
console.log(name);
```

### Variables
The `ListClients` query has no variables.
### Return Type
Recall that executing the `ListClients` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListClientsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListClientsData {
  clients: ({
    id: UUIDString;
    name: string;
    industry: string;
    status: string;
  } & Client_Key)[];
}
```
### Using `ListClients`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listClients } from '@dataconnect/generated';


// Call the `listClients()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listClients();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listClients(dataConnect);

console.log(data.clients);

// Or, you can use the `Promise` API.
listClients().then((response) => {
  const data = response.data;
  console.log(data.clients);
});
```

### Using `ListClients`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listClientsRef } from '@dataconnect/generated';


// Call the `listClientsRef()` function to get a reference to the query.
const ref = listClientsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listClientsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.clients);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.clients);
});
```

## GetPersonaOverview
You can execute the `GetPersonaOverview` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getPersonaOverview(vars: GetPersonaOverviewVariables, options?: ExecuteQueryOptions): QueryPromise<GetPersonaOverviewData, GetPersonaOverviewVariables>;

interface GetPersonaOverviewRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPersonaOverviewVariables): QueryRef<GetPersonaOverviewData, GetPersonaOverviewVariables>;
}
export const getPersonaOverviewRef: GetPersonaOverviewRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPersonaOverview(dc: DataConnect, vars: GetPersonaOverviewVariables, options?: ExecuteQueryOptions): QueryPromise<GetPersonaOverviewData, GetPersonaOverviewVariables>;

interface GetPersonaOverviewRef {
  ...
  (dc: DataConnect, vars: GetPersonaOverviewVariables): QueryRef<GetPersonaOverviewData, GetPersonaOverviewVariables>;
}
export const getPersonaOverviewRef: GetPersonaOverviewRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPersonaOverviewRef:
```typescript
const name = getPersonaOverviewRef.operationName;
console.log(name);
```

### Variables
The `GetPersonaOverview` query requires an argument of type `GetPersonaOverviewVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPersonaOverviewVariables {
  industry: string;
}
```
### Return Type
Recall that executing the `GetPersonaOverview` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPersonaOverviewData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `GetPersonaOverview`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPersonaOverview, GetPersonaOverviewVariables } from '@dataconnect/generated';

// The `GetPersonaOverview` query requires an argument of type `GetPersonaOverviewVariables`:
const getPersonaOverviewVars: GetPersonaOverviewVariables = {
  industry: ..., 
};

// Call the `getPersonaOverview()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPersonaOverview(getPersonaOverviewVars);
// Variables can be defined inline as well.
const { data } = await getPersonaOverview({ industry: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPersonaOverview(dataConnect, getPersonaOverviewVars);

console.log(data.clients);
console.log(data.automations);
console.log(data.automationRuns);
console.log(data.metricsSnapshots);

// Or, you can use the `Promise` API.
getPersonaOverview(getPersonaOverviewVars).then((response) => {
  const data = response.data;
  console.log(data.clients);
  console.log(data.automations);
  console.log(data.automationRuns);
  console.log(data.metricsSnapshots);
});
```

### Using `GetPersonaOverview`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPersonaOverviewRef, GetPersonaOverviewVariables } from '@dataconnect/generated';

// The `GetPersonaOverview` query requires an argument of type `GetPersonaOverviewVariables`:
const getPersonaOverviewVars: GetPersonaOverviewVariables = {
  industry: ..., 
};

// Call the `getPersonaOverviewRef()` function to get a reference to the query.
const ref = getPersonaOverviewRef(getPersonaOverviewVars);
// Variables can be defined inline as well.
const ref = getPersonaOverviewRef({ industry: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPersonaOverviewRef(dataConnect, getPersonaOverviewVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.clients);
console.log(data.automations);
console.log(data.automationRuns);
console.log(data.metricsSnapshots);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.clients);
  console.log(data.automations);
  console.log(data.automationRuns);
  console.log(data.metricsSnapshots);
});
```

## GetPersonaAutomations
You can execute the `GetPersonaAutomations` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getPersonaAutomations(vars: GetPersonaAutomationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetPersonaAutomationsData, GetPersonaAutomationsVariables>;

interface GetPersonaAutomationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPersonaAutomationsVariables): QueryRef<GetPersonaAutomationsData, GetPersonaAutomationsVariables>;
}
export const getPersonaAutomationsRef: GetPersonaAutomationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPersonaAutomations(dc: DataConnect, vars: GetPersonaAutomationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetPersonaAutomationsData, GetPersonaAutomationsVariables>;

interface GetPersonaAutomationsRef {
  ...
  (dc: DataConnect, vars: GetPersonaAutomationsVariables): QueryRef<GetPersonaAutomationsData, GetPersonaAutomationsVariables>;
}
export const getPersonaAutomationsRef: GetPersonaAutomationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPersonaAutomationsRef:
```typescript
const name = getPersonaAutomationsRef.operationName;
console.log(name);
```

### Variables
The `GetPersonaAutomations` query requires an argument of type `GetPersonaAutomationsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPersonaAutomationsVariables {
  industry: string;
}
```
### Return Type
Recall that executing the `GetPersonaAutomations` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPersonaAutomationsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `GetPersonaAutomations`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPersonaAutomations, GetPersonaAutomationsVariables } from '@dataconnect/generated';

// The `GetPersonaAutomations` query requires an argument of type `GetPersonaAutomationsVariables`:
const getPersonaAutomationsVars: GetPersonaAutomationsVariables = {
  industry: ..., 
};

// Call the `getPersonaAutomations()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPersonaAutomations(getPersonaAutomationsVars);
// Variables can be defined inline as well.
const { data } = await getPersonaAutomations({ industry: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPersonaAutomations(dataConnect, getPersonaAutomationsVars);

console.log(data.automations);
console.log(data.automationRuns);

// Or, you can use the `Promise` API.
getPersonaAutomations(getPersonaAutomationsVars).then((response) => {
  const data = response.data;
  console.log(data.automations);
  console.log(data.automationRuns);
});
```

### Using `GetPersonaAutomations`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPersonaAutomationsRef, GetPersonaAutomationsVariables } from '@dataconnect/generated';

// The `GetPersonaAutomations` query requires an argument of type `GetPersonaAutomationsVariables`:
const getPersonaAutomationsVars: GetPersonaAutomationsVariables = {
  industry: ..., 
};

// Call the `getPersonaAutomationsRef()` function to get a reference to the query.
const ref = getPersonaAutomationsRef(getPersonaAutomationsVars);
// Variables can be defined inline as well.
const ref = getPersonaAutomationsRef({ industry: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPersonaAutomationsRef(dataConnect, getPersonaAutomationsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.automations);
console.log(data.automationRuns);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.automations);
  console.log(data.automationRuns);
});
```

## GetPersonaIntegrations
You can execute the `GetPersonaIntegrations` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getPersonaIntegrations(vars: GetPersonaIntegrationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetPersonaIntegrationsData, GetPersonaIntegrationsVariables>;

interface GetPersonaIntegrationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPersonaIntegrationsVariables): QueryRef<GetPersonaIntegrationsData, GetPersonaIntegrationsVariables>;
}
export const getPersonaIntegrationsRef: GetPersonaIntegrationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPersonaIntegrations(dc: DataConnect, vars: GetPersonaIntegrationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetPersonaIntegrationsData, GetPersonaIntegrationsVariables>;

interface GetPersonaIntegrationsRef {
  ...
  (dc: DataConnect, vars: GetPersonaIntegrationsVariables): QueryRef<GetPersonaIntegrationsData, GetPersonaIntegrationsVariables>;
}
export const getPersonaIntegrationsRef: GetPersonaIntegrationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPersonaIntegrationsRef:
```typescript
const name = getPersonaIntegrationsRef.operationName;
console.log(name);
```

### Variables
The `GetPersonaIntegrations` query requires an argument of type `GetPersonaIntegrationsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPersonaIntegrationsVariables {
  industry: string;
}
```
### Return Type
Recall that executing the `GetPersonaIntegrations` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPersonaIntegrationsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `GetPersonaIntegrations`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPersonaIntegrations, GetPersonaIntegrationsVariables } from '@dataconnect/generated';

// The `GetPersonaIntegrations` query requires an argument of type `GetPersonaIntegrationsVariables`:
const getPersonaIntegrationsVars: GetPersonaIntegrationsVariables = {
  industry: ..., 
};

// Call the `getPersonaIntegrations()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPersonaIntegrations(getPersonaIntegrationsVars);
// Variables can be defined inline as well.
const { data } = await getPersonaIntegrations({ industry: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPersonaIntegrations(dataConnect, getPersonaIntegrationsVars);

console.log(data.clientIntegrations);
console.log(data.integrations);

// Or, you can use the `Promise` API.
getPersonaIntegrations(getPersonaIntegrationsVars).then((response) => {
  const data = response.data;
  console.log(data.clientIntegrations);
  console.log(data.integrations);
});
```

### Using `GetPersonaIntegrations`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPersonaIntegrationsRef, GetPersonaIntegrationsVariables } from '@dataconnect/generated';

// The `GetPersonaIntegrations` query requires an argument of type `GetPersonaIntegrationsVariables`:
const getPersonaIntegrationsVars: GetPersonaIntegrationsVariables = {
  industry: ..., 
};

// Call the `getPersonaIntegrationsRef()` function to get a reference to the query.
const ref = getPersonaIntegrationsRef(getPersonaIntegrationsVars);
// Variables can be defined inline as well.
const ref = getPersonaIntegrationsRef({ industry: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPersonaIntegrationsRef(dataConnect, getPersonaIntegrationsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.clientIntegrations);
console.log(data.integrations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.clientIntegrations);
  console.log(data.integrations);
});
```

## GetPersonaCommunications
You can execute the `GetPersonaCommunications` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getPersonaCommunications(vars: GetPersonaCommunicationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetPersonaCommunicationsData, GetPersonaCommunicationsVariables>;

interface GetPersonaCommunicationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPersonaCommunicationsVariables): QueryRef<GetPersonaCommunicationsData, GetPersonaCommunicationsVariables>;
}
export const getPersonaCommunicationsRef: GetPersonaCommunicationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPersonaCommunications(dc: DataConnect, vars: GetPersonaCommunicationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetPersonaCommunicationsData, GetPersonaCommunicationsVariables>;

interface GetPersonaCommunicationsRef {
  ...
  (dc: DataConnect, vars: GetPersonaCommunicationsVariables): QueryRef<GetPersonaCommunicationsData, GetPersonaCommunicationsVariables>;
}
export const getPersonaCommunicationsRef: GetPersonaCommunicationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPersonaCommunicationsRef:
```typescript
const name = getPersonaCommunicationsRef.operationName;
console.log(name);
```

### Variables
The `GetPersonaCommunications` query requires an argument of type `GetPersonaCommunicationsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPersonaCommunicationsVariables {
  industry: string;
}
```
### Return Type
Recall that executing the `GetPersonaCommunications` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPersonaCommunicationsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `GetPersonaCommunications`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPersonaCommunications, GetPersonaCommunicationsVariables } from '@dataconnect/generated';

// The `GetPersonaCommunications` query requires an argument of type `GetPersonaCommunicationsVariables`:
const getPersonaCommunicationsVars: GetPersonaCommunicationsVariables = {
  industry: ..., 
};

// Call the `getPersonaCommunications()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPersonaCommunications(getPersonaCommunicationsVars);
// Variables can be defined inline as well.
const { data } = await getPersonaCommunications({ industry: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPersonaCommunications(dataConnect, getPersonaCommunicationsVars);

console.log(data.communications);

// Or, you can use the `Promise` API.
getPersonaCommunications(getPersonaCommunicationsVars).then((response) => {
  const data = response.data;
  console.log(data.communications);
});
```

### Using `GetPersonaCommunications`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPersonaCommunicationsRef, GetPersonaCommunicationsVariables } from '@dataconnect/generated';

// The `GetPersonaCommunications` query requires an argument of type `GetPersonaCommunicationsVariables`:
const getPersonaCommunicationsVars: GetPersonaCommunicationsVariables = {
  industry: ..., 
};

// Call the `getPersonaCommunicationsRef()` function to get a reference to the query.
const ref = getPersonaCommunicationsRef(getPersonaCommunicationsVars);
// Variables can be defined inline as well.
const ref = getPersonaCommunicationsRef({ industry: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPersonaCommunicationsRef(dataConnect, getPersonaCommunicationsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.communications);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.communications);
});
```

## GetPersonaReports
You can execute the `GetPersonaReports` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getPersonaReports(vars: GetPersonaReportsVariables, options?: ExecuteQueryOptions): QueryPromise<GetPersonaReportsData, GetPersonaReportsVariables>;

interface GetPersonaReportsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPersonaReportsVariables): QueryRef<GetPersonaReportsData, GetPersonaReportsVariables>;
}
export const getPersonaReportsRef: GetPersonaReportsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPersonaReports(dc: DataConnect, vars: GetPersonaReportsVariables, options?: ExecuteQueryOptions): QueryPromise<GetPersonaReportsData, GetPersonaReportsVariables>;

interface GetPersonaReportsRef {
  ...
  (dc: DataConnect, vars: GetPersonaReportsVariables): QueryRef<GetPersonaReportsData, GetPersonaReportsVariables>;
}
export const getPersonaReportsRef: GetPersonaReportsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPersonaReportsRef:
```typescript
const name = getPersonaReportsRef.operationName;
console.log(name);
```

### Variables
The `GetPersonaReports` query requires an argument of type `GetPersonaReportsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPersonaReportsVariables {
  industry: string;
}
```
### Return Type
Recall that executing the `GetPersonaReports` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPersonaReportsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `GetPersonaReports`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPersonaReports, GetPersonaReportsVariables } from '@dataconnect/generated';

// The `GetPersonaReports` query requires an argument of type `GetPersonaReportsVariables`:
const getPersonaReportsVars: GetPersonaReportsVariables = {
  industry: ..., 
};

// Call the `getPersonaReports()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPersonaReports(getPersonaReportsVars);
// Variables can be defined inline as well.
const { data } = await getPersonaReports({ industry: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPersonaReports(dataConnect, getPersonaReportsVars);

console.log(data.metricsSnapshots);

// Or, you can use the `Promise` API.
getPersonaReports(getPersonaReportsVars).then((response) => {
  const data = response.data;
  console.log(data.metricsSnapshots);
});
```

### Using `GetPersonaReports`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPersonaReportsRef, GetPersonaReportsVariables } from '@dataconnect/generated';

// The `GetPersonaReports` query requires an argument of type `GetPersonaReportsVariables`:
const getPersonaReportsVars: GetPersonaReportsVariables = {
  industry: ..., 
};

// Call the `getPersonaReportsRef()` function to get a reference to the query.
const ref = getPersonaReportsRef(getPersonaReportsVars);
// Variables can be defined inline as well.
const ref = getPersonaReportsRef({ industry: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPersonaReportsRef(dataConnect, getPersonaReportsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.metricsSnapshots);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.metricsSnapshots);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `platform-preview` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateClient
You can execute the `CreateClient` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createClient(vars: CreateClientVariables): MutationPromise<CreateClientData, CreateClientVariables>;

interface CreateClientRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateClientVariables): MutationRef<CreateClientData, CreateClientVariables>;
}
export const createClientRef: CreateClientRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createClient(dc: DataConnect, vars: CreateClientVariables): MutationPromise<CreateClientData, CreateClientVariables>;

interface CreateClientRef {
  ...
  (dc: DataConnect, vars: CreateClientVariables): MutationRef<CreateClientData, CreateClientVariables>;
}
export const createClientRef: CreateClientRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createClientRef:
```typescript
const name = createClientRef.operationName;
console.log(name);
```

### Variables
The `CreateClient` mutation requires an argument of type `CreateClientVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateClientVariables {
  name: string;
  industry: string;
  contactName?: string | null;
  contactEmail?: string | null;
  status?: string | null;
}
```
### Return Type
Recall that executing the `CreateClient` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateClientData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateClientData {
  client_insert: Client_Key;
}
```
### Using `CreateClient`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createClient, CreateClientVariables } from '@dataconnect/generated';

// The `CreateClient` mutation requires an argument of type `CreateClientVariables`:
const createClientVars: CreateClientVariables = {
  name: ..., 
  industry: ..., 
  contactName: ..., // optional
  contactEmail: ..., // optional
  status: ..., // optional
};

// Call the `createClient()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createClient(createClientVars);
// Variables can be defined inline as well.
const { data } = await createClient({ name: ..., industry: ..., contactName: ..., contactEmail: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createClient(dataConnect, createClientVars);

console.log(data.client_insert);

// Or, you can use the `Promise` API.
createClient(createClientVars).then((response) => {
  const data = response.data;
  console.log(data.client_insert);
});
```

### Using `CreateClient`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createClientRef, CreateClientVariables } from '@dataconnect/generated';

// The `CreateClient` mutation requires an argument of type `CreateClientVariables`:
const createClientVars: CreateClientVariables = {
  name: ..., 
  industry: ..., 
  contactName: ..., // optional
  contactEmail: ..., // optional
  status: ..., // optional
};

// Call the `createClientRef()` function to get a reference to the mutation.
const ref = createClientRef(createClientVars);
// Variables can be defined inline as well.
const ref = createClientRef({ name: ..., industry: ..., contactName: ..., contactEmail: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createClientRef(dataConnect, createClientVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.client_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.client_insert);
});
```

## UpdateClientStatus
You can execute the `UpdateClientStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateClientStatus(vars: UpdateClientStatusVariables): MutationPromise<UpdateClientStatusData, UpdateClientStatusVariables>;

interface UpdateClientStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateClientStatusVariables): MutationRef<UpdateClientStatusData, UpdateClientStatusVariables>;
}
export const updateClientStatusRef: UpdateClientStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateClientStatus(dc: DataConnect, vars: UpdateClientStatusVariables): MutationPromise<UpdateClientStatusData, UpdateClientStatusVariables>;

interface UpdateClientStatusRef {
  ...
  (dc: DataConnect, vars: UpdateClientStatusVariables): MutationRef<UpdateClientStatusData, UpdateClientStatusVariables>;
}
export const updateClientStatusRef: UpdateClientStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateClientStatusRef:
```typescript
const name = updateClientStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateClientStatus` mutation requires an argument of type `UpdateClientStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateClientStatusVariables {
  id: UUIDString;
  status: string;
}
```
### Return Type
Recall that executing the `UpdateClientStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateClientStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateClientStatusData {
  client_update?: Client_Key | null;
}
```
### Using `UpdateClientStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateClientStatus, UpdateClientStatusVariables } from '@dataconnect/generated';

// The `UpdateClientStatus` mutation requires an argument of type `UpdateClientStatusVariables`:
const updateClientStatusVars: UpdateClientStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateClientStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateClientStatus(updateClientStatusVars);
// Variables can be defined inline as well.
const { data } = await updateClientStatus({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateClientStatus(dataConnect, updateClientStatusVars);

console.log(data.client_update);

// Or, you can use the `Promise` API.
updateClientStatus(updateClientStatusVars).then((response) => {
  const data = response.data;
  console.log(data.client_update);
});
```

### Using `UpdateClientStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateClientStatusRef, UpdateClientStatusVariables } from '@dataconnect/generated';

// The `UpdateClientStatus` mutation requires an argument of type `UpdateClientStatusVariables`:
const updateClientStatusVars: UpdateClientStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateClientStatusRef()` function to get a reference to the mutation.
const ref = updateClientStatusRef(updateClientStatusVars);
// Variables can be defined inline as well.
const ref = updateClientStatusRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateClientStatusRef(dataConnect, updateClientStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.client_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.client_update);
});
```

## DeleteClient
You can execute the `DeleteClient` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteClient(vars: DeleteClientVariables): MutationPromise<DeleteClientData, DeleteClientVariables>;

interface DeleteClientRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteClientVariables): MutationRef<DeleteClientData, DeleteClientVariables>;
}
export const deleteClientRef: DeleteClientRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteClient(dc: DataConnect, vars: DeleteClientVariables): MutationPromise<DeleteClientData, DeleteClientVariables>;

interface DeleteClientRef {
  ...
  (dc: DataConnect, vars: DeleteClientVariables): MutationRef<DeleteClientData, DeleteClientVariables>;
}
export const deleteClientRef: DeleteClientRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteClientRef:
```typescript
const name = deleteClientRef.operationName;
console.log(name);
```

### Variables
The `DeleteClient` mutation requires an argument of type `DeleteClientVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteClientVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteClient` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteClientData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteClientData {
  client_delete?: Client_Key | null;
}
```
### Using `DeleteClient`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteClient, DeleteClientVariables } from '@dataconnect/generated';

// The `DeleteClient` mutation requires an argument of type `DeleteClientVariables`:
const deleteClientVars: DeleteClientVariables = {
  id: ..., 
};

// Call the `deleteClient()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteClient(deleteClientVars);
// Variables can be defined inline as well.
const { data } = await deleteClient({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteClient(dataConnect, deleteClientVars);

console.log(data.client_delete);

// Or, you can use the `Promise` API.
deleteClient(deleteClientVars).then((response) => {
  const data = response.data;
  console.log(data.client_delete);
});
```

### Using `DeleteClient`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteClientRef, DeleteClientVariables } from '@dataconnect/generated';

// The `DeleteClient` mutation requires an argument of type `DeleteClientVariables`:
const deleteClientVars: DeleteClientVariables = {
  id: ..., 
};

// Call the `deleteClientRef()` function to get a reference to the mutation.
const ref = deleteClientRef(deleteClientVars);
// Variables can be defined inline as well.
const ref = deleteClientRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteClientRef(dataConnect, deleteClientVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.client_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.client_delete);
});
```

## CreateIntegration
You can execute the `CreateIntegration` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createIntegration(vars: CreateIntegrationVariables): MutationPromise<CreateIntegrationData, CreateIntegrationVariables>;

interface CreateIntegrationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateIntegrationVariables): MutationRef<CreateIntegrationData, CreateIntegrationVariables>;
}
export const createIntegrationRef: CreateIntegrationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createIntegration(dc: DataConnect, vars: CreateIntegrationVariables): MutationPromise<CreateIntegrationData, CreateIntegrationVariables>;

interface CreateIntegrationRef {
  ...
  (dc: DataConnect, vars: CreateIntegrationVariables): MutationRef<CreateIntegrationData, CreateIntegrationVariables>;
}
export const createIntegrationRef: CreateIntegrationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createIntegrationRef:
```typescript
const name = createIntegrationRef.operationName;
console.log(name);
```

### Variables
The `CreateIntegration` mutation requires an argument of type `CreateIntegrationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateIntegrationVariables {
  name: string;
  category: string;
  logoUrl?: string | null;
}
```
### Return Type
Recall that executing the `CreateIntegration` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateIntegrationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateIntegrationData {
  integration_insert: Integration_Key;
}
```
### Using `CreateIntegration`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createIntegration, CreateIntegrationVariables } from '@dataconnect/generated';

// The `CreateIntegration` mutation requires an argument of type `CreateIntegrationVariables`:
const createIntegrationVars: CreateIntegrationVariables = {
  name: ..., 
  category: ..., 
  logoUrl: ..., // optional
};

// Call the `createIntegration()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createIntegration(createIntegrationVars);
// Variables can be defined inline as well.
const { data } = await createIntegration({ name: ..., category: ..., logoUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createIntegration(dataConnect, createIntegrationVars);

console.log(data.integration_insert);

// Or, you can use the `Promise` API.
createIntegration(createIntegrationVars).then((response) => {
  const data = response.data;
  console.log(data.integration_insert);
});
```

### Using `CreateIntegration`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createIntegrationRef, CreateIntegrationVariables } from '@dataconnect/generated';

// The `CreateIntegration` mutation requires an argument of type `CreateIntegrationVariables`:
const createIntegrationVars: CreateIntegrationVariables = {
  name: ..., 
  category: ..., 
  logoUrl: ..., // optional
};

// Call the `createIntegrationRef()` function to get a reference to the mutation.
const ref = createIntegrationRef(createIntegrationVars);
// Variables can be defined inline as well.
const ref = createIntegrationRef({ name: ..., category: ..., logoUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createIntegrationRef(dataConnect, createIntegrationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.integration_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.integration_insert);
});
```

## DeleteIntegration
You can execute the `DeleteIntegration` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteIntegration(vars: DeleteIntegrationVariables): MutationPromise<DeleteIntegrationData, DeleteIntegrationVariables>;

interface DeleteIntegrationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteIntegrationVariables): MutationRef<DeleteIntegrationData, DeleteIntegrationVariables>;
}
export const deleteIntegrationRef: DeleteIntegrationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteIntegration(dc: DataConnect, vars: DeleteIntegrationVariables): MutationPromise<DeleteIntegrationData, DeleteIntegrationVariables>;

interface DeleteIntegrationRef {
  ...
  (dc: DataConnect, vars: DeleteIntegrationVariables): MutationRef<DeleteIntegrationData, DeleteIntegrationVariables>;
}
export const deleteIntegrationRef: DeleteIntegrationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteIntegrationRef:
```typescript
const name = deleteIntegrationRef.operationName;
console.log(name);
```

### Variables
The `DeleteIntegration` mutation requires an argument of type `DeleteIntegrationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteIntegrationVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteIntegration` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteIntegrationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteIntegrationData {
  integration_delete?: Integration_Key | null;
}
```
### Using `DeleteIntegration`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteIntegration, DeleteIntegrationVariables } from '@dataconnect/generated';

// The `DeleteIntegration` mutation requires an argument of type `DeleteIntegrationVariables`:
const deleteIntegrationVars: DeleteIntegrationVariables = {
  id: ..., 
};

// Call the `deleteIntegration()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteIntegration(deleteIntegrationVars);
// Variables can be defined inline as well.
const { data } = await deleteIntegration({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteIntegration(dataConnect, deleteIntegrationVars);

console.log(data.integration_delete);

// Or, you can use the `Promise` API.
deleteIntegration(deleteIntegrationVars).then((response) => {
  const data = response.data;
  console.log(data.integration_delete);
});
```

### Using `DeleteIntegration`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteIntegrationRef, DeleteIntegrationVariables } from '@dataconnect/generated';

// The `DeleteIntegration` mutation requires an argument of type `DeleteIntegrationVariables`:
const deleteIntegrationVars: DeleteIntegrationVariables = {
  id: ..., 
};

// Call the `deleteIntegrationRef()` function to get a reference to the mutation.
const ref = deleteIntegrationRef(deleteIntegrationVars);
// Variables can be defined inline as well.
const ref = deleteIntegrationRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteIntegrationRef(dataConnect, deleteIntegrationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.integration_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.integration_delete);
});
```

## CreateClientIntegration
You can execute the `CreateClientIntegration` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createClientIntegration(vars: CreateClientIntegrationVariables): MutationPromise<CreateClientIntegrationData, CreateClientIntegrationVariables>;

interface CreateClientIntegrationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateClientIntegrationVariables): MutationRef<CreateClientIntegrationData, CreateClientIntegrationVariables>;
}
export const createClientIntegrationRef: CreateClientIntegrationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createClientIntegration(dc: DataConnect, vars: CreateClientIntegrationVariables): MutationPromise<CreateClientIntegrationData, CreateClientIntegrationVariables>;

interface CreateClientIntegrationRef {
  ...
  (dc: DataConnect, vars: CreateClientIntegrationVariables): MutationRef<CreateClientIntegrationData, CreateClientIntegrationVariables>;
}
export const createClientIntegrationRef: CreateClientIntegrationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createClientIntegrationRef:
```typescript
const name = createClientIntegrationRef.operationName;
console.log(name);
```

### Variables
The `CreateClientIntegration` mutation requires an argument of type `CreateClientIntegrationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateClientIntegrationVariables {
  clientId: UUIDString;
  integrationId: UUIDString;
  status?: string | null;
  connectedAt?: TimestampString | null;
}
```
### Return Type
Recall that executing the `CreateClientIntegration` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateClientIntegrationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateClientIntegrationData {
  clientIntegration_insert: ClientIntegration_Key;
}
```
### Using `CreateClientIntegration`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createClientIntegration, CreateClientIntegrationVariables } from '@dataconnect/generated';

// The `CreateClientIntegration` mutation requires an argument of type `CreateClientIntegrationVariables`:
const createClientIntegrationVars: CreateClientIntegrationVariables = {
  clientId: ..., 
  integrationId: ..., 
  status: ..., // optional
  connectedAt: ..., // optional
};

// Call the `createClientIntegration()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createClientIntegration(createClientIntegrationVars);
// Variables can be defined inline as well.
const { data } = await createClientIntegration({ clientId: ..., integrationId: ..., status: ..., connectedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createClientIntegration(dataConnect, createClientIntegrationVars);

console.log(data.clientIntegration_insert);

// Or, you can use the `Promise` API.
createClientIntegration(createClientIntegrationVars).then((response) => {
  const data = response.data;
  console.log(data.clientIntegration_insert);
});
```

### Using `CreateClientIntegration`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createClientIntegrationRef, CreateClientIntegrationVariables } from '@dataconnect/generated';

// The `CreateClientIntegration` mutation requires an argument of type `CreateClientIntegrationVariables`:
const createClientIntegrationVars: CreateClientIntegrationVariables = {
  clientId: ..., 
  integrationId: ..., 
  status: ..., // optional
  connectedAt: ..., // optional
};

// Call the `createClientIntegrationRef()` function to get a reference to the mutation.
const ref = createClientIntegrationRef(createClientIntegrationVars);
// Variables can be defined inline as well.
const ref = createClientIntegrationRef({ clientId: ..., integrationId: ..., status: ..., connectedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createClientIntegrationRef(dataConnect, createClientIntegrationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.clientIntegration_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.clientIntegration_insert);
});
```

## UpdateClientIntegrationStatus
You can execute the `UpdateClientIntegrationStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateClientIntegrationStatus(vars: UpdateClientIntegrationStatusVariables): MutationPromise<UpdateClientIntegrationStatusData, UpdateClientIntegrationStatusVariables>;

interface UpdateClientIntegrationStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateClientIntegrationStatusVariables): MutationRef<UpdateClientIntegrationStatusData, UpdateClientIntegrationStatusVariables>;
}
export const updateClientIntegrationStatusRef: UpdateClientIntegrationStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateClientIntegrationStatus(dc: DataConnect, vars: UpdateClientIntegrationStatusVariables): MutationPromise<UpdateClientIntegrationStatusData, UpdateClientIntegrationStatusVariables>;

interface UpdateClientIntegrationStatusRef {
  ...
  (dc: DataConnect, vars: UpdateClientIntegrationStatusVariables): MutationRef<UpdateClientIntegrationStatusData, UpdateClientIntegrationStatusVariables>;
}
export const updateClientIntegrationStatusRef: UpdateClientIntegrationStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateClientIntegrationStatusRef:
```typescript
const name = updateClientIntegrationStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateClientIntegrationStatus` mutation requires an argument of type `UpdateClientIntegrationStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateClientIntegrationStatusVariables {
  clientId: UUIDString;
  integrationId: UUIDString;
  status: string;
}
```
### Return Type
Recall that executing the `UpdateClientIntegrationStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateClientIntegrationStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateClientIntegrationStatusData {
  clientIntegration_update?: ClientIntegration_Key | null;
}
```
### Using `UpdateClientIntegrationStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateClientIntegrationStatus, UpdateClientIntegrationStatusVariables } from '@dataconnect/generated';

// The `UpdateClientIntegrationStatus` mutation requires an argument of type `UpdateClientIntegrationStatusVariables`:
const updateClientIntegrationStatusVars: UpdateClientIntegrationStatusVariables = {
  clientId: ..., 
  integrationId: ..., 
  status: ..., 
};

// Call the `updateClientIntegrationStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateClientIntegrationStatus(updateClientIntegrationStatusVars);
// Variables can be defined inline as well.
const { data } = await updateClientIntegrationStatus({ clientId: ..., integrationId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateClientIntegrationStatus(dataConnect, updateClientIntegrationStatusVars);

console.log(data.clientIntegration_update);

// Or, you can use the `Promise` API.
updateClientIntegrationStatus(updateClientIntegrationStatusVars).then((response) => {
  const data = response.data;
  console.log(data.clientIntegration_update);
});
```

### Using `UpdateClientIntegrationStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateClientIntegrationStatusRef, UpdateClientIntegrationStatusVariables } from '@dataconnect/generated';

// The `UpdateClientIntegrationStatus` mutation requires an argument of type `UpdateClientIntegrationStatusVariables`:
const updateClientIntegrationStatusVars: UpdateClientIntegrationStatusVariables = {
  clientId: ..., 
  integrationId: ..., 
  status: ..., 
};

// Call the `updateClientIntegrationStatusRef()` function to get a reference to the mutation.
const ref = updateClientIntegrationStatusRef(updateClientIntegrationStatusVars);
// Variables can be defined inline as well.
const ref = updateClientIntegrationStatusRef({ clientId: ..., integrationId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateClientIntegrationStatusRef(dataConnect, updateClientIntegrationStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.clientIntegration_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.clientIntegration_update);
});
```

## DeleteClientIntegration
You can execute the `DeleteClientIntegration` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteClientIntegration(vars: DeleteClientIntegrationVariables): MutationPromise<DeleteClientIntegrationData, DeleteClientIntegrationVariables>;

interface DeleteClientIntegrationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteClientIntegrationVariables): MutationRef<DeleteClientIntegrationData, DeleteClientIntegrationVariables>;
}
export const deleteClientIntegrationRef: DeleteClientIntegrationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteClientIntegration(dc: DataConnect, vars: DeleteClientIntegrationVariables): MutationPromise<DeleteClientIntegrationData, DeleteClientIntegrationVariables>;

interface DeleteClientIntegrationRef {
  ...
  (dc: DataConnect, vars: DeleteClientIntegrationVariables): MutationRef<DeleteClientIntegrationData, DeleteClientIntegrationVariables>;
}
export const deleteClientIntegrationRef: DeleteClientIntegrationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteClientIntegrationRef:
```typescript
const name = deleteClientIntegrationRef.operationName;
console.log(name);
```

### Variables
The `DeleteClientIntegration` mutation requires an argument of type `DeleteClientIntegrationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteClientIntegrationVariables {
  clientId: UUIDString;
  integrationId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteClientIntegration` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteClientIntegrationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteClientIntegrationData {
  clientIntegration_delete?: ClientIntegration_Key | null;
}
```
### Using `DeleteClientIntegration`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteClientIntegration, DeleteClientIntegrationVariables } from '@dataconnect/generated';

// The `DeleteClientIntegration` mutation requires an argument of type `DeleteClientIntegrationVariables`:
const deleteClientIntegrationVars: DeleteClientIntegrationVariables = {
  clientId: ..., 
  integrationId: ..., 
};

// Call the `deleteClientIntegration()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteClientIntegration(deleteClientIntegrationVars);
// Variables can be defined inline as well.
const { data } = await deleteClientIntegration({ clientId: ..., integrationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteClientIntegration(dataConnect, deleteClientIntegrationVars);

console.log(data.clientIntegration_delete);

// Or, you can use the `Promise` API.
deleteClientIntegration(deleteClientIntegrationVars).then((response) => {
  const data = response.data;
  console.log(data.clientIntegration_delete);
});
```

### Using `DeleteClientIntegration`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteClientIntegrationRef, DeleteClientIntegrationVariables } from '@dataconnect/generated';

// The `DeleteClientIntegration` mutation requires an argument of type `DeleteClientIntegrationVariables`:
const deleteClientIntegrationVars: DeleteClientIntegrationVariables = {
  clientId: ..., 
  integrationId: ..., 
};

// Call the `deleteClientIntegrationRef()` function to get a reference to the mutation.
const ref = deleteClientIntegrationRef(deleteClientIntegrationVars);
// Variables can be defined inline as well.
const ref = deleteClientIntegrationRef({ clientId: ..., integrationId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteClientIntegrationRef(dataConnect, deleteClientIntegrationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.clientIntegration_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.clientIntegration_delete);
});
```

## CreateAutomation
You can execute the `CreateAutomation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createAutomation(vars: CreateAutomationVariables): MutationPromise<CreateAutomationData, CreateAutomationVariables>;

interface CreateAutomationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAutomationVariables): MutationRef<CreateAutomationData, CreateAutomationVariables>;
}
export const createAutomationRef: CreateAutomationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAutomation(dc: DataConnect, vars: CreateAutomationVariables): MutationPromise<CreateAutomationData, CreateAutomationVariables>;

interface CreateAutomationRef {
  ...
  (dc: DataConnect, vars: CreateAutomationVariables): MutationRef<CreateAutomationData, CreateAutomationVariables>;
}
export const createAutomationRef: CreateAutomationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAutomationRef:
```typescript
const name = createAutomationRef.operationName;
console.log(name);
```

### Variables
The `CreateAutomation` mutation requires an argument of type `CreateAutomationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateAutomationVariables {
  clientId: UUIDString;
  name: string;
  description?: string | null;
  triggerType: string;
  status?: string | null;
}
```
### Return Type
Recall that executing the `CreateAutomation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAutomationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAutomationData {
  automation_insert: Automation_Key;
}
```
### Using `CreateAutomation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAutomation, CreateAutomationVariables } from '@dataconnect/generated';

// The `CreateAutomation` mutation requires an argument of type `CreateAutomationVariables`:
const createAutomationVars: CreateAutomationVariables = {
  clientId: ..., 
  name: ..., 
  description: ..., // optional
  triggerType: ..., 
  status: ..., // optional
};

// Call the `createAutomation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAutomation(createAutomationVars);
// Variables can be defined inline as well.
const { data } = await createAutomation({ clientId: ..., name: ..., description: ..., triggerType: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAutomation(dataConnect, createAutomationVars);

console.log(data.automation_insert);

// Or, you can use the `Promise` API.
createAutomation(createAutomationVars).then((response) => {
  const data = response.data;
  console.log(data.automation_insert);
});
```

### Using `CreateAutomation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAutomationRef, CreateAutomationVariables } from '@dataconnect/generated';

// The `CreateAutomation` mutation requires an argument of type `CreateAutomationVariables`:
const createAutomationVars: CreateAutomationVariables = {
  clientId: ..., 
  name: ..., 
  description: ..., // optional
  triggerType: ..., 
  status: ..., // optional
};

// Call the `createAutomationRef()` function to get a reference to the mutation.
const ref = createAutomationRef(createAutomationVars);
// Variables can be defined inline as well.
const ref = createAutomationRef({ clientId: ..., name: ..., description: ..., triggerType: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAutomationRef(dataConnect, createAutomationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.automation_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.automation_insert);
});
```

## UpdateAutomationStatus
You can execute the `UpdateAutomationStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateAutomationStatus(vars: UpdateAutomationStatusVariables): MutationPromise<UpdateAutomationStatusData, UpdateAutomationStatusVariables>;

interface UpdateAutomationStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAutomationStatusVariables): MutationRef<UpdateAutomationStatusData, UpdateAutomationStatusVariables>;
}
export const updateAutomationStatusRef: UpdateAutomationStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateAutomationStatus(dc: DataConnect, vars: UpdateAutomationStatusVariables): MutationPromise<UpdateAutomationStatusData, UpdateAutomationStatusVariables>;

interface UpdateAutomationStatusRef {
  ...
  (dc: DataConnect, vars: UpdateAutomationStatusVariables): MutationRef<UpdateAutomationStatusData, UpdateAutomationStatusVariables>;
}
export const updateAutomationStatusRef: UpdateAutomationStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateAutomationStatusRef:
```typescript
const name = updateAutomationStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateAutomationStatus` mutation requires an argument of type `UpdateAutomationStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateAutomationStatusVariables {
  id: UUIDString;
  status: string;
}
```
### Return Type
Recall that executing the `UpdateAutomationStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateAutomationStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateAutomationStatusData {
  automation_update?: Automation_Key | null;
}
```
### Using `UpdateAutomationStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateAutomationStatus, UpdateAutomationStatusVariables } from '@dataconnect/generated';

// The `UpdateAutomationStatus` mutation requires an argument of type `UpdateAutomationStatusVariables`:
const updateAutomationStatusVars: UpdateAutomationStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateAutomationStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateAutomationStatus(updateAutomationStatusVars);
// Variables can be defined inline as well.
const { data } = await updateAutomationStatus({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateAutomationStatus(dataConnect, updateAutomationStatusVars);

console.log(data.automation_update);

// Or, you can use the `Promise` API.
updateAutomationStatus(updateAutomationStatusVars).then((response) => {
  const data = response.data;
  console.log(data.automation_update);
});
```

### Using `UpdateAutomationStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateAutomationStatusRef, UpdateAutomationStatusVariables } from '@dataconnect/generated';

// The `UpdateAutomationStatus` mutation requires an argument of type `UpdateAutomationStatusVariables`:
const updateAutomationStatusVars: UpdateAutomationStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateAutomationStatusRef()` function to get a reference to the mutation.
const ref = updateAutomationStatusRef(updateAutomationStatusVars);
// Variables can be defined inline as well.
const ref = updateAutomationStatusRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateAutomationStatusRef(dataConnect, updateAutomationStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.automation_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.automation_update);
});
```

## DeleteAutomation
You can execute the `DeleteAutomation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteAutomation(vars: DeleteAutomationVariables): MutationPromise<DeleteAutomationData, DeleteAutomationVariables>;

interface DeleteAutomationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAutomationVariables): MutationRef<DeleteAutomationData, DeleteAutomationVariables>;
}
export const deleteAutomationRef: DeleteAutomationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteAutomation(dc: DataConnect, vars: DeleteAutomationVariables): MutationPromise<DeleteAutomationData, DeleteAutomationVariables>;

interface DeleteAutomationRef {
  ...
  (dc: DataConnect, vars: DeleteAutomationVariables): MutationRef<DeleteAutomationData, DeleteAutomationVariables>;
}
export const deleteAutomationRef: DeleteAutomationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteAutomationRef:
```typescript
const name = deleteAutomationRef.operationName;
console.log(name);
```

### Variables
The `DeleteAutomation` mutation requires an argument of type `DeleteAutomationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteAutomationVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteAutomation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteAutomationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteAutomationData {
  automation_delete?: Automation_Key | null;
}
```
### Using `DeleteAutomation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteAutomation, DeleteAutomationVariables } from '@dataconnect/generated';

// The `DeleteAutomation` mutation requires an argument of type `DeleteAutomationVariables`:
const deleteAutomationVars: DeleteAutomationVariables = {
  id: ..., 
};

// Call the `deleteAutomation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteAutomation(deleteAutomationVars);
// Variables can be defined inline as well.
const { data } = await deleteAutomation({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteAutomation(dataConnect, deleteAutomationVars);

console.log(data.automation_delete);

// Or, you can use the `Promise` API.
deleteAutomation(deleteAutomationVars).then((response) => {
  const data = response.data;
  console.log(data.automation_delete);
});
```

### Using `DeleteAutomation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteAutomationRef, DeleteAutomationVariables } from '@dataconnect/generated';

// The `DeleteAutomation` mutation requires an argument of type `DeleteAutomationVariables`:
const deleteAutomationVars: DeleteAutomationVariables = {
  id: ..., 
};

// Call the `deleteAutomationRef()` function to get a reference to the mutation.
const ref = deleteAutomationRef(deleteAutomationVars);
// Variables can be defined inline as well.
const ref = deleteAutomationRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteAutomationRef(dataConnect, deleteAutomationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.automation_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.automation_delete);
});
```

## CreateAutomationRun
You can execute the `CreateAutomationRun` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createAutomationRun(vars: CreateAutomationRunVariables): MutationPromise<CreateAutomationRunData, CreateAutomationRunVariables>;

interface CreateAutomationRunRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAutomationRunVariables): MutationRef<CreateAutomationRunData, CreateAutomationRunVariables>;
}
export const createAutomationRunRef: CreateAutomationRunRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAutomationRun(dc: DataConnect, vars: CreateAutomationRunVariables): MutationPromise<CreateAutomationRunData, CreateAutomationRunVariables>;

interface CreateAutomationRunRef {
  ...
  (dc: DataConnect, vars: CreateAutomationRunVariables): MutationRef<CreateAutomationRunData, CreateAutomationRunVariables>;
}
export const createAutomationRunRef: CreateAutomationRunRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAutomationRunRef:
```typescript
const name = createAutomationRunRef.operationName;
console.log(name);
```

### Variables
The `CreateAutomationRun` mutation requires an argument of type `CreateAutomationRunVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateAutomationRunVariables {
  automationId: UUIDString;
  runAt?: TimestampString | null;
  status: string;
  summary?: string | null;
  recordsProcessed?: number | null;
}
```
### Return Type
Recall that executing the `CreateAutomationRun` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAutomationRunData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAutomationRunData {
  automationRun_insert: AutomationRun_Key;
}
```
### Using `CreateAutomationRun`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAutomationRun, CreateAutomationRunVariables } from '@dataconnect/generated';

// The `CreateAutomationRun` mutation requires an argument of type `CreateAutomationRunVariables`:
const createAutomationRunVars: CreateAutomationRunVariables = {
  automationId: ..., 
  runAt: ..., // optional
  status: ..., 
  summary: ..., // optional
  recordsProcessed: ..., // optional
};

// Call the `createAutomationRun()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAutomationRun(createAutomationRunVars);
// Variables can be defined inline as well.
const { data } = await createAutomationRun({ automationId: ..., runAt: ..., status: ..., summary: ..., recordsProcessed: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAutomationRun(dataConnect, createAutomationRunVars);

console.log(data.automationRun_insert);

// Or, you can use the `Promise` API.
createAutomationRun(createAutomationRunVars).then((response) => {
  const data = response.data;
  console.log(data.automationRun_insert);
});
```

### Using `CreateAutomationRun`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAutomationRunRef, CreateAutomationRunVariables } from '@dataconnect/generated';

// The `CreateAutomationRun` mutation requires an argument of type `CreateAutomationRunVariables`:
const createAutomationRunVars: CreateAutomationRunVariables = {
  automationId: ..., 
  runAt: ..., // optional
  status: ..., 
  summary: ..., // optional
  recordsProcessed: ..., // optional
};

// Call the `createAutomationRunRef()` function to get a reference to the mutation.
const ref = createAutomationRunRef(createAutomationRunVars);
// Variables can be defined inline as well.
const ref = createAutomationRunRef({ automationId: ..., runAt: ..., status: ..., summary: ..., recordsProcessed: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAutomationRunRef(dataConnect, createAutomationRunVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.automationRun_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.automationRun_insert);
});
```

## DeleteAutomationRun
You can execute the `DeleteAutomationRun` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteAutomationRun(vars: DeleteAutomationRunVariables): MutationPromise<DeleteAutomationRunData, DeleteAutomationRunVariables>;

interface DeleteAutomationRunRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAutomationRunVariables): MutationRef<DeleteAutomationRunData, DeleteAutomationRunVariables>;
}
export const deleteAutomationRunRef: DeleteAutomationRunRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteAutomationRun(dc: DataConnect, vars: DeleteAutomationRunVariables): MutationPromise<DeleteAutomationRunData, DeleteAutomationRunVariables>;

interface DeleteAutomationRunRef {
  ...
  (dc: DataConnect, vars: DeleteAutomationRunVariables): MutationRef<DeleteAutomationRunData, DeleteAutomationRunVariables>;
}
export const deleteAutomationRunRef: DeleteAutomationRunRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteAutomationRunRef:
```typescript
const name = deleteAutomationRunRef.operationName;
console.log(name);
```

### Variables
The `DeleteAutomationRun` mutation requires an argument of type `DeleteAutomationRunVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteAutomationRunVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteAutomationRun` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteAutomationRunData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteAutomationRunData {
  automationRun_delete?: AutomationRun_Key | null;
}
```
### Using `DeleteAutomationRun`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteAutomationRun, DeleteAutomationRunVariables } from '@dataconnect/generated';

// The `DeleteAutomationRun` mutation requires an argument of type `DeleteAutomationRunVariables`:
const deleteAutomationRunVars: DeleteAutomationRunVariables = {
  id: ..., 
};

// Call the `deleteAutomationRun()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteAutomationRun(deleteAutomationRunVars);
// Variables can be defined inline as well.
const { data } = await deleteAutomationRun({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteAutomationRun(dataConnect, deleteAutomationRunVars);

console.log(data.automationRun_delete);

// Or, you can use the `Promise` API.
deleteAutomationRun(deleteAutomationRunVars).then((response) => {
  const data = response.data;
  console.log(data.automationRun_delete);
});
```

### Using `DeleteAutomationRun`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteAutomationRunRef, DeleteAutomationRunVariables } from '@dataconnect/generated';

// The `DeleteAutomationRun` mutation requires an argument of type `DeleteAutomationRunVariables`:
const deleteAutomationRunVars: DeleteAutomationRunVariables = {
  id: ..., 
};

// Call the `deleteAutomationRunRef()` function to get a reference to the mutation.
const ref = deleteAutomationRunRef(deleteAutomationRunVars);
// Variables can be defined inline as well.
const ref = deleteAutomationRunRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteAutomationRunRef(dataConnect, deleteAutomationRunVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.automationRun_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.automationRun_delete);
});
```

## CreateCommunication
You can execute the `CreateCommunication` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createCommunication(vars: CreateCommunicationVariables): MutationPromise<CreateCommunicationData, CreateCommunicationVariables>;

interface CreateCommunicationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCommunicationVariables): MutationRef<CreateCommunicationData, CreateCommunicationVariables>;
}
export const createCommunicationRef: CreateCommunicationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createCommunication(dc: DataConnect, vars: CreateCommunicationVariables): MutationPromise<CreateCommunicationData, CreateCommunicationVariables>;

interface CreateCommunicationRef {
  ...
  (dc: DataConnect, vars: CreateCommunicationVariables): MutationRef<CreateCommunicationData, CreateCommunicationVariables>;
}
export const createCommunicationRef: CreateCommunicationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createCommunicationRef:
```typescript
const name = createCommunicationRef.operationName;
console.log(name);
```

### Variables
The `CreateCommunication` mutation requires an argument of type `CreateCommunicationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
Recall that executing the `CreateCommunication` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateCommunicationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateCommunicationData {
  communication_insert: Communication_Key;
}
```
### Using `CreateCommunication`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createCommunication, CreateCommunicationVariables } from '@dataconnect/generated';

// The `CreateCommunication` mutation requires an argument of type `CreateCommunicationVariables`:
const createCommunicationVars: CreateCommunicationVariables = {
  clientId: ..., 
  channel: ..., 
  direction: ..., 
  summary: ..., // optional
  transcriptUrl: ..., // optional
  occurredAt: ..., // optional
  handledBy: ..., // optional
};

// Call the `createCommunication()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createCommunication(createCommunicationVars);
// Variables can be defined inline as well.
const { data } = await createCommunication({ clientId: ..., channel: ..., direction: ..., summary: ..., transcriptUrl: ..., occurredAt: ..., handledBy: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createCommunication(dataConnect, createCommunicationVars);

console.log(data.communication_insert);

// Or, you can use the `Promise` API.
createCommunication(createCommunicationVars).then((response) => {
  const data = response.data;
  console.log(data.communication_insert);
});
```

### Using `CreateCommunication`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createCommunicationRef, CreateCommunicationVariables } from '@dataconnect/generated';

// The `CreateCommunication` mutation requires an argument of type `CreateCommunicationVariables`:
const createCommunicationVars: CreateCommunicationVariables = {
  clientId: ..., 
  channel: ..., 
  direction: ..., 
  summary: ..., // optional
  transcriptUrl: ..., // optional
  occurredAt: ..., // optional
  handledBy: ..., // optional
};

// Call the `createCommunicationRef()` function to get a reference to the mutation.
const ref = createCommunicationRef(createCommunicationVars);
// Variables can be defined inline as well.
const ref = createCommunicationRef({ clientId: ..., channel: ..., direction: ..., summary: ..., transcriptUrl: ..., occurredAt: ..., handledBy: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createCommunicationRef(dataConnect, createCommunicationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.communication_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.communication_insert);
});
```

## DeleteCommunication
You can execute the `DeleteCommunication` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteCommunication(vars: DeleteCommunicationVariables): MutationPromise<DeleteCommunicationData, DeleteCommunicationVariables>;

interface DeleteCommunicationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCommunicationVariables): MutationRef<DeleteCommunicationData, DeleteCommunicationVariables>;
}
export const deleteCommunicationRef: DeleteCommunicationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteCommunication(dc: DataConnect, vars: DeleteCommunicationVariables): MutationPromise<DeleteCommunicationData, DeleteCommunicationVariables>;

interface DeleteCommunicationRef {
  ...
  (dc: DataConnect, vars: DeleteCommunicationVariables): MutationRef<DeleteCommunicationData, DeleteCommunicationVariables>;
}
export const deleteCommunicationRef: DeleteCommunicationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteCommunicationRef:
```typescript
const name = deleteCommunicationRef.operationName;
console.log(name);
```

### Variables
The `DeleteCommunication` mutation requires an argument of type `DeleteCommunicationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteCommunicationVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteCommunication` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteCommunicationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteCommunicationData {
  communication_delete?: Communication_Key | null;
}
```
### Using `DeleteCommunication`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteCommunication, DeleteCommunicationVariables } from '@dataconnect/generated';

// The `DeleteCommunication` mutation requires an argument of type `DeleteCommunicationVariables`:
const deleteCommunicationVars: DeleteCommunicationVariables = {
  id: ..., 
};

// Call the `deleteCommunication()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteCommunication(deleteCommunicationVars);
// Variables can be defined inline as well.
const { data } = await deleteCommunication({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteCommunication(dataConnect, deleteCommunicationVars);

console.log(data.communication_delete);

// Or, you can use the `Promise` API.
deleteCommunication(deleteCommunicationVars).then((response) => {
  const data = response.data;
  console.log(data.communication_delete);
});
```

### Using `DeleteCommunication`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteCommunicationRef, DeleteCommunicationVariables } from '@dataconnect/generated';

// The `DeleteCommunication` mutation requires an argument of type `DeleteCommunicationVariables`:
const deleteCommunicationVars: DeleteCommunicationVariables = {
  id: ..., 
};

// Call the `deleteCommunicationRef()` function to get a reference to the mutation.
const ref = deleteCommunicationRef(deleteCommunicationVars);
// Variables can be defined inline as well.
const ref = deleteCommunicationRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteCommunicationRef(dataConnect, deleteCommunicationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.communication_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.communication_delete);
});
```

## CreateMetricsSnapshot
You can execute the `CreateMetricsSnapshot` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createMetricsSnapshot(vars: CreateMetricsSnapshotVariables): MutationPromise<CreateMetricsSnapshotData, CreateMetricsSnapshotVariables>;

interface CreateMetricsSnapshotRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMetricsSnapshotVariables): MutationRef<CreateMetricsSnapshotData, CreateMetricsSnapshotVariables>;
}
export const createMetricsSnapshotRef: CreateMetricsSnapshotRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createMetricsSnapshot(dc: DataConnect, vars: CreateMetricsSnapshotVariables): MutationPromise<CreateMetricsSnapshotData, CreateMetricsSnapshotVariables>;

interface CreateMetricsSnapshotRef {
  ...
  (dc: DataConnect, vars: CreateMetricsSnapshotVariables): MutationRef<CreateMetricsSnapshotData, CreateMetricsSnapshotVariables>;
}
export const createMetricsSnapshotRef: CreateMetricsSnapshotRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createMetricsSnapshotRef:
```typescript
const name = createMetricsSnapshotRef.operationName;
console.log(name);
```

### Variables
The `CreateMetricsSnapshot` mutation requires an argument of type `CreateMetricsSnapshotVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateMetricsSnapshotVariables {
  clientId: UUIDString;
  snapshotDate: DateString;
  hoursSaved: number;
  tasksAutomated: number;
  avgResponseSeconds?: number | null;
}
```
### Return Type
Recall that executing the `CreateMetricsSnapshot` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateMetricsSnapshotData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateMetricsSnapshotData {
  metricsSnapshot_insert: MetricsSnapshot_Key;
}
```
### Using `CreateMetricsSnapshot`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createMetricsSnapshot, CreateMetricsSnapshotVariables } from '@dataconnect/generated';

// The `CreateMetricsSnapshot` mutation requires an argument of type `CreateMetricsSnapshotVariables`:
const createMetricsSnapshotVars: CreateMetricsSnapshotVariables = {
  clientId: ..., 
  snapshotDate: ..., 
  hoursSaved: ..., 
  tasksAutomated: ..., 
  avgResponseSeconds: ..., // optional
};

// Call the `createMetricsSnapshot()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createMetricsSnapshot(createMetricsSnapshotVars);
// Variables can be defined inline as well.
const { data } = await createMetricsSnapshot({ clientId: ..., snapshotDate: ..., hoursSaved: ..., tasksAutomated: ..., avgResponseSeconds: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createMetricsSnapshot(dataConnect, createMetricsSnapshotVars);

console.log(data.metricsSnapshot_insert);

// Or, you can use the `Promise` API.
createMetricsSnapshot(createMetricsSnapshotVars).then((response) => {
  const data = response.data;
  console.log(data.metricsSnapshot_insert);
});
```

### Using `CreateMetricsSnapshot`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createMetricsSnapshotRef, CreateMetricsSnapshotVariables } from '@dataconnect/generated';

// The `CreateMetricsSnapshot` mutation requires an argument of type `CreateMetricsSnapshotVariables`:
const createMetricsSnapshotVars: CreateMetricsSnapshotVariables = {
  clientId: ..., 
  snapshotDate: ..., 
  hoursSaved: ..., 
  tasksAutomated: ..., 
  avgResponseSeconds: ..., // optional
};

// Call the `createMetricsSnapshotRef()` function to get a reference to the mutation.
const ref = createMetricsSnapshotRef(createMetricsSnapshotVars);
// Variables can be defined inline as well.
const ref = createMetricsSnapshotRef({ clientId: ..., snapshotDate: ..., hoursSaved: ..., tasksAutomated: ..., avgResponseSeconds: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createMetricsSnapshotRef(dataConnect, createMetricsSnapshotVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.metricsSnapshot_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.metricsSnapshot_insert);
});
```

## DeleteMetricsSnapshot
You can execute the `DeleteMetricsSnapshot` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteMetricsSnapshot(vars: DeleteMetricsSnapshotVariables): MutationPromise<DeleteMetricsSnapshotData, DeleteMetricsSnapshotVariables>;

interface DeleteMetricsSnapshotRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMetricsSnapshotVariables): MutationRef<DeleteMetricsSnapshotData, DeleteMetricsSnapshotVariables>;
}
export const deleteMetricsSnapshotRef: DeleteMetricsSnapshotRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteMetricsSnapshot(dc: DataConnect, vars: DeleteMetricsSnapshotVariables): MutationPromise<DeleteMetricsSnapshotData, DeleteMetricsSnapshotVariables>;

interface DeleteMetricsSnapshotRef {
  ...
  (dc: DataConnect, vars: DeleteMetricsSnapshotVariables): MutationRef<DeleteMetricsSnapshotData, DeleteMetricsSnapshotVariables>;
}
export const deleteMetricsSnapshotRef: DeleteMetricsSnapshotRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteMetricsSnapshotRef:
```typescript
const name = deleteMetricsSnapshotRef.operationName;
console.log(name);
```

### Variables
The `DeleteMetricsSnapshot` mutation requires an argument of type `DeleteMetricsSnapshotVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteMetricsSnapshotVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteMetricsSnapshot` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteMetricsSnapshotData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteMetricsSnapshotData {
  metricsSnapshot_delete?: MetricsSnapshot_Key | null;
}
```
### Using `DeleteMetricsSnapshot`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteMetricsSnapshot, DeleteMetricsSnapshotVariables } from '@dataconnect/generated';

// The `DeleteMetricsSnapshot` mutation requires an argument of type `DeleteMetricsSnapshotVariables`:
const deleteMetricsSnapshotVars: DeleteMetricsSnapshotVariables = {
  id: ..., 
};

// Call the `deleteMetricsSnapshot()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteMetricsSnapshot(deleteMetricsSnapshotVars);
// Variables can be defined inline as well.
const { data } = await deleteMetricsSnapshot({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteMetricsSnapshot(dataConnect, deleteMetricsSnapshotVars);

console.log(data.metricsSnapshot_delete);

// Or, you can use the `Promise` API.
deleteMetricsSnapshot(deleteMetricsSnapshotVars).then((response) => {
  const data = response.data;
  console.log(data.metricsSnapshot_delete);
});
```

### Using `DeleteMetricsSnapshot`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteMetricsSnapshotRef, DeleteMetricsSnapshotVariables } from '@dataconnect/generated';

// The `DeleteMetricsSnapshot` mutation requires an argument of type `DeleteMetricsSnapshotVariables`:
const deleteMetricsSnapshotVars: DeleteMetricsSnapshotVariables = {
  id: ..., 
};

// Call the `deleteMetricsSnapshotRef()` function to get a reference to the mutation.
const ref = deleteMetricsSnapshotRef(deleteMetricsSnapshotVars);
// Variables can be defined inline as well.
const ref = deleteMetricsSnapshotRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteMetricsSnapshotRef(dataConnect, deleteMetricsSnapshotVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.metricsSnapshot_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.metricsSnapshot_delete);
});
```

