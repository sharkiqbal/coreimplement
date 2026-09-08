import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

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

/** Generated Node Admin SDK operation action function for the 'CreateClient' Mutation. Allow users to execute without passing in DataConnect. */
export function createClient(dc: DataConnect, vars: CreateClientVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateClientData>>;
/** Generated Node Admin SDK operation action function for the 'CreateClient' Mutation. Allow users to pass in custom DataConnect instances. */
export function createClient(vars: CreateClientVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateClientData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateClientStatus' Mutation. Allow users to execute without passing in DataConnect. */
export function updateClientStatus(dc: DataConnect, vars: UpdateClientStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateClientStatusData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateClientStatus' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateClientStatus(vars: UpdateClientStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateClientStatusData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteClient' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteClient(dc: DataConnect, vars: DeleteClientVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteClientData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteClient' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteClient(vars: DeleteClientVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteClientData>>;

/** Generated Node Admin SDK operation action function for the 'CreateIntegration' Mutation. Allow users to execute without passing in DataConnect. */
export function createIntegration(dc: DataConnect, vars: CreateIntegrationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateIntegrationData>>;
/** Generated Node Admin SDK operation action function for the 'CreateIntegration' Mutation. Allow users to pass in custom DataConnect instances. */
export function createIntegration(vars: CreateIntegrationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateIntegrationData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteIntegration' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteIntegration(dc: DataConnect, vars: DeleteIntegrationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteIntegrationData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteIntegration' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteIntegration(vars: DeleteIntegrationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteIntegrationData>>;

/** Generated Node Admin SDK operation action function for the 'CreateClientIntegration' Mutation. Allow users to execute without passing in DataConnect. */
export function createClientIntegration(dc: DataConnect, vars: CreateClientIntegrationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateClientIntegrationData>>;
/** Generated Node Admin SDK operation action function for the 'CreateClientIntegration' Mutation. Allow users to pass in custom DataConnect instances. */
export function createClientIntegration(vars: CreateClientIntegrationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateClientIntegrationData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateClientIntegrationStatus' Mutation. Allow users to execute without passing in DataConnect. */
export function updateClientIntegrationStatus(dc: DataConnect, vars: UpdateClientIntegrationStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateClientIntegrationStatusData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateClientIntegrationStatus' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateClientIntegrationStatus(vars: UpdateClientIntegrationStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateClientIntegrationStatusData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteClientIntegration' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteClientIntegration(dc: DataConnect, vars: DeleteClientIntegrationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteClientIntegrationData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteClientIntegration' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteClientIntegration(vars: DeleteClientIntegrationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteClientIntegrationData>>;

/** Generated Node Admin SDK operation action function for the 'CreateAutomation' Mutation. Allow users to execute without passing in DataConnect. */
export function createAutomation(dc: DataConnect, vars: CreateAutomationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateAutomationData>>;
/** Generated Node Admin SDK operation action function for the 'CreateAutomation' Mutation. Allow users to pass in custom DataConnect instances. */
export function createAutomation(vars: CreateAutomationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateAutomationData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateAutomationStatus' Mutation. Allow users to execute without passing in DataConnect. */
export function updateAutomationStatus(dc: DataConnect, vars: UpdateAutomationStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateAutomationStatusData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateAutomationStatus' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateAutomationStatus(vars: UpdateAutomationStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateAutomationStatusData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteAutomation' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteAutomation(dc: DataConnect, vars: DeleteAutomationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteAutomationData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteAutomation' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteAutomation(vars: DeleteAutomationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteAutomationData>>;

/** Generated Node Admin SDK operation action function for the 'CreateAutomationRun' Mutation. Allow users to execute without passing in DataConnect. */
export function createAutomationRun(dc: DataConnect, vars: CreateAutomationRunVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateAutomationRunData>>;
/** Generated Node Admin SDK operation action function for the 'CreateAutomationRun' Mutation. Allow users to pass in custom DataConnect instances. */
export function createAutomationRun(vars: CreateAutomationRunVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateAutomationRunData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteAutomationRun' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteAutomationRun(dc: DataConnect, vars: DeleteAutomationRunVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteAutomationRunData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteAutomationRun' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteAutomationRun(vars: DeleteAutomationRunVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteAutomationRunData>>;

/** Generated Node Admin SDK operation action function for the 'CreateCommunication' Mutation. Allow users to execute without passing in DataConnect. */
export function createCommunication(dc: DataConnect, vars: CreateCommunicationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateCommunicationData>>;
/** Generated Node Admin SDK operation action function for the 'CreateCommunication' Mutation. Allow users to pass in custom DataConnect instances. */
export function createCommunication(vars: CreateCommunicationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateCommunicationData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteCommunication' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteCommunication(dc: DataConnect, vars: DeleteCommunicationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteCommunicationData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteCommunication' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteCommunication(vars: DeleteCommunicationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteCommunicationData>>;

/** Generated Node Admin SDK operation action function for the 'CreateMetricsSnapshot' Mutation. Allow users to execute without passing in DataConnect. */
export function createMetricsSnapshot(dc: DataConnect, vars: CreateMetricsSnapshotVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateMetricsSnapshotData>>;
/** Generated Node Admin SDK operation action function for the 'CreateMetricsSnapshot' Mutation. Allow users to pass in custom DataConnect instances. */
export function createMetricsSnapshot(vars: CreateMetricsSnapshotVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateMetricsSnapshotData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteMetricsSnapshot' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteMetricsSnapshot(dc: DataConnect, vars: DeleteMetricsSnapshotVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteMetricsSnapshotData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteMetricsSnapshot' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteMetricsSnapshot(vars: DeleteMetricsSnapshotVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteMetricsSnapshotData>>;

/** Generated Node Admin SDK operation action function for the 'ListClients' Query. Allow users to execute without passing in DataConnect. */
export function listClients(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListClientsData>>;
/** Generated Node Admin SDK operation action function for the 'ListClients' Query. Allow users to pass in custom DataConnect instances. */
export function listClients(options?: OperationOptions): Promise<ExecuteOperationResponse<ListClientsData>>;

/** Generated Node Admin SDK operation action function for the 'GetPersonaOverview' Query. Allow users to execute without passing in DataConnect. */
export function getPersonaOverview(dc: DataConnect, vars: GetPersonaOverviewVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetPersonaOverviewData>>;
/** Generated Node Admin SDK operation action function for the 'GetPersonaOverview' Query. Allow users to pass in custom DataConnect instances. */
export function getPersonaOverview(vars: GetPersonaOverviewVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetPersonaOverviewData>>;

/** Generated Node Admin SDK operation action function for the 'GetPersonaAutomations' Query. Allow users to execute without passing in DataConnect. */
export function getPersonaAutomations(dc: DataConnect, vars: GetPersonaAutomationsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetPersonaAutomationsData>>;
/** Generated Node Admin SDK operation action function for the 'GetPersonaAutomations' Query. Allow users to pass in custom DataConnect instances. */
export function getPersonaAutomations(vars: GetPersonaAutomationsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetPersonaAutomationsData>>;

/** Generated Node Admin SDK operation action function for the 'GetPersonaIntegrations' Query. Allow users to execute without passing in DataConnect. */
export function getPersonaIntegrations(dc: DataConnect, vars: GetPersonaIntegrationsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetPersonaIntegrationsData>>;
/** Generated Node Admin SDK operation action function for the 'GetPersonaIntegrations' Query. Allow users to pass in custom DataConnect instances. */
export function getPersonaIntegrations(vars: GetPersonaIntegrationsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetPersonaIntegrationsData>>;

/** Generated Node Admin SDK operation action function for the 'GetPersonaCommunications' Query. Allow users to execute without passing in DataConnect. */
export function getPersonaCommunications(dc: DataConnect, vars: GetPersonaCommunicationsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetPersonaCommunicationsData>>;
/** Generated Node Admin SDK operation action function for the 'GetPersonaCommunications' Query. Allow users to pass in custom DataConnect instances. */
export function getPersonaCommunications(vars: GetPersonaCommunicationsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetPersonaCommunicationsData>>;

/** Generated Node Admin SDK operation action function for the 'GetPersonaReports' Query. Allow users to execute without passing in DataConnect. */
export function getPersonaReports(dc: DataConnect, vars: GetPersonaReportsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetPersonaReportsData>>;
/** Generated Node Admin SDK operation action function for the 'GetPersonaReports' Query. Allow users to pass in custom DataConnect instances. */
export function getPersonaReports(vars: GetPersonaReportsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetPersonaReportsData>>;

