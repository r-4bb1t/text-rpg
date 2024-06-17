import { ENVIRONMENTS } from "@/app/types/environments";
import { MAP_TYPE } from "@/app/types/mapType";

export const mapPrompt = (user: string, maxLevel: number) => `
Create a map that an adventurer can explore on a medieval adventure.
Set the map's background to ${
  MAP_TYPE[Math.floor(Math.random() * MAP_TYPE.length)]
}. Write the map's name and description.
If it's a village or shop without monsters, set monster to null. If there are no monsters, NPCs will be living peacefully.
In a village with monsters, NPCs are suffering from the monsters. They will be grateful if you defeat the monsters and might help you do so.
The adventurer's name is ${user}.

example:
{
  "key": "snow_mountain",
  "name": "Snowy Mimosa Mountain",
  "description": "A mountain covered in snow. It feels cold.",
  "longDescription": "A mountain covered in snow. Various vegetables grow at the base. Trees and animals also live there. At the summit, there is a cave filled with snow. The path to the cave is steep and slippery due to the heavy snow.",
  "startLogs": [
    "${user} has arrived at the snow-covered mountain.",
    "It feels like your feet might slip."
  ],
  "monster": {
    "name": "Yeti",
    "description": "A yeti living on the snow-covered mountain. It eats snow. Weak to physical attacks and fire magic. Resistant to water magic. Attacks by spitting snowballs.",
    "personality": "Ferocious",
    "level": ${maxLevel},
    "gold": 50,
    "location": "Mountain summit"
  },
  "npc": [
    {
      "key": "merchant_jade",
      "name": "Merchant Jade",
      "description": "A merchant selling goods.",
      "personality": "Kind",
      "location": "Jade's shop at the mountain base"
    },
    {
      "key": "lulu",
      "name": "Lulu",
      "description": "A girl living on the mountain. She lost her family to the yeti.",
      "personality": "Cold",
      "location": "Village at the mountain base"
    },
    {
      "key": "mountain_oldman",
      "name": "Shuhime",
      "description": "An old man wandering around the mountain.",
      "personality": "Likes jokes and is hard to understand",
      "location": "Mid-mountain"
    }
  ],
  "environments": [
    { "key": "snow", "name": "Snow", "icon": "Snowflake" },
    { "key": "mountain", "name": "Mountain", "icon": "Mountain" }
  ],
  "userLocation": "Entrance of the village at the mountain base"
}

response type: ONLY JSON (DO NOT INCLUDE ANYTHING ELSE), THE STRING MUST BE KOREAN
{
  "key": string; // The map's key in English.
  "name": string; // The map's name. Include unique names. e.g. Henry's Castle Full of Gold
  "description": string; // A brief description of the map.
  "longDescription": string; // A detailed description of the map. Describe the terrain and background in detail.
  "startLogs": string[]; // Logs that appear when entering the map. Describe the surroundings in detail.

  "monster": {
    "name": string; // The monster's name.
    "description": string; // A brief description of the monster.
    "longDescription": string; // A detailed description of the monster. Include weaknesses and detailed descriptions.
    "personality": string; // The monster's personality.

    "level": number; // ${Math.max(1, maxLevel - 3)}~${maxLevel} (max ${maxLevel})

    "gold": number; // The amount of gold the monster drops.
    "location": string; // The location where the monster appears. Describe the location within the map.
  } | null; // If there are no monsters, set to null.

  "npc": {
    "key": string; // The NPC's key in English.
    "name": string; // The NPC's name.
    "description": string; // A brief description of the NPC.
    "personality": string; // The NPC's personality.
    "location": string; // The location where the NPC appears. Describe the location within the map.
  }[]; // The NPCs that appear on the map. If none, put an empty array. (up to 3)

  "environments": { 
    "key": string; // The environment's key in English.
    "name": string; // The environment's name.
    "icon": ${ENVIRONMENTS.map((e) => `"${e}"`).join(" | ")} // The environment's icon.
  }[];

  "startLogs": string[]; // not ~습니다, but ~다
  "userLocation": string; // The adventurer's starting location on the map.
}
`;
