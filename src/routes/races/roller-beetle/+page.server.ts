import { z } from 'zod';

const RaceSchema = z.object({
	id: z.string(),
	name: z.string(),
	waypoint: z.string()
});

const RacesSchema = z.array(RaceSchema);

const ROLLER_BEETLE_RACES = [
	{
		id: 'roller_beetle_jormags_fang',
		name: "Jormag's Fang (Snowden Drifts)",
		waypoint: '[&BLsAAAA=]'
	},
	{
		id: 'roller_beetle_ghostfire_run',
		name: 'Ghostfire Run (Diessa Plateau)',
		waypoint: '[&BN0AAAA=]'
	},
	{
		id: 'roller_beetle_lakeside_loop',
		name: 'Lakeside Loop (Gendarran Fields)',
		waypoint: '[&BOQAAAA=]'
	},
	{
		id: 'roller_beetle_infernal_leap',
		name: 'Infernal Leap (Mount Maelstrom)',
		waypoint: '[&BM8CAAA=]'
	},
	{
		id: 'roller_beetle_tropic_valley_raceway',
		name: 'Tropic Valley Raceway (Brisban Wildlands)',
		waypoint: '[&BGMAAAA=]'
	},
	{
		id: 'roller_beetle_shoreside_sprint',
		name: 'Shoreside Sprint (Southsun Cove)',
		waypoint: '[&BNUGAAA=]'
	},
	{
		id: 'roller_beetle_kessex_corner',
		name: 'Kessex Corner (Kessex Hills)',
		waypoint: '[&BBMAAAA=]'
	},
	{
		id: 'roller_beetle_training_kourna',
		name: 'Roller Beetle Training (Domain of Kourna)',
		waypoint: '[&BFcLAAA=]'
	},
	{
		id: 'roller_beetle_grothmar_grand_tour',
		name: 'Grothmar Grand Tour (Grothmar Valley)',
		waypoint: '[&BA4MAAA=]'
	}
];

export async function load() {
	try {
		const races = RacesSchema.parse(ROLLER_BEETLE_RACES);
		return { races };
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.error('API Response structure changed:', { error });
		}
		return {
			status: 500,
			error: `Failed to load roller beetle races. ${error}`
		};
	}
}
