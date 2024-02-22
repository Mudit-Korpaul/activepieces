import { Property, createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { makeClient } from '../../common';

export const addInstructorToSlotAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_add_instructor_to_slot',
  displayName: 'Add Instructor to Slot',
  description:
    'Add a training session instructor to a training session slot. Make sure you already added the instructor to the training session and you are using the id of the training session instructor and not the id of the instructor.',
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
    return await client.addInstructorToSlot(slot_id, training_session_instructor_id);
  },
});
