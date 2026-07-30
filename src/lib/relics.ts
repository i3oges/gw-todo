import relicsDataRaw from './relicsData.json';

export interface RelicBit {
	bitIndex: number;
	itemId: number;
	name: string;
	icon: string;
	chatLink: string;
	description: string;
	requirementText: string;
}

export interface RelicSet {
	id: number;
	name: string;
	expansion: string;
	defaultUnlocked: boolean;
	bitsCount: number;
	bits: RelicBit[];
}

export interface AccountAchievementProgress {
	id: number;
	current: number;
	max: number;
	done: boolean;
	bits?: number[];
}

export interface EvaluatedRelic extends RelicBit {
	setId: number;
	setName: string;
	expansion: string;
	defaultUnlocked: boolean;
	unlocked: boolean;
}

export const RELIC_SETS: RelicSet[] = relicsDataRaw as RelicSet[];

export function evaluateRelics(
	accountAchievements: AccountAchievementProgress[] | null
): EvaluatedRelic[] {
	const progressMap = new Map<number, AccountAchievementProgress>();
	if (accountAchievements) {
		for (const acc of accountAchievements) {
			progressMap.set(acc.id, acc);
		}
	}

	const result: EvaluatedRelic[] = [];

	for (const set of RELIC_SETS) {
		const userAcc = progressMap.get(set.id);
		const setDone = userAcc?.done ?? false;
		const unlockedBits = new Set<number>(userAcc?.bits ?? []);

		for (const bit of set.bits) {
			const isBitUnlocked = setDone || unlockedBits.has(bit.bitIndex);
			result.push({
				...bit,
				setId: set.id,
				setName: set.name,
				expansion: set.expansion,
				defaultUnlocked: set.defaultUnlocked,
				unlocked: isBitUnlocked
			});
		}
	}

	return result;
}
