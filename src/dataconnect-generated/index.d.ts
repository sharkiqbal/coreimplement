import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AutomationRun_Key {
  id: UUIDString;
  __typename?: 'AutomationRun_Key';
}

export interface Automation_Key {
  id: UUIDString;
  __typename?: 'Automation_Key';
}

export interface ClientIntegration_Key {
  clientId: UUIDString;
  integrationId: UUIDString;
  __typename?: 'ClientIntegration_Key';
}

export interface Client_Key {
  id: UUIDString;
  __typename?: 'Client_Key';
}

export interface Communication_Key {
  id: UUIDString;
  __typename?: 'Communication_Key';
}

export interface CreateAutomationData {
  automation_insert: Automation_Key;
}

export interface CreateAutomationRunData {
  automationRun_insert: AutomationRun_Key;
}

export interface CreateAutomationRunVariables {
  automationId: UUIDString;
  runAt?: TimestampString | null;
  status: string;
  summary?: string | null;
  recordsProcessed?: number | null;
}

export interface CreateAutomationVariables {
  clientId: UUIDString;
  name: string;
  description?: string | null;
  triggerType: string;
  status?: string | null;
}

export interface CreateClientData {
  client_insert: Client_Key;
}

export interface CreateClientIntegrationData {
  clientIntegration_insert: ClientIntegration_Key;
}

export interface CreateClientIntegrationVariables {
  clientId: UUIDString;
  integrationId: UUIDString;
  status?: string | null;
  connectedAt?: TimestampString | null;
}

export interface CreateClientVariables {
  name: string;
  industry: string;
  contactName?: string | null;
  contactEmail?: string | null;
  status?: string | null;
}

export interface CreateCommunicationData {
  communication_insert: Communication_Key;
}

export interface CreateCommunicationVariables {
  clientId: UUIDString;
  channel: string;
  direction: string;
  summary?: string | null;
  transcriptUrl?: string | null;
  occurredAt?: TimestampString | null;
  handledBy?: string | null;
}

export interface CreateIntegrationData {
  integration_insert: Integration_Key;
}

export interface CreateIntegrationVariables {
  name: string;
  category: string;
  logoUrl?: string | null;
}

export interface CreateMetricsSnapshotData {
  metricsSnapshot_insert: MetricsSnapshot_Key;
}

export interface CreateMetricsSnapshotVariables {
  clientId: UUIDString;
  snapshotDate: DateString;
  hoursSaved: number;
  tasksAutomated: number;
  avgResponseSeconds?: number | null;
}

export interface DeleteAutomationData {
  automation_delete?: Automation_Key | null;
}

export interface DeleteAutomationRunData {
  automationRun_delete?: AutomationRun_Key | null;
}

export interface DeleteAutomationRunVariables {
  id: UUIDString;
}

export interface DeleteAutomationVariables {
  id: UUIDString;
}

export interface DeleteClientData {
  client_delete?: Client_Key | null;
}

export interface DeleteClientIntegrationData {
  clientIntegration_delete?: ClientIntegration_Key | null;
}

export interface DeleteClientIntegrationVariables {
  clientId: UUIDString;
  integrationId: UUIDString;
}

export interface DeleteClientVariables {
  id: UUIDString;
}

export interface DeleteCommunicationData {
  communication_delete?: Communication_Key | null;
}

export interface DeleteCommunicationVariables {
  id: UUIDString;
}

export interface DeleteIntegrationData {
  integration_delete?: Integration_Key | null;
}

export interface DeleteIntegrationVariables {
  id: UUIDString;
}

export interface DeleteMetricsSnapshotData {
  metricsSnapshot_delete?: MetricsSnapshot_Key | null;
}

export interface DeleteMetricsSnapshotVariables {
  id: UUIDString;
}

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

export interface GetPersonaAutomationsVariables {
  industry: string;
}

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

export interface GetPersonaCommunicationsVariables {
  industry: string;
}

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

export interface GetPersonaIntegrationsVariables {
  industry: string;
}

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

export interface GetPersonaOverviewVariables {
  industry: string;
}

