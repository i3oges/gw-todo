import z from 'zod';

export const AccountAchievementsSchema = z.object({
	id: z.number(),
	bits: z.optional(z.array(z.number())),
	current: z.number(),
	max: z.number(),
	done: z.boolean()
});

export type AccountAchievements = z.infer<typeof AccountAchievementsSchema>;
