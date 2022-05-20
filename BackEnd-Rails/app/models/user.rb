class User < ApplicationRecord
    validates :name, :userName, :password, presence: true
    validates :userName, uniqueness: true
    
    before_create :set_token

    private

    def set_token
        self.token = SecureRandom.uuid
    end
end
