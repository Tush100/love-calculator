// Fallback name database for names not in our main database
const fallbackNames: Record<string, any> = {
  Alex: {
    name: "Alex",
    gender: "unisex",
    origin: "Greek",
    meaning: "Defender of the people",
    popularity: 85,
  },
  Sam: {
    name: "Sam",
    gender: "unisex",
    origin: "Hebrew",
    meaning: "Heard by God",
    popularity: 75,
  },
  Jordan: {
    name: "Jordan",
    gender: "unisex",
    origin: "Hebrew",
    meaning: "To flow down",
    popularity: 70,
  },
  Taylor: {
    name: "Taylor",
    gender: "unisex",
    origin: "English",
    meaning: "Tailor",
    popularity: 65,
  },
  Casey: {
    name: "Casey",
    gender: "unisex",
    origin: "Irish",
    meaning: "Brave in battle",
    popularity: 60,
  },
  Morgan: {
    name: "Morgan",
    gender: "unisex",
    origin: "Welsh",
    meaning: "Sea-born",
    popularity: 68,
  },
  Jamie: {
    name: "Jamie",
    gender: "unisex",
    origin: "Hebrew",
    meaning: "Supplanter",
    popularity: 72,
  },
  Riley: {
    name: "Riley",
    gender: "unisex",
    origin: "Irish",
    meaning: "Valiant",
    popularity: 78,
  },
  Avery: {
    name: "Avery",
    gender: "unisex",
    origin: "English",
    meaning: "Ruler of the elves",
    popularity: 82,
  },
  Quinn: {
    name: "Quinn",
    gender: "unisex",
    origin: "Irish",
    meaning: "Counsel",
    popularity: 74,
  },
  Sage: {
    name: "Sage",
    gender: "unisex",
    origin: "Latin",
    meaning: "Wise",
    popularity: 69,
  },
  River: {
    name: "River",
    gender: "unisex",
    origin: "English",
    meaning: "Flowing body of water",
    popularity: 71,
  },
  Phoenix: {
    name: "Phoenix",
    gender: "unisex",
    origin: "Greek",
    meaning: "Rising bird",
    popularity: 66,
  },
  Rowan: {
    name: "Rowan",
    gender: "unisex",
    origin: "Irish",
    meaning: "Red-haired",
    popularity: 73,
  },
  Wren: {
    name: "Wren",
    gender: "un",
    origin: "English",
    meaning: "Small bird",
    popularity: 67,
  },
  Indigo: {
    name: "Indigo",
    gender: "unisex",
    origin: "Greek",
    meaning: "Deep blue dye",
    popularity: 63,
  },
  Marlowe: {
    name: "Marlowe",
    gender: "unisex",
    origin: "English",
    meaning: "Driftwood",
    popularity: 61,
  },
  Remi: {
    name: "Remi",
    gender: "unisex",
    origin: "French",
    meaning: "Oarsman",
    popularity: 77,
  },
  Zion: {
    name: "Zion",
    gender: "unisex",
    origin: "Hebrew",
    meaning: "Highest point",
    popularity: 79,
  },
  Briar: {
    name: "Briar",
    gender: "unisex",
    origin: "English",
    meaning: "Thorny shrub",
    popularity: 64,
  },
  Onyx: {
    name: "Onyx",
    gender: "unisex",
    origin: "Greek",
    meaning: "Black gemstone",
    popularity: 62,
  },
  Vale: {
    name: "Vale",
    gender: "unisex",
    origin: "Latin",
    meaning: "Valley",
    popularity: 59,
  },
  Sky: {
    name: "Sky",
    gender: "unisex",
    origin: "English",
    meaning: "Atmosphere",
    popularity: 76,
  },
  Rain: {
    name: "Rain",
    gender: "unisex",
    origin: "English",
    meaning: "Precipitation",
    popularity: 58,
  },
  Breeze: {
    name: "Breeze",
    gender: "unisex",
    origin: "English",
    meaning: "Gentle wind",
    popularity: 57,
  },
  Ember: {
    name: "Ember",
    gender: "unisex",
    origin: "English",
    meaning: "Burning coal",
    popularity: 75,
  },
  Ash: {
    name: "Ash",
    gender: "unisex",
    origin: "English",
    meaning: "Tree",
    popularity: 72,
  },
  Blake: {
    name: "Blake",
    gender: "unisex",
    origin: "English",
    meaning: "Dark or fair",
    popularity: 81,
  },
  Cameron: {
    name: "Cameron",
    gender: "unisex",
    origin: "Scottish",
    meaning: "Crooked nose",
    popularity: 83,
  },
  Angel: {
    name: "Angel",
    gender: "unisex",
    origin: "Greek",
    meaning: "Messenger",
    popularity: 80,
  },
  Kai: {
    name: "Kai",
    gender: "unisex",
    origin: "Hawaiian",
    meaning: "Ocean",
    popularity: 84,
  },
  Skylar: {
    name: "Skylar",
    gender: "unisex",
    origin: "Dutch",
    meaning: "Scholar",
    popularity: 86,
  },
  Ocean: {
    name: "Ocean",
    gender: "unisex",
    origin: "Greek",
    meaning: "Sea",
    popularity: 65,
  },
  Storm: {
    name: "Storm",
    gender: "unisex",
    origin: "English",
    meaning: "Tempest",
    popularity: 63,
  },
  Dakota: {
    name: "Dakota",
    gender: "unisex",
    origin: "Native American",
    meaning: "Friend, ally",
    popularity: 70,
  },
  Emerson: {
    name: "Emerson",
    gender: "unisex",
    origin: "English",
    meaning: "Son of Emery",
    popularity: 75,
  },
  Finley: {
    name: "Finley",
    gender: "unisex",
    origin: "Scottish",
    meaning: "Fair warrior",
    popularity: 78,
  },
  Hayden: {
    name: "Hayden",
    gender: "unisex",
    origin: "English",
    meaning: "Hay valley",
    popularity: 82,
  },
  Justice: {
    name: "Justice",
    gender: "unisex",
    origin: "Latin",
    meaning: "Just, fair",
    popularity: 68,
  },
  Kendall: {
    name: "Kendall",
    gender: "unisex",
    origin: "English",
    meaning: "Valley of the Kent River",
    popularity: 73,
  },
  London: {
    name: "London",
    gender: "unisex",
    origin: "English",
    meaning: "From the great river",
    popularity: 71,
  },
  Micah: {
    name: "Micah",
    gender: "unisex",
    origin: "Hebrew",
    meaning: "Who is like God",
    popularity: 77,
  },
  Nico: {
    name: "Nico",
    gender: "unisex",
    origin: "Greek",
    meaning: "Victory of the people",
    popularity: 69,
  },
  Parker: {
    name: "Parker",
    gender: "unisex",
    origin: "English",
    meaning: "Park keeper",
    popularity: 80,
  },
  Reese: {
    name: "Reese",
    gender: "unisex",
    origin: "Welsh",
    meaning: "Ardor",
    popularity: 74,
  },
  Shiloh: {
    name: "Shiloh",
    gender: "unisex",
    origin: "Hebrew",
    meaning: "Peace",
    popularity: 67,
  },
  Tatum: {
    name: "Tatum",
    gender: "unisex",
    origin: "English",
    meaning: "Tate's homestead",
    popularity: 72,
  },
  Vaughn: {
    name: "Vaughn",
    gender: "unisex",
    origin: "Welsh",
    meaning: "Small",
    popularity: 64,
  },
  Winter: {
    name: "Winter",
    gender: "unisex",
    origin: "English",
    meaning: "Cold season",
    popularity: 66,
  },
  Yael: {
    name: "Yael",
    gender: "unisex",
    origin: "Hebrew",
    meaning: "To ascend",
    popularity: 61,
  },
  Zen: {
    name: "Zen",
    gender: "unisex",
    origin: "Japanese",
    meaning: "Meditation",
    popularity: 59,
  },
  Ari: {
    name: "Ari",
    gender: "unisex",
    origin: "Hebrew",
    meaning: "Lion",
    popularity: 76,
  },
  Blair: {
    name: "Blair",
    gender: "unisex",
    origin: "Scottish",
    meaning: "Plain, field",
    popularity: 70,
  },
  Charlie: {
    name: "Charlie",
    gender: "unisex",
    origin: "Germanic",
    meaning: "Free man",
    popularity: 85,
  },
  Drew: {
    name: "Drew",
    gender: "unisex",
    origin: "Greek",
    meaning: "Manly, courageous",
    popularity: 79,
  },
  Ellis: {
    name: "Ellis",
    gender: "unisex",
    origin: "Welsh",
    meaning: "Benevolent",
    popularity: 73,
  },
  Frankie: {
    name: "Frankie",
    gender: "unisex",
    origin: "Latin",
    meaning: "Free one",
    popularity: 68,
  },
  Gray: {
    name: "Gray",
    gender: "unisex",
    origin: "English",
    meaning: "Gray-haired",
    popularity: 65,
  },
  Harley: {
    name: "Harley",
    gender: "unisex",
    origin: "English",
    meaning: "Hare's meadow",
    popularity: 77,
  },
  Ira: {
    name: "Ira",
    gender: "unisex",
    origin: "Hebrew",
    meaning: "Watchful",
    popularity: 62,
  },
  Jesse: {
    name: "Jesse",
    gender: "unisex",
    origin: "Hebrew",
    meaning: "Gift",
    popularity: 75,
  },
  Kelly: {
    name: "Kelly",
    gender: "unisex",
    origin: "Irish",
    meaning: "Warrior",
    popularity: 71,
  },
  Lee: {
    name: "Lee",
    gender: "unisex",
    origin: "English",
    meaning: "Meadow",
    popularity: 69,
  },
  Marley: {
    name: "Marley",
    gender: "unisex",
    origin: "English",
    meaning: "Pleasant seaside meadow",
    popularity: 74,
  },
  Noel: {
    name: "Noel",
    gender: "unisex",
    origin: "French",
    meaning: "Christmas",
    popularity: 67,
  },
  Oakley: {
    name: "Oakley",
    gender: "unisex",
    origin: "English",
    meaning: "Oak meadow",
    popularity: 72,
  },
  Peyton: {
    name: "Peyton",
    gender: "unisex",
    origin: "English",
    meaning: "Fighting man's estate",
    popularity: 80,
  },
  Robin: {
    name: "Robin",
    gender: "unisex",
    origin: "English",
    meaning: "Bright fame",
    popularity: 66,
  },
  Shay: {
    name: "Shay",
    gender: "unisex",
    origin: "Irish",
    meaning: "Hawk-like",
    popularity: 63,
  },
  Tanner: {
    name: "Tanner",
    gender: "unisex",
    origin: "English",
    meaning: "Leather worker",
    popularity: 70,
  },
  Uri: {
    name: "Uri",
    gender: "unisex",
    origin: "Hebrew",
    meaning: "My light",
    popularity: 58,
  },
  Val: {
    name: "Val",
    gender: "unisex",
    origin: "Latin",
    meaning: "Strong, healthy",
    popularity: 60,
  },
  West: {
    name: "West",
    gender: "unisex",
    origin: "English",
    meaning: "Western direction",
    popularity: 68,
  },
  Xen: {
    name: "Xen",
    gender: "unisex",
    origin: "Greek",
    meaning: "Hospitable",
    popularity: 55,
  },
  Yuri: {
    name: "Yuri",
    gender: "unisex",
    origin: "Russian",
    meaning: "Farmer",
    popularity: 64,
  },
  Zephyr: {
    name: "Zephyr",
    gender: "unisex",
    origin: "Greek",
    meaning: "West wind",
    popularity: 59,
  },
}

// Simulate API call with a delay
export async function getNameInfo(name: string) {
  // Normalize name for lookup
  const normalizedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Check if name exists in fallback database
  if (fallbackNames[normalizedName]) {
    return fallbackNames[normalizedName]
  }

  // Generate a fallback response for names not in our database
  return {
    name: normalizedName,
    gender: determineGender(normalizedName),
    origin: "Unknown",
    meaning: `The name ${normalizedName} has origins that are not in our current database.`,
    popularity: Math.floor(Math.random() * 50) + 30, // Random popularity between 30-80
  }
}

// Simple gender determination based on common name endings
function determineGender(name: string): string {
  const femaleEndings = ["a", "ia", "na", "ina", "ita", "elle", "ette", "lyn", "y"]
  const maleEndings = ["o", "n", "r", "s", "t", "k", "m"]

  const lastChar = name.charAt(name.length - 1).toLowerCase()
  const lastTwoChars = name.slice(-2).toLowerCase()

  if (femaleEndings.some((ending) => name.toLowerCase().endsWith(ending))) {
    return "female"
  } else if (maleEndings.includes(lastChar)) {
    return "male"
  } else {
    return "unisex"
  }
}
