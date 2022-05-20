class BoardDTO
    attr_reader :player_1_name, :player_2_name, :board, :status, :token
  
    def initialize(ob = {})
      @player_1_name = User.find_by(id: ob["player_1_id"]).name
      @player_2_name = ob["player_2_id"] == nil ? "" : User.find_by(id: ob["player_2_id"]).name

      @board = JSON.parse ob["board"]
      @status = ob["status"]
      @token = ob["token"]
    end
end