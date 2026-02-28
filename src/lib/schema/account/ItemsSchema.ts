import z from 'zod';

export const ItemSchema = z
	.object({
		id: z.number().int(),
		name: z.string(),
		description: z.string().optional(),
		type: z.enum([
			'Armor',
			'Back',
			'Bag',
			'Consumable',
			'Container',
			'CraftingMaterial',
			'Gathering',
			'Gizmo',
			'Key',
			'MiniPet',
			'PowerCore',
			'Relic',
			'Tool',
			'Trait',
			'Trinket',
			'Trophy',
			'UpgradeComponent',
			'Weapon'
		]),
		rarity: z.enum([
			'Junk',
			'Basic',
			'Fine',
			'Masterwork',
			'Rare',
			'Exotic',
			'Ascended',
			'Legendary'
		]),
		level: z.number().int(),
		vendor_value: z.number().int(),
		default_skin: z.number().int().optional(),
		flags: z.array(z.string()),
		game_types: z.array(z.string()),
		restrictions: z.array(z.string()),
		icon: z.string().url().optional(),
		chat_link: z.string(),
		// Details is an object that varies wildly;
		// we use a record or an optional object for flexibility.
		details: z.record(z.any(), z.any()).optional()
	})
	.loose();

export type GW2Item = z.infer<typeof ItemSchema>;
