import { digiformaAuth } from '@activepieces/piece-digiforma';
import { Property, createAction } from '@activepieces/pieces-framework';
import { digiformaCommon, makeClient } from '../../common';

export const createAbandonInSlotACtion = createAction({
	auth: digiformaAuth,
	name: 'digiforma_create_abandon_in_slot',
	displayName: 'Create an Abandon in Slot',
	description: 'Create an abandon or absence on dates when the trainee is absent on the training',
	props: {
		trainingSessionId: digiformaCommon.trainingSessionId(true),
		traineeId: Property.Dropdown({
			displayName: 'Trainee ID',
			refreshers: ['trainingSessionId'],
			required: true,
			description: 'Trainee shoud be part of training session.',
			options: async ({ auth, trainingSessionId }) => {
				if (!auth || !trainingSessionId) {
					return {
						options: [],
						disabled: true,
						placeholder: 'Please select training session first.',
					};
				}

				const client = makeClient(auth as string);
				const res: any = await client.listTraineesInTrainingSession(trainingSessionId as string);

				return {
					disabled: false,
					options: res['data']['trainingSession']['trainees'].map(
						(trainee: { id: string; firstname: string; lastname: string }) => {
							return {
								label: `${trainee.firstname} ${trainee.lastname}`,
								value: trainee.id,
							};
						},
					),
				};
			},
		}),
	},
	async run(context) {},
});
