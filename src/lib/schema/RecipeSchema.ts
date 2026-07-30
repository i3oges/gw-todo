import z from 'zod';

export const RecipeIngredientSchema = z.object({
	item_id: z.number(),
	count: z.number()
});

export const RecipeSchema = z.object({
	id: z.number(),
	type: z.string(),
	output_item_id: z.number(),
	output_item_count: z.number(),
	min_rating: z.number(),
	time_to_craft_ms: z.number(),
	disciplines: z.array(z.string()),
	flags: z.array(z.string()),
	ingredients: z.array(RecipeIngredientSchema),
	chat_link: z.string()
});

export type Recipe = z.infer<typeof RecipeSchema>;
export type RecipeIngredient = z.infer<typeof RecipeIngredientSchema>;