export interface GetPersonaReportsData {
  metricsSnapshots: ({
    id: UUIDString;
    snapshotDate: DateString;
    hoursSaved: number;
    tasksAutomated: number;
    avgResponseSeconds?: number | null;
  } & MetricsSnapshot_Key)[];
}

export interface GetPersonaReportsVariables {
  industry: string;
}

export interface Integration_Key {
  id: UUIDString;
  __typename?: 'Integration_Key';
}

export interface ListClientsData {
  clients: ({
    id: UUIDString;
    name: string;
    industry: string;
    status: string;
  } & Client_Key)[];
}

export interface MetricsSnapshot_Key {
  id: UUIDString;
  __typename?: 'MetricsSnapshot_Key';
}

export interface UpdateAutomationStatusData {
  automation_update?: Automation_Key | null;
}

export interface UpdateAutomationStatusVariables {
  id: UUIDString;
  status: string;
}

export interface UpdateClientIntegrationStatusData {
  clientIntegration_update?: ClientIntegration_Key | null;
}

export interface UpdateClientIntegrationStatusVariables {
  clientId: UUIDString;
  integrationId: UUIDString;
  status: string;
}

export interface UpdateClientStatusData {
  client_update?: Client_Key | null;
}

export interface UpdateClientStatusVariables {
  id: UUIDString;
  status: string;
}

interface CreateClientRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateClientVariables): MutationRef<CreateClientData, CreateClientVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateClientVariables): MutationRef<CreateClientData, CreateClientVariables>;
  operationName: string;
}
export const createClientRef: CreateClientRef;

export function createClient(vars: CreateClientVariables): MutationPromise<CreateClientData, CreateClientVariables>;
export function createClient(dc: DataConnect, vars: CreateClientVariables): MutationPromise<CreateClientData, CreateClientVariables>;

interface UpdateClientStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateClientStatusVariables): MutationRef<UpdateClientStatusData, UpdateClientStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateClientStatusVariables): MutationRef<UpdateClientStatusData, UpdateClientStatusVariables>;
  operationName: string;
}
export const updateClientStatusRef: UpdateClientStatusRef;

export function updateClientStatus(vars: UpdateClientStatusVariables): MutationPromise<UpdateClientStatusData, UpdateClientStatusVariables>;
export function updateClientStatus(dc: DataConnect, vars: UpdateClientStatusVariables): MutationPromise<UpdateClientStatusData, UpdateClientStatusVariables>;

interface DeleteClientRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteClientVariables): MutationRef<DeleteClientData, DeleteClientVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteClientVariables): MutationRef<DeleteClientData, DeleteClientVariables>;
  operationName: string;
}
export const deleteClientRef: DeleteClientRef;

export function deleteClient(vars: DeleteClientVariables): MutationPromise<DeleteClientData, DeleteClientVariables>;
export function deleteClient(dc: DataConnect, vars: DeleteClientVariables): MutationPromise<DeleteClientData, DeleteClientVariables>;

interface CreateIntegrationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateIntegrationVariables): MutationRef<CreateIntegrationData, CreateIntegrationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateIntegrationVariables): MutationRef<CreateIntegrationData, CreateIntegrationVariables>;
  operationName: string;
}
export const createIntegrationRef: CreateIntegrationRef;

export function createIntegration(vars: CreateIntegrationVariables): MutationPromise<CreateIntegrationData, CreateIntegrationVariables>;
export function createIntegration(dc: DataConnect, vars: CreateIntegrationVariables): MutationPromise<CreateIntegrationData, CreateIntegrationVariables>;

interface DeleteIntegrationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteIntegrationVariables): MutationRef<DeleteIntegrationData, DeleteIntegrationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteIntegrationVariables): MutationRef<DeleteIntegrationData, DeleteIntegrationVariables>;
  operationName: string;
}
export const deleteIntegrationRef: DeleteIntegrationRef;

export function deleteIntegration(vars: DeleteIntegrationVariables): MutationPromise<DeleteIntegrationData, DeleteIntegrationVariables>;
export function deleteIntegration(dc: DataConnect, vars: DeleteIntegrationVariables): MutationPromise<DeleteIntegrationData, DeleteIntegrationVariables>;

