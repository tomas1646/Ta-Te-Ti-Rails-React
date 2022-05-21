class Board < ApplicationRecord
  validates :player_1_id, presence: true

  belongs_to :player_1, class_name: 'User'
  belongs_to :player_2, class_name: 'User', optional: true

  before_create :set_token

  enum status: { Waiting_Players: 0, Player_1_Turn: 1, Player_2_Turn: 2, Player_1_Win: 3, Player_2_Win: 4, Draw: 5 }

  def json
    { player_1_name: player_1.name, player_2_name: player_2 ? player_2.name : '',
      status:, board: JSON.parse(board), token: }
  end

  private

  def set_token
    self.token = SecureRandom.base58
  end
end
