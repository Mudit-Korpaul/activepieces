import { Property, createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { makeClient } from '../../common';

export const removeInstructorFromSlotAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_remove_instructor_from_slot',
  displayName: 'Remove Instructor from Slot',
  description:
    'Removes a training session instructor from a training session slot. If no instructor get assign to a slot, all instructor registered to the training session will appear on the slot. If your request fail, there might be no instructor assigned to the slot.',
  props: {
    slot_id: Property.ShortText({
      displayName: 'Slot ID',
      required: true,
    }),
    training_session_instructor_id: Property.ShortText({
      displayName: 'Training Session Instructor ID',
      required: true,
    }),
  },
  async run(context) {
    const { slot_id, training_session_instructor_id } = context.propsValue;
    const client = makeClient(context.auth);
    return await client.removeInstructorFromSlot(slot_id, training_session_instructor_id);
  },
});
