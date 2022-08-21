import API, { graphqlOperation } from '@aws-amplify/api';
import { queryAllReminders } from '../queries/QUERY_GET_ALL_DATE_REMINDERS';

export async function queryAllDateReminders() {
  return await API.graphql(graphqlOperation(queryAllReminders));
}
