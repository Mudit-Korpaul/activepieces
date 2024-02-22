import { createAction, Property } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { makeClient } from '../../common';
import { digiformaProps } from '../../common/props';

export const createProgramAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_create_program',
  displayName: 'Create Program',
  description: 'Creates a new program',
  props: {
    name: Property.ShortText({
      displayName: 'Name',
      required: true,
    }),
    ...digiformaProps.program,
  },
  async run(context) {
    const {
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

    const client = makeClient(context.auth);
    return await client.createProgram({
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
      goals: goals.map((text) => ({ text })),
      targets: targets.map((text) => ({ text })),
      prerequisites: prerequisites.map((text) => ({ text })),
    });
  },
});
