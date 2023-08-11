enum EntryType {
  PLAYED = 1,
  WISHLIST = 2,
  ABANDONED = 3
}

type ListEntry = {
  entryId: number;
  gameId: number;
  entryType: number;
  date: Date;
}

type GameList = {
  userId: number;
  entries: ListEntry[];
}


const lists : GameList[] = [
  {
    userId: 1,
    entries: [
      {
        entryId: 1,
        gameId: 1,
        entryType: EntryType.PLAYED,
        date: new Date("2021-01-01")
      },
      {
        entryId: 2,
        gameId: 2,
        entryType: EntryType.PLAYED,
        date: new Date("2021-01-02")
      }
    ]
  },
  {
    userId: 2,
    entries: [
      {
        entryId: 1,
        gameId: 3,
        entryType: EntryType.WISHLIST,
        date: new Date("2021-01-01")
      },
      {
        entryId: 2,
        gameId: 2,
        entryType: EntryType.ABANDONED,
        date: new Date("2023-02-02")
      }
    ]
  },
  {
    userId: 3,
    entries: [
      {
        entryId: 1,
        gameId: 7,
        entryType: EntryType.ABANDONED,
        date: new Date("2022-05-05")
      },
      {
        entryId: 2,
        gameId: 8,
        entryType: EntryType.PLAYED,
        date: new Date("2021-01-02")
      }
    ]
  },
  {
    userId: 4,
    entries: [
      {
        entryId : 1,
        gameId: 6,
        entryType: EntryType.WISHLIST,
        date: new Date("2021-01-01")
      },
      {
        entryId: 2,
        gameId: 7,
        entryType: EntryType.PLAYED,
        date: new Date("2021-01-02")
      }
    ]
  },
  {
    userId: 5,
    entries: [
      {
        entryId : 1,
        gameId: 4,
        entryType: EntryType.PLAYED,
        date: new Date("2021-01-01")
      },
      {
        entryId: 2,
        gameId: 2,
        entryType: EntryType.PLAYED,
        date: new Date("2021-01-02")
      }
    ]
  }
  
];

export {lists, ListEntry, EntryType};
