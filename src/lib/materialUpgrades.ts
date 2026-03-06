export interface MaterialUpgrade {
	id: string;
	name: string;
	fromId: number;
	fromCount: number;
	toId: number;
	toCount: number;
	dustId: number;
	dustCount: number;
	catalystId: number;
	catalystCount: number;
}

export interface MysticForgeRecipe {
	id: string;
	name: string;
	ingredient1: number;
	ingredient1Count: number;
	ingredient2: number;
	ingredient2Count: number;
	ingredient3?: number;
	ingredient3Count?: number;
	ingredient4?: number;
	ingredient4Count?: number;
	output: number;
	outputCount: number;
}

export interface MysticForgeRecipeList {
	name: string;
	recipes: MysticForgeRecipe[];
}

const CRYSTALLINE_DUST_ID = 24277;
const PHILOSOPHERS_STONE_ID = 20796;
const BOTTLE_OF_ELONIAN_WINE_ID = 19663;
const MYSTIC_CRYSTAL_ID = 20799;
const INCANDESCENT_DUST_ID = 24276;

const FINE_T5_TO_T6_CATALYST = {
	ingredient3: CRYSTALLINE_DUST_ID,
	ingredient3Count: 5,
	ingredient4: PHILOSOPHERS_STONE_ID,
	ingredient4Count: 5
};
const RARE_CATALYST = {
	ingredient3: BOTTLE_OF_ELONIAN_WINE_ID,
	ingredient3Count: 1,
	ingredient4: MYSTIC_CRYSTAL_ID,
	ingredient4Count: 1
};
const RARE_T5_TO_T6_CATALYST = {
	ingredient2: CRYSTALLINE_DUST_ID,
	ingredient2Count: 1,
	...RARE_CATALYST
};

const RARE_T4_TO_T5_CATALYST = {
	ingredient2: INCANDESCENT_DUST_ID,
	ingredient2Count: 1,
	...RARE_CATALYST
};

export const RARE_MATERIAL_UPGRADES_T4_TO_T5: MysticForgeRecipeList = {
	name: 'Rare Material Upgrades T4 -> T5',
	recipes: [
		{
			id: 'crystal-core',
			name: 'Crystal Core',
			ingredient1: 24328,
			ingredient1Count: 2,
			...RARE_T4_TO_T5_CATALYST,
			output: 24329,
			outputCount: 1
		},
		{
			id: 'destroyer-core',
			name: 'Destroyer Core',
			ingredient1: 24323,
			ingredient1Count: 2,
			...RARE_T4_TO_T5_CATALYST,
			output: 24324,
			outputCount: 1
		},
		{
			id: 'corrupted-core',
			name: 'Corrupted Core',
			ingredient1: 24338,
			ingredient1Count: 2,
			...RARE_T4_TO_T5_CATALYST,
			output: 24339,
			outputCount: 1
		},
		{
			id: 'charged-core',
			name: 'Charged Core',
			ingredient1: 24303,
			ingredient1Count: 2,
			...RARE_T4_TO_T5_CATALYST,
			output: 24304,
			outputCount: 1
		},
		{
			id: 'glacial-core',
			name: 'Glacial Core',
			ingredient1: 24318,
			ingredient1Count: 2,
			...RARE_T4_TO_T5_CATALYST,
			output: 24319,
			outputCount: 1
		},
		{
			id: 'molten-core',
			name: 'Molten Core',
			ingredient1: 24313,
			ingredient1Count: 2,
			...RARE_T4_TO_T5_CATALYST,
			output: 24314,
			outputCount: 1
		},
		{
			id: 'onyx-core',
			name: 'Onyx Core',
			ingredient1: 24308,
			ingredient1Count: 2,
			...RARE_T4_TO_T5_CATALYST,
			output: 24309,
			outputCount: 1
		},
		{
			id: 'pile-of-vile-essence',
			name: 'Pile of Vile Essence',
			ingredient1: 24333,
			ingredient1Count: 2,
			...RARE_T4_TO_T5_CATALYST,
			output: 24334,
			outputCount: 1
		}
	]
};

