class User < ApplicationRecord
  validates :name, :user_name, :password, presence: true
  validates :user_name, uniqueness: true

  before_create :set_token

  def json
    { name:, user_name:, token: }
  end

  private

  def set_token
    self.token = SecureRandom.uuid
  end
end