interface CreateClientIntegrationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateClientIntegrationVariables): MutationRef<CreateClientIntegrationData, CreateClientIntegrationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateClientIntegrationVariables): MutationRef<CreateClientIntegrationData, CreateClientIntegrationVariables>;
  operationName: string;
}
export const createClientIntegrationRef: CreateClientIntegrationRef;

export function createClientIntegration(vars: CreateClientIntegrationVariables): MutationPromise<CreateClientIntegrationData, CreateClientIntegrationVariables>;
export function createClientIntegration(dc: DataConnect, vars: CreateClientIntegrationVariables): MutationPromise<CreateClientIntegrationData, CreateClientIntegrationVariables>;

interface UpdateClientIntegrationStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateClientIntegrationStatusVariables): MutationRef<UpdateClientIntegrationStatusData, UpdateClientIntegrationStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateClientIntegrationStatusVariables): MutationRef<UpdateClientIntegrationStatusData, UpdateClientIntegrationStatusVariables>;
  operationName: string;
}
export const updateClientIntegrationStatusRef: UpdateClientIntegrationStatusRef;

export function updateClientIntegrationStatus(vars: UpdateClientIntegrationStatusVariables): MutationPromise<UpdateClientIntegrationStatusData, UpdateClientIntegrationStatusVariables>;
export function updateClientIntegrationStatus(dc: DataConnect, vars: UpdateClientIntegrationStatusVariables): MutationPromise<UpdateClientIntegrationStatusData, UpdateClientIntegrationStatusVariables>;

interface DeleteClientIntegrationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteClientIntegrationVariables): MutationRef<DeleteClientIntegrationData, DeleteClientIntegrationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteClientIntegrationVariables): MutationRef<DeleteClientIntegrationData, DeleteClientIntegrationVariables>;
  operationName: string;
}
export const deleteClientIntegrationRef: DeleteClientIntegrationRef;

export function deleteClientIntegration(vars: DeleteClientIntegrationVariables): MutationPromise<DeleteClientIntegrationData, DeleteClientIntegrationVariables>;
export function deleteClientIntegration(dc: DataConnect, vars: DeleteClientIntegrationVariables): MutationPromise<DeleteClientIntegrationData, DeleteClientIntegrationVariables>;

interface CreateAutomationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAutomationVariables): MutationRef<CreateAutomationData, CreateAutomationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateAutomationVariables): MutationRef<CreateAutomationData, CreateAutomationVariables>;
  operationName: string;
}
export const createAutomationRef: CreateAutomationRef;

export function createAutomation(vars: CreateAutomationVariables): MutationPromise<CreateAutomationData, CreateAutomationVariables>;
export function createAutomation(dc: DataConnect, vars: CreateAutomationVariables): MutationPromise<CreateAutomationData, CreateAutomationVariables>;

interface UpdateAutomationStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAutomationStatusVariables): MutationRef<UpdateAutomationStatusData, UpdateAutomationStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateAutomationStatusVariables): MutationRef<UpdateAutomationStatusData, UpdateAutomationStatusVariables>;
  operationName: string;
}
export const updateAutomationStatusRef: UpdateAutomationStatusRef;

export function updateAutomationStatus(vars: UpdateAutomationStatusVariables): MutationPromise<UpdateAutomationStatusData, UpdateAutomationStatusVariables>;
export function updateAutomationStatus(dc: DataConnect, vars: UpdateAutomationStatusVariables): MutationPromise<UpdateAutomationStatusData, UpdateAutomationStatusVariables>;

interface DeleteAutomationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAutomationVariables): MutationRef<DeleteAutomationData, DeleteAutomationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteAutomationVariables): MutationRef<DeleteAutomationData, DeleteAutomationVariables>;
  operationName: string;
}
export const deleteAutomationRef: DeleteAutomationRef;

