import { z } from 'zod';

const RaceSchema = z.object({
	id: z.string(),
	name: z.string(),
	waypoint: z.string()
});

const RacesSchema = z.array(RaceSchema);

const GRIFFON_RACES = [
	{
		id: 'crystal_oasis_griffon_race_expert',
		name: 'Crystal Oasis Griffon Race (Expert)',
		waypoint: '[&BEAKAAA=]'
	},
	{
		id: 'crystal_oasis_griffon_race_master',
		name: 'Crystal Oasis Griffon Race (Master)',
		waypoint: '[&BLsKAAA=]'
	},
	{
		id: 'desert_highlands_griffon_race_expert',
		name: 'Desert Highlands Griffon Race (Expert)',
		waypoint: '[&BJ0KAAA=]'
	},
	{
		id: 'desert_highlands_griffon_race_master',
		name: 'Desert Highlands Griffon Race (Master)',
		waypoint: '[&BKQKAAA=]'
	},
	{
		id: 'elon_riverlands_griffon_race_expert',
		name: 'Elon Riverlands Griffon Race (Expert)',
		waypoint: '[&BGcKAAA=]'
	},
	{
		id: 'elon_riverlands_griffon_race_master',
		name: 'Elon Riverlands Griffon Race (Master)',
		waypoint: '[&BCgKAAA=]'
	},
	{
		id: 'the_desolation_griffon_race_expert',
		name: 'The Desolation Griffon Race (Expert)',
		waypoint: '[&BMEKAAA=]'
	},
	{
		id: 'the_desolation_griffon_race_master',
		name: 'The Desolation Griffon Race (Master)',
		waypoint: '[&BKMKAAA=]'
	},
	{
		id: 'domain_of_vabbi_griffon_race_expert',
		name: 'Domain of Vabbi Griffon Race (Expert)',
		waypoint: '[&BHQKAAA=]'
	},
	{
		id: 'domain_of_vabbi_griffon_race_master',
		name: 'Domain of Vabbi Griffon Race (Master)',
		waypoint: '[&BHQKAAA=]'
	},
	{
		id: 'domain_of_istan_griffon_race_expert',
		name: 'Domain of Istán Griffon Race (Expert)',
		waypoint: '[&BBoLAAA=]'
	},
	{
		id: 'domain_of_istan_griffon_race_master',
		name: 'Domain of Istán Griffon Race (Master)',
		waypoint: '[&BPoKAAA=]'
	},
	{
		id: 'sandswept_isles_griffon_race_expert',
		name: 'Sandswept Isles Griffon Race (Expert)',
		waypoint: '[&BCULAAA=]'
	},
	{
		id: 'domain_of_kourna_griffon_race_expert',
		name: 'Domain of Kourna Griffon Race (Expert)',
		waypoint: '[&BFcLAAA=]'
	},
	{
		id: 'domain_of_kourna_griffon_race_master',
		name: 'Domain of Kourna Griffon Race (Master)',
		waypoint: '[&BFALAAA=]'
	},
	{
		id: 'jahai_bluffs_griffon_race_expert',
		name: 'Jahai Bluffs Griffon Race (Expert)',
		waypoint: '[&BH4LAAA=]'
	},
	{
		id: 'jahai_bluffs_griffon_race_master',
		name: 'Jahai Bluffs Griffon Race (Master)',
		waypoint: '[&BH4LAAA=]'
	}
];

export async function load() {
	try {
		const races = RacesSchema.parse(GRIFFON_RACES);
		return { races };
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.error('API Response structure changed:', { error });
		}
		return {
			status: 500,
			error: `Failed to load griffon races. ${error}`
		};
	}
}
