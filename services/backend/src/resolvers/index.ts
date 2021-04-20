import { AppDatasources } from '@src/datasources/types';
import { CeateUserInput } from '@src/generated/graphql';

export const resolvers = {
  Query: {
    user: (
      _: any,
      { id }: { id: string },
      { dataSources }: { dataSources: AppDatasources }
    ) => dataSources.users.getUserById(id),
  },

  Mutation: {
    createUser: (
      _: any,
      { user }: { user: CeateUserInput },
      { dataSources }: { dataSources: AppDatasources }
    ) => dataSources.users.createUser(user),
  }
}