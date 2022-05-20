class BoardsController < ApplicationController
    before_action :set_board, only: [:show, :join, :move]
    before_action :set_user, only: [:create, :join, :find_user_boards, :move]

    def index
        boards = Board.all
        render_success_response(boards.preload(:player_1, :player_2).map{|board| board.json})
    end

    def show
        render_success_response(@board.json)
    end

    def create
        board = Board.new(created_by: @user, player_1: @user)
        if board.save
            render_success_response(@board.json, "Board Created")
        else
            render_error_response({}, "Error creating Board " + board.errors.full_messages.join(", "))
        end
    end


    def find_open_boards
        boards = Board.Waiting_Players
        render_success_response(boards.preload(:player_1, :player_2).map{|board| board.json})
    end

    
    def find_user_boards
        boards = Board.where(player_1: @user).or(Board.where(player_2: @user))
        render_success_response(boards.preload(:player_1, :player_2).map{|board| board.json})
    end

    def join
        if @board.player_1 == @user || @board.player_2 == @user
            return render_success_response(@board.json, "Joined to the board")
        end

        if @board.player_1.present? && @board.player_2.present?
            return render_error_response({}, "Board is full")
        end

        @board.player_2 = @user
        @board.status = :Player_1_Turn

        if  @board.save
            render_success_response(@board.json, "Joined to the board")
        else
            render_error_response({}, "Error Joining Board " + board.errors.full_messages.join(", "))
        end

    end

    def move
        if @board.Waiting_Players?
            return render_error_response({}, "Waiting For Players to Join")
        end

        if @board.Player_1_Win? || @board.Player_2_Win? || @board.Draw?
            return render_error_response({}, "Game Finished")
        end

        if @board.player_1 != @user && @board.player_2 != @user
            return render_error_response({}, "Player is not on the board")
        end
        
        @is_player_1 = @board.player_1 == @user

        if @board.Player_1_Turn? && !@is_player_1 || @board.Player_2_Turn? && @is_player_1
            return render_error_response({}, "Not your turn")
        end

        @board_moves = JSON.parse @board.board
        if @board_moves[params[:position]] != 0
            return render_error_response({}, "Position isn't empty")
        end
        @board_moves[params[:position]] = @is_player_1 ? "X" : "O"
        @board.board = @board_moves.to_s

        check_win

        if @board.save
            render_success_response(@board.json, "Move Done")
        else
            render_error_response({}, "Error saving board " + board.errors.full_messages.join(", "))
        end
    end

    private

    def set_board
        @board = Board.find_by(token: params[:board_token] ? params[:board_token] : params[:id])
        return if @board.present?
            return render_error_response({}, "Board doesn't exists", 404)
    end

    def set_user
        @user = User.find_by(token: params[:user_token])

        return if @user.present?
            return render_error_response({}, "User with token #{params[:user_token]} doesn't exists", 404)
    end

    def check_win
        board = @board_moves
        win = false
        draw = false

        #Horizontal
        for i in [0,3,6] do
            if (!win && board[i] != 0 && board[i] == board[i+1] && board[i+1] == board[i+2])
                win = true
            end
        end
        
        #Verical
        for i in 0..2 do
            if (!win && board[i] != 0 && board[i] == board[i+3] && board[i+3] == board[i+6])
                win = true
            end
        end

        #Crossed
        if(!win && board[4] != 0)
            if(board[0] == board[4] && board[4] == board[8])
                win = true
            end
            if(board[2] == board[4] && board[4] == board[6])
                win = true
            end
        end

        #Draw
        if (!win && board.all?{|x| x != 0})
            draw = true
        end

        if (draw)  
            new_status = :Draw
        else
            if (win)
                new_status = @is_player_1 ? :Player_1_Win : :Player_2_Win
            else
                new_status = @is_player_1 ? :Player_2_Turn : :Player_1_Turn
            end
        end

        @board.status = new_status
    end

end
