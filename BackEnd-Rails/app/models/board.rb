class Board < ApplicationRecord
  validates :player_1_id, presence: true

  belongs_to :player_1, class_name: 'User'
  belongs_to :player_2, class_name: 'User', optional: true

  before_create :set_token

  enum status: { waiting_players: 0, player_1_turn: 1, player_2_turn: 2, player_1_win: 3, player_2_win: 4, draw: 5 }

  def json
    { player_1_name: player_1.name, player_2_name: player_2 ? player_2.name : '',
      status:, board: JSON.parse(board), token: }
  end

  def finished?
    player_1_win? || player_2_win? || draw?
  end

  def is_board_full?
    player_1.present? && player_2.present?
  end

  def is_player_in_board? user
    player_1 == user || player_2 == user
  end

  def is_player_turn? user
    player_1_turn? && player_1 == user || player_2_turn? && player_2 == user 
  end

  def is_position_empty? position
    board_array = JSON.parse board
    board_array[position] == 0
  end

  def set_second_player user
    self.player_2 = user
    self.status = :player_1_turn
  end

  def make_move position, user
    is_player_1 = player_1 == user

    @board_array = JSON.parse board
    @board_array[position] = is_player_1 ? 'X' : 'O'
    self.board = @board_array.to_s

    self.status = if check_win?
                    is_player_1 ? :player_1_win : :player_2_win
                  elsif check_draw?
                    :draw
                  else
                    is_player_1 ? :player_2_turn : :player_1_turn
                  end
  end

  private

  def set_token
    self.token = SecureRandom.base58
  end

  def check_draw?
    @board_array.all? { |x| x != 0 }
  end

  def check_win?
    board = @board_array
    win = false

    [0, 3, 6].each do |i|
      if !win && board[i] != 0 && board[i] == board[i + 1] && board[i + 1] == board[i + 2]
        win = true 
      end
    end

    3.times do |i|
      if !win && board[i] != 0 && board[i] == board[i + 3] && board[i + 3] == board[i + 6]
        win = true 
      end
    end

    if !win && board[4] != 0
      if board[0] == board[4] && board[4] == board[8]
        win = true
      end
      if board[2] == board[4] && board[4] == board[6]
        win = true 
      end
    end

    return win
  end
end