export function deleteAutomation(vars: DeleteAutomationVariables): MutationPromise<DeleteAutomationData, DeleteAutomationVariables>;
export function deleteAutomation(dc: DataConnect, vars: DeleteAutomationVariables): MutationPromise<DeleteAutomationData, DeleteAutomationVariables>;

interface CreateAutomationRunRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAutomationRunVariables): MutationRef<CreateAutomationRunData, CreateAutomationRunVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateAutomationRunVariables): MutationRef<CreateAutomationRunData, CreateAutomationRunVariables>;
  operationName: string;
}
export const createAutomationRunRef: CreateAutomationRunRef;

export function createAutomationRun(vars: CreateAutomationRunVariables): MutationPromise<CreateAutomationRunData, CreateAutomationRunVariables>;
export function createAutomationRun(dc: DataConnect, vars: CreateAutomationRunVariables): MutationPromise<CreateAutomationRunData, CreateAutomationRunVariables>;

interface DeleteAutomationRunRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAutomationRunVariables): MutationRef<DeleteAutomationRunData, DeleteAutomationRunVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteAutomationRunVariables): MutationRef<DeleteAutomationRunData, DeleteAutomationRunVariables>;
  operationName: string;
}
export const deleteAutomationRunRef: DeleteAutomationRunRef;

export function deleteAutomationRun(vars: DeleteAutomationRunVariables): MutationPromise<DeleteAutomationRunData, DeleteAutomationRunVariables>;
export function deleteAutomationRun(dc: DataConnect, vars: DeleteAutomationRunVariables): MutationPromise<DeleteAutomationRunData, DeleteAutomationRunVariables>;

interface CreateCommunicationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCommunicationVariables): MutationRef<CreateCommunicationData, CreateCommunicationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateCommunicationVariables): MutationRef<CreateCommunicationData, CreateCommunicationVariables>;
  operationName: string;
}
export const createCommunicationRef: CreateCommunicationRef;

export function createCommunication(vars: CreateCommunicationVariables): MutationPromise<CreateCommunicationData, CreateCommunicationVariables>;
export function createCommunication(dc: DataConnect, vars: CreateCommunicationVariables): MutationPromise<CreateCommunicationData, CreateCommunicationVariables>;

interface DeleteCommunicationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCommunicationVariables): MutationRef<DeleteCommunicationData, DeleteCommunicationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteCommunicationVariables): MutationRef<DeleteCommunicationData, DeleteCommunicationVariables>;
  operationName: string;
}
export const deleteCommunicationRef: DeleteCommunicationRef;

export function deleteCommunication(vars: DeleteCommunicationVariables): MutationPromise<DeleteCommunicationData, DeleteCommunicationVariables>;
export function deleteCommunication(dc: DataConnect, vars: DeleteCommunicationVariables): MutationPromise<DeleteCommunicationData, DeleteCommunicationVariables>;

interface CreateMetricsSnapshotRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMetricsSnapshotVariables): MutationRef<CreateMetricsSnapshotData, CreateMetricsSnapshotVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMetricsSnapshotVariables): MutationRef<CreateMetricsSnapshotData, CreateMetricsSnapshotVariables>;
  operationName: string;
}
export const createMetricsSnapshotRef: CreateMetricsSnapshotRef;

export function createMetricsSnapshot(vars: CreateMetricsSnapshotVariables): MutationPromise<CreateMetricsSnapshotData, CreateMetricsSnapshotVariables>;
export function createMetricsSnapshot(dc: DataConnect, vars: CreateMetricsSnapshotVariables): MutationPromise<CreateMetricsSnapshotData, CreateMetricsSnapshotVariables>;

interface DeleteMetricsSnapshotRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMetricsSnapshotVariables): MutationRef<DeleteMetricsSnapshotData, DeleteMetricsSnapshotVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteMetricsSnapshotVariables): MutationRef<DeleteMetricsSnapshotData, DeleteMetricsSnapshotVariables>;
  operationName: string;
}
export const deleteMetricsSnapshotRef: DeleteMetricsSnapshotRef;

