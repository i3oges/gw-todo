import z from 'zod';

const PriceDetailSchema = z.object({
	unit_price: z.number().int().nonnegative(),
	quantity: z.number().int().nonnegative()
});

export const CommercePriceSchema = z.object({
	id: z.number().int(),
	whitelisted: z.boolean(),
	buys: PriceDetailSchema,
	sells: PriceDetailSchema
});

export type CommercePrice = z.infer<typeof CommercePriceSchema>;
