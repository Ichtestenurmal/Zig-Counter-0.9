import HttpError from '@wasp/core/HttpError.js'

export const getTrackers = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Tracker.findMany({
    where: {
      user: { id: context.user.id }
    }
  });
}

export const getDailyData = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.DailyData.findMany({
    where: {
      user: { id: context.user.id }
    }
  });
}