export function deleteMetricsSnapshot(vars: DeleteMetricsSnapshotVariables): MutationPromise<DeleteMetricsSnapshotData, DeleteMetricsSnapshotVariables>;
export function deleteMetricsSnapshot(dc: DataConnect, vars: DeleteMetricsSnapshotVariables): MutationPromise<DeleteMetricsSnapshotData, DeleteMetricsSnapshotVariables>;

interface ListClientsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListClientsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListClientsData, undefined>;
  operationName: string;
}
export const listClientsRef: ListClientsRef;

export function listClients(options?: ExecuteQueryOptions): QueryPromise<ListClientsData, undefined>;
export function listClients(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListClientsData, undefined>;

interface GetPersonaOverviewRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPersonaOverviewVariables): QueryRef<GetPersonaOverviewData, GetPersonaOverviewVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPersonaOverviewVariables): QueryRef<GetPersonaOverviewData, GetPersonaOverviewVariables>;
  operationName: string;
}
export const getPersonaOverviewRef: GetPersonaOverviewRef;

export function getPersonaOverview(vars: GetPersonaOverviewVariables, options?: ExecuteQueryOptions): QueryPromise<GetPersonaOverviewData, GetPersonaOverviewVariables>;
export function getPersonaOverview(dc: DataConnect, vars: GetPersonaOverviewVariables, options?: ExecuteQueryOptions): QueryPromise<GetPersonaOverviewData, GetPersonaOverviewVariables>;

interface GetPersonaAutomationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPersonaAutomationsVariables): QueryRef<GetPersonaAutomationsData, GetPersonaAutomationsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPersonaAutomationsVariables): QueryRef<GetPersonaAutomationsData, GetPersonaAutomationsVariables>;
  operationName: string;
}
export const getPersonaAutomationsRef: GetPersonaAutomationsRef;

export function getPersonaAutomations(vars: GetPersonaAutomationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetPersonaAutomationsData, GetPersonaAutomationsVariables>;
export function getPersonaAutomations(dc: DataConnect, vars: GetPersonaAutomationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetPersonaAutomationsData, GetPersonaAutomationsVariables>;

interface GetPersonaIntegrationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPersonaIntegrationsVariables): QueryRef<GetPersonaIntegrationsData, GetPersonaIntegrationsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPersonaIntegrationsVariables): QueryRef<GetPersonaIntegrationsData, GetPersonaIntegrationsVariables>;
  operationName: string;
}
export const getPersonaIntegrationsRef: GetPersonaIntegrationsRef;

export function getPersonaIntegrations(vars: GetPersonaIntegrationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetPersonaIntegrationsData, GetPersonaIntegrationsVariables>;
export function getPersonaIntegrations(dc: DataConnect, vars: GetPersonaIntegrationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetPersonaIntegrationsData, GetPersonaIntegrationsVariables>;

interface GetPersonaCommunicationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPersonaCommunicationsVariables): QueryRef<GetPersonaCommunicationsData, GetPersonaCommunicationsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPersonaCommunicationsVariables): QueryRef<GetPersonaCommunicationsData, GetPersonaCommunicationsVariables>;
  operationName: string;
}
export const getPersonaCommunicationsRef: GetPersonaCommunicationsRef;

export function getPersonaCommunications(vars: GetPersonaCommunicationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetPersonaCommunicationsData, GetPersonaCommunicationsVariables>;
export function getPersonaCommunications(dc: DataConnect, vars: GetPersonaCommunicationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetPersonaCommunicationsData, GetPersonaCommunicationsVariables>;

interface GetPersonaReportsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPersonaReportsVariables): QueryRef<GetPersonaReportsData, GetPersonaReportsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPersonaReportsVariables): QueryRef<GetPersonaReportsData, GetPersonaReportsVariables>;
  operationName: string;
}
export const getPersonaReportsRef: GetPersonaReportsRef;

export function getPersonaReports(vars: GetPersonaReportsVariables, options?: ExecuteQueryOptions): QueryPromise<GetPersonaReportsData, GetPersonaReportsVariables>;
export function getPersonaReports(dc: DataConnect, vars: GetPersonaReportsVariables, options?: ExecuteQueryOptions): QueryPromise<GetPersonaReportsData, GetPersonaReportsVariables>;

