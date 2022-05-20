class Board < ApplicationRecord    
    validates :created_by_id, presence: true
    validates :player_1_id, presence: true
    
    before_create :set_token

    enum status: {Waiting_Players: 0, Player_1_Turn: 1, Player_2_Turn: 2, Player_1_Win: 3, Player_2_Win: 4, Draw: 5}

    private

    def set_token
        self.token = SecureRandom.base58
    end

end
