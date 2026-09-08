const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs, makeMemoryCacheProvider } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'platform-preview',
  service: 'core-implement-service',
  location: 'us-south1'
};
exports.connectorConfig = connectorConfig;
const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider()
  }
};
exports.dataConnectSettings = dataConnectSettings;

const createClientRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateClient', inputVars);
}
createClientRef.operationName = 'CreateClient';
exports.createClientRef = createClientRef;

exports.createClient = function createClient(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createClientRef(dcInstance, inputVars));
}
;

const updateClientStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateClientStatus', inputVars);
}
updateClientStatusRef.operationName = 'UpdateClientStatus';
exports.updateClientStatusRef = updateClientStatusRef;

exports.updateClientStatus = function updateClientStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateClientStatusRef(dcInstance, inputVars));
}
;

const deleteClientRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteClient', inputVars);
}
deleteClientRef.operationName = 'DeleteClient';
exports.deleteClientRef = deleteClientRef;

exports.deleteClient = function deleteClient(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteClientRef(dcInstance, inputVars));
}
;

const createIntegrationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateIntegration', inputVars);
}
createIntegrationRef.operationName = 'CreateIntegration';
exports.createIntegrationRef = createIntegrationRef;

exports.createIntegration = function createIntegration(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createIntegrationRef(dcInstance, inputVars));
}
;

const deleteIntegrationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteIntegration', inputVars);
}
deleteIntegrationRef.operationName = 'DeleteIntegration';
exports.deleteIntegrationRef = deleteIntegrationRef;

exports.deleteIntegration = function deleteIntegration(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteIntegrationRef(dcInstance, inputVars));
}
;

const createClientIntegrationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateClientIntegration', inputVars);
}
createClientIntegrationRef.operationName = 'CreateClientIntegration';
exports.createClientIntegrationRef = createClientIntegrationRef;

exports.createClientIntegration = function createClientIntegration(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createClientIntegrationRef(dcInstance, inputVars));
}
;

const updateClientIntegrationStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateClientIntegrationStatus', inputVars);
}
updateClientIntegrationStatusRef.operationName = 'UpdateClientIntegrationStatus';
exports.updateClientIntegrationStatusRef = updateClientIntegrationStatusRef;

exports.updateClientIntegrationStatus = function updateClientIntegrationStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateClientIntegrationStatusRef(dcInstance, inputVars));
}
;

const deleteClientIntegrationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteClientIntegration', inputVars);
}
deleteClientIntegrationRef.operationName = 'DeleteClientIntegration';
exports.deleteClientIntegrationRef = deleteClientIntegrationRef;

exports.deleteClientIntegration = function deleteClientIntegration(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteClientIntegrationRef(dcInstance, inputVars));
}
;

const createAutomationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAutomation', inputVars);
}
createAutomationRef.operationName = 'CreateAutomation';
exports.createAutomationRef = createAutomationRef;

exports.createAutomation = function createAutomation(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createAutomationRef(dcInstance, inputVars));
}
;

const updateAutomationStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAutomationStatus', inputVars);
}
updateAutomationStatusRef.operationName = 'UpdateAutomationStatus';
exports.updateAutomationStatusRef = updateAutomationStatusRef;

exports.updateAutomationStatus = function updateAutomationStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateAutomationStatusRef(dcInstance, inputVars));
}
;

const deleteAutomationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteAutomation', inputVars);
}
deleteAutomationRef.operationName = 'DeleteAutomation';
exports.deleteAutomationRef = deleteAutomationRef;

exports.deleteAutomation = function deleteAutomation(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteAutomationRef(dcInstance, inputVars));
}
;

const createAutomationRunRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAutomationRun', inputVars);
}
createAutomationRunRef.operationName = 'CreateAutomationRun';
exports.createAutomationRunRef = createAutomationRunRef;

exports.createAutomationRun = function createAutomationRun(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createAutomationRunRef(dcInstance, inputVars));
}
;

const deleteAutomationRunRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteAutomationRun', inputVars);
}
deleteAutomationRunRef.operationName = 'DeleteAutomationRun';
exports.deleteAutomationRunRef = deleteAutomationRunRef;

exports.deleteAutomationRun = function deleteAutomationRun(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteAutomationRunRef(dcInstance, inputVars));
}
;

const createCommunicationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCommunication', inputVars);
}
createCommunicationRef.operationName = 'CreateCommunication';
exports.createCommunicationRef = createCommunicationRef;

exports.createCommunication = function createCommunication(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createCommunicationRef(dcInstance, inputVars));
}
;

const deleteCommunicationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteCommunication', inputVars);
}
deleteCommunicationRef.operationName = 'DeleteCommunication';
exports.deleteCommunicationRef = deleteCommunicationRef;

exports.deleteCommunication = function deleteCommunication(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteCommunicationRef(dcInstance, inputVars));
}
;

const createMetricsSnapshotRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMetricsSnapshot', inputVars);
}
createMetricsSnapshotRef.operationName = 'CreateMetricsSnapshot';
exports.createMetricsSnapshotRef = createMetricsSnapshotRef;

exports.createMetricsSnapshot = function createMetricsSnapshot(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createMetricsSnapshotRef(dcInstance, inputVars));
}
;

const deleteMetricsSnapshotRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteMetricsSnapshot', inputVars);
}
deleteMetricsSnapshotRef.operationName = 'DeleteMetricsSnapshot';
exports.deleteMetricsSnapshotRef = deleteMetricsSnapshotRef;

exports.deleteMetricsSnapshot = function deleteMetricsSnapshot(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteMetricsSnapshotRef(dcInstance, inputVars));
}
;

const listClientsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListClients');
}
listClientsRef.operationName = 'ListClients';
exports.listClientsRef = listClientsRef;

exports.listClients = function listClients(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listClientsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getPersonaOverviewRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPersonaOverview', inputVars);
}
getPersonaOverviewRef.operationName = 'GetPersonaOverview';
exports.getPersonaOverviewRef = getPersonaOverviewRef;

exports.getPersonaOverview = function getPersonaOverview(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getPersonaOverviewRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getPersonaAutomationsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPersonaAutomations', inputVars);
}
getPersonaAutomationsRef.operationName = 'GetPersonaAutomations';
exports.getPersonaAutomationsRef = getPersonaAutomationsRef;

exports.getPersonaAutomations = function getPersonaAutomations(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getPersonaAutomationsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getPersonaIntegrationsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPersonaIntegrations', inputVars);
}
getPersonaIntegrationsRef.operationName = 'GetPersonaIntegrations';
exports.getPersonaIntegrationsRef = getPersonaIntegrationsRef;

exports.getPersonaIntegrations = function getPersonaIntegrations(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getPersonaIntegrationsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getPersonaCommunicationsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPersonaCommunications', inputVars);
}
getPersonaCommunicationsRef.operationName = 'GetPersonaCommunications';
exports.getPersonaCommunicationsRef = getPersonaCommunicationsRef;

exports.getPersonaCommunications = function getPersonaCommunications(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getPersonaCommunicationsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getPersonaReportsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPersonaReports', inputVars);
}
getPersonaReportsRef.operationName = 'GetPersonaReports';
exports.getPersonaReportsRef = getPersonaReportsRef;

exports.getPersonaReports = function getPersonaReports(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getPersonaReportsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;