export const RARE_MATERIAL_UPGRADES_T5_TO_T6: MysticForgeRecipeList = {
	name: 'Rare Material Upgrades T5 -> T6',
	recipes: [
		{
			id: 'crystal-lodestone',
			name: 'Crystal Lodestone',
			ingredient1: 24329, //core (T5)
			ingredient1Count: 2,
			...RARE_T5_TO_T6_CATALYST,
			output: 24330, // lodestone (T6)
			outputCount: 1
		},
		{
			id: 'destroyer-lodestone',
			name: 'Destroyer Lodestone',
			ingredient1: 24324, //core (T5)
			ingredient1Count: 2,
			...RARE_T5_TO_T6_CATALYST,
			output: 24325, // lodestone (T6)
			outputCount: 1
		},
		{
			id: 'corrupted-lodestone',
			name: 'Corrupted Lodestone',
			ingredient1: 24339, //core (T5)
			ingredient1Count: 2,
			...RARE_T5_TO_T6_CATALYST,
			output: 24340, // lodestone (T6)
			outputCount: 1
		},
		{
			id: 'charged-lodestone',
			name: 'Charged Lodestone',
			ingredient1: 24304, //core (T5)
			ingredient1Count: 2,
			...RARE_T5_TO_T6_CATALYST,
			output: 24305, // lodestone (T6)
			outputCount: 1
		},
		{
			id: 'glacial-lodestone',
			name: 'Glacial Lodestone',
			ingredient1: 24319, //core (T5)
			ingredient1Count: 2,
			...RARE_T5_TO_T6_CATALYST,
			output: 24320, // lodestone (T6)
			outputCount: 1
		},
		{
			id: 'molten-lodestone',
			name: 'Molten Lodestone',
			ingredient1: 24314, //core (T5)
			ingredient1Count: 2,
			...RARE_T5_TO_T6_CATALYST,
			output: 24315, // lodestone (T6)
			outputCount: 1
		},
		{
			id: 'onyx-lodestone',
			name: 'Onyx Lodestone',
			ingredient1: 24309, //core (T5)
			ingredient1Count: 2,
			...RARE_T5_TO_T6_CATALYST,
			output: 24310, // lodestone (T6)
			outputCount: 1
		},
		{
			id: 'pile-of-putrid-essence',
			name: 'Pile of Putrid Essence',
			ingredient1: 24334, //core (T5)
			ingredient1Count: 2,
			...RARE_T5_TO_T6_CATALYST,
			output: 24335, // lodestone (T6)
			outputCount: 1
		}
	]
};

export const FINE_MATERIAL_UPGRADES_T5_TO_T6: MysticForgeRecipeList = {
	name: 'Fine Material Upgrades T5 - T6',
	recipes: [
		// T5 -> T6 Examples
		{
			id: 'powerful-blood',
			name: 'Vial of Powerful Blood',
			ingredient1: 24294, // Large Blood
			ingredient1Count: 50,
			ingredient2: 24295,
			ingredient2Count: 1,
			...FINE_T5_TO_T6_CATALYST,
			output: 24295, // Powerful Blood
			outputCount: 7 // Average 7
		},
		{
			id: 'powerful-venom',
			name: 'Powerful Venom Sac',
			ingredient1: 24282, // Potent Venom
			ingredient1Count: 50,
			ingredient2: 24283, // Powerful Venom
			ingredient2Count: 1,
			...FINE_T5_TO_T6_CATALYST,
			output: 24283, // Powerful Venom
			outputCount: 7
		},
		{
			id: 'elaborate-totem',
			name: 'Elaborate Totem',
			ingredient1: 24299, // Intricate Totem
			ingredient1Count: 50,
			ingredient2: 24300, // Elaborate Totem
			ingredient2Count: 1,
			...FINE_T5_TO_T6_CATALYST,
			output: 24300,
			outputCount: 7
		},
		{
			id: 'ancient-bone',
			name: 'Ancient Bone',
			ingredient1: 24341, // Large Bone
			ingredient1Count: 50,
			ingredient2: 24358, // Ancient Bone
			ingredient2Count: 1,
			...FINE_T5_TO_T6_CATALYST,
			output: 24358,
			outputCount: 7
		},
		{
			id: 'vicious-fang',
			name: 'Vicious Fang',
			ingredient1: 24350, // Large Claw
			ingredient1Count: 50,
			ingredient2: 24351, // Vicious Claw
			ingredient2Count: 1,
			...FINE_T5_TO_T6_CATALYST,
			output: 24351,
			outputCount: 7
		},
		{
			id: 'vicious-claw',
			name: 'Vicious Claw',
			ingredient1: 24356, // Large Fang
			ingredient1Count: 50,
			ingredient2: 24357, // Vicious Fang
			ingredient2Count: 1,
			...FINE_T5_TO_T6_CATALYST,
			output: 24357,
			outputCount: 7
		},

		{
			id: 'armored-scale',
			name: 'Armored Scale',
			ingredient1: 24288, // Large Scale
			ingredient1Count: 50,
			ingredient2: 24289, // Armored Scale
			ingredient2Count: 1,
			...FINE_T5_TO_T6_CATALYST,
			output: 24289,
			outputCount: 7
		}
	]
};

