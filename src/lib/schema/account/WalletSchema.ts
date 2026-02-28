import { z } from 'zod';

// Schema for a single currency entry
export const CurrencyEntrySchema = z.object({
	id: z.number().int().positive(),
	value: z.number().int().nonnegative()
});

// The wallet is simply a list of these entries
export const WalletSchema = z.array(CurrencyEntrySchema);

export type Wallet = z.infer<typeof WalletSchema>;
