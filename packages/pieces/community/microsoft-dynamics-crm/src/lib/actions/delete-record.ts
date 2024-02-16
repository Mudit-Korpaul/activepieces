import {
  AuthenticationType,
  HttpMethod,
  HttpRequest,
  httpClient,
} from '@activepieces/pieces-common';
import { createAction } from '@activepieces/pieces-framework';
import { dynamicsCRMAuth } from '../../';
import { DynamicsCRMCommon } from '../common';
import { DynamicsCRMEntityDetails } from '../common/constants';

export const deleteRecordAction = createAction({
  auth: dynamicsCRMAuth,
  name: 'dynamics_crm_delete_record',
  displayName: 'Delete Record',
  description: 'Deletes an existing record.',
  props: {
    entityType: DynamicsCRMCommon.entityType(
      'Select or map the entity name whose records you want to delete.'
    ),
    recordId: DynamicsCRMCommon.recordId,
  },
  async run(context) {
    const { entityType, recordId } = context.propsValue;

    const entityUrlPath = DynamicsCRMEntityDetails[entityType].urlPath;

    const request: HttpRequest = {
      method: HttpMethod.DELETE,
      url: `${context.auth.props?.['hostUrl']}/api/data/v9.2/${entityUrlPath}(${recordId})`,
      authentication: {
        type: AuthenticationType.BEARER_TOKEN,
        token: context.auth.access_token,
      },
      headers: {
        Accept: 'application/json',
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0',
        'Content-Type': 'application/json',
      },
    };
    const res = await httpClient.sendRequest(request);
    return res.body;
  },
});
