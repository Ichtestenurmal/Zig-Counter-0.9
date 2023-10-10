import HttpError from '@wasp/core/HttpError.js'

export const incrementTracker = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { trackerId } = args;

  const tracker = await context.entities.Tracker.findUnique({
    where: { id: trackerId }
  });

  if (!tracker) { throw new HttpError(404, 'Tracker not found') };

  if (tracker.userId !== context.user.id) { throw new HttpError(403) };

  const updatedTracker = await context.entities.Tracker.update({
    where: { id: trackerId },
    data: { value: tracker.value + 1 }
  });

  return updatedTracker;
}

export const decrementTracker = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const tracker = await context.entities.Tracker.findUnique({
    where: { id: args.trackerId }
  });

  if (tracker.userId !== context.user.id) { throw new HttpError(403) }

  const updatedTracker = await context.entities.Tracker.update({
    where: { id: args.trackerId },
    data: { value: tracker.value - 1 }
  });

  return updatedTracker;
}

export const transferData = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const currentDate = new Date();
  const currentHour = currentDate.getUTCHours();

  if (currentHour !== 0) { return; }

  const users = await context.entities.User.findMany();

  for (const user of users) {
    const trackers = await context.entities.Tracker.findMany({ where: { userId: user.id } });
    const totalValue = trackers.reduce((sum, tracker) => sum + tracker.value, 0);

    await context.entities.DailyData.create({
      data: {
        date: currentDate,
        user: { connect: { id: user.id } },
        data: { cigarettes: totalValue }
      }
    });
  }
}