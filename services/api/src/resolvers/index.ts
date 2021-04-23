import { AppDatasources } from '@src/datasources/types';
import { CeateUserInput } from '@src/generated/graphql';

export const resolvers = {
  Query: {
    user: (
      _: any,
      { userId }: { userId: string },
      { dataSources }: { dataSources: AppDatasources }
    ) => dataSources.users.getUserById(userId),
  },

  Mutation: {
    createUser: (
      _: any,
      { user }: { user: CeateUserInput },
      { dataSources }: { dataSources: AppDatasources }
    ) => dataSources.users.createUser(user),
  }
}