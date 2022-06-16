interface StatusEnum {
  name: string;
  number: number;
}

export const BoardStatus: Record<string, StatusEnum> = {
  waiting_players: {
    name: "waiting_players",
    number: 0,
  },
  player_1_turn: { name: "player_1_turn", number: 1 },
  player_2_turn: { name: "player_2_turn", number: 2 },
  player_1_win: { name: "player_1_win", number: 3 },
  player_2_win: { name: "player_2_win", number: 4 },
  draw: { name: "draw", number: 5 },
};
