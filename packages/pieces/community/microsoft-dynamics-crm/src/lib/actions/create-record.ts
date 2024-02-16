import { dynamicsCRMAuth } from '@activepieces/piece-microsoft-dynamics-crm';
import { createAction } from '@activepieces/pieces-framework';
import { DynamicsCRMCommon } from '../common';

export const createRecordAction = createAction({
  auth: dynamicsCRMAuth,
  name: 'dynamics_crm_create_record',
  displayName: 'Create Record',
  description: 'Creates a new record.',
  props: {
    entityType: DynamicsCRMCommon.entityType(
      'Select or map the entity for which you want to create the record.'
    ),
    fields: DynamicsCRMCommon.entityFields,
  },
  async run(context) {
    const { entityType, fields } = context.propsValue;
    console.log('INSIDE RUN');
    console.log(entityType);
    console.log(fields);
  },
});