export const RARE_MATERIAL_UPGRADES: MaterialUpgrade[] = [
	{
		id: 'crystalline-dust',
		name: 'Pile of Crystalline Dust',
		fromId: 24276, // Incandescent Dust
		fromCount: 250,
		toId: CRYSTALLINE_DUST_ID, // Crystalline Dust
		toCount: 20, // Average 20
		dustId: 24277, // Crystalline Dust itself (it uses T6 dust to upgrade T5 to T6)
		dustCount: 1,
		catalystId: 24276, // Incandescent Dust
		catalystCount: 1
	}
];

export const ORB_REFINEMENT: MysticForgeRecipeList = {
	name: 'Orb Refinement',
	recipes: [
		{
			id: 'coral-orb',
			name: 'Coral Orb',
			ingredient1: 24509,
			ingredient1Count: 2,
			ingredient2: INCANDESCENT_DUST_ID,
			ingredient2Count: 5,
			output: 24510,
			outputCount: 1
		},
		{
			id: 'beryl-orb',
			name: 'Beryl Orb',
			ingredient1: 24519,
			ingredient1Count: 2,
			ingredient2: INCANDESCENT_DUST_ID,
			ingredient2Count: 5,
			output: 24520,
			outputCount: 1
		},
		{
			id: 'chrysocola-orb',
			name: 'Chrysocola Orb',
			ingredient1: 24511,
			ingredient1Count: 2,
			ingredient2: INCANDESCENT_DUST_ID,
			ingredient2Count: 5,
			output: 24512,
			outputCount: 1
		},
		{
			id: 'emerald-orb',
			name: 'Emerald Orb',
			ingredient1: 24473,
			ingredient1Count: 2,
			ingredient2: INCANDESCENT_DUST_ID,
			ingredient2Count: 5,
			output: 24515,
			outputCount: 1
		},
		{
			id: 'opal-orb',
			name: 'Opal Orb',
			ingredient1: 24521,
			ingredient1Count: 2,
			ingredient2: INCANDESCENT_DUST_ID,
			ingredient2Count: 5,
			output: 24522,
			outputCount: 1
		},
		{
			id: 'ruby-orb',
			name: 'Ruby Orb',
			ingredient1: 24474,
			ingredient1Count: 2,
			ingredient2: INCANDESCENT_DUST_ID,
			ingredient2Count: 5,
			output: 24508,
			outputCount: 1
		},
		{
			id: 'sapphire-orb',
			name: 'Sapphire Orb',
			ingredient1: 24475,
			ingredient1Count: 2,
			ingredient2: INCANDESCENT_DUST_ID,
			ingredient2Count: 5,
			output: 24516,
			outputCount: 1
		}
	]
};
