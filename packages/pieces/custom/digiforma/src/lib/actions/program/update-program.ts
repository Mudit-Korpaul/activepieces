import { createAction, Property } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';
import { digiformaProps } from '../../common/props';
import { ProgramInput } from '../../common/types';

export const updateProgramAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_update_program',
  displayName: 'Update Program',
  description: 'Updates an existing program.',
  props: {
    programId: digiformaCommon.programId(true),
    name: Property.ShortText({
      displayName: 'Name',
      required: false,
    }),
    ...digiformaProps.program,
  },
  async run(context) {
    const {
      programId,
      name,
      subtitle,
      code,
      onSale,
      version,
      durationInDays,
      durationInHours,
      categoryId,
      description,
      accountingAnalytics,
      accountingNumber,
      accountingNumberFundingAgency,
      certifInfoCode,
      certificationDetails,
      certificationIncludedInAdditionalExpenses,
      certificationRegistrationDate,
      diploma,
      diplomaTitle,
      dpc,
      economicalModel,
      graduationTarget,
      graduationModality,
      graduationValidityYears,
      mentoring,
      satisfactionDescription,
      specialty,
      trainingPedagogicalModality,
    } = context.propsValue;
    const goals = context.propsValue.goals as string[];
    const targets = context.propsValue.targets as string[];
    const prerequisites = context.propsValue.prerequisites as string[];

    const input: ProgramInput = {
      name,
      subtitle,
      code,
      onSale,
      version,
      durationInDays,
      durationInHours,
      categoryId,
      description,
      accountingAnalytics,
      accountingNumber,
      accountingNumberFundingAgency,
      certifInfoCode,
      certificationDetails,
      certificationIncludedInAdditionalExpenses,
      certificationRegistrationDate,
      diploma,
      diplomaTitle,
      dpc,
      economicalModel,
      graduationTarget,
      graduationModality,
      graduationValidityYears,
      mentoring,
      satisfactionDescription,
      specialty,
      trainingPedagogicalModality,
    };
    if (goals.length !== 0) input.goals = goals.map((text) => ({ text }));
    if (targets.length !== 0) input.targets = targets.map((text) => ({ text }));
    if (prerequisites.length !== 0) input.prerequisites = prerequisites.map((text) => ({ text }));

    const client = makeClient(context.auth);
    return await client.updateProgram(programId!, input);
  },
});
