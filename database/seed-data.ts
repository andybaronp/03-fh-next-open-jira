interface SeedData {
  entries: SeedEntry[]
}

interface SeedEntry {
  description: string
  status: string
  createdAt: number
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'PENDIN lorem lorem lorme lalsalsla',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description: 'PROGRESSS 111111lorem lorem lorme lalsalsla',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      description: 'FINISH:lorem lorem lorme lalsalsla',
      status: 'finished',
      createdAt: Date.now() - 100000,
    },
  ],
}
