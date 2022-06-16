class BoardsController < ApplicationController
  before_action :set_board, only: [:show, :join, :move]
  before_action :check_token, except: [:show, :find_open_boards]

  def index
    boards = Board.ransack(status_in: params[:status], player_1_id_or_player_2_id_eq: params.keys.include?("user") ? @user.id : nil).result

    render_success_response(boards.preload(:player_1, :player_2).map { |board| board.json })
  end

  def show
    render_success_response(@board.json)
  end

  def create
    board = Board.new(player_1: @user)
    if board.save
      render_success_response(board.json, 'Board Created')
    else
      render_error_response({}, "Error creating Board #{board.errors.full_messages.join(', ')}")
    end
  end

  def join
    if @board.player_1 == @user || @board.player_2 == @user
      return render_success_response(@board.json, 'Joined to the board')
    end

    if @board.player_1.present? && @board.player_2.present?
      return render_error_response({}, 'Board is full') 
    end

    @board.set_second_player @user

    if @board.save
      render_success_response(@board.json, 'Joined to the board')
    else
      render_error_response({}, "Error Joining Board #{board.errors.full_messages.join(', ')}")
    end
  end

  def move
    if @board.waiting_players?
      return render_error_response({}, 'Waiting For Players to Join')
    end

    if @board.finished?
      return render_error_response({}, 'Game Finished') 
    end

    if !@board.is_player_in_board? @user 
      return render_error_response({}, 'Player is not on the board')
    end

    if !@board.is_player_turn? @user
      return render_error_response({}, 'Not your turn')
    end

    if !@board.is_position_empty? params[:position]
      return render_error_response({}, "Position isn't empty") 
    end

    @board.make_move params[:position], @user

    if @board.save
      render_success_response(@board.json, 'Move Done')
    else
      render_error_response({}, "Error saving board  #{board.errors.full_messages.join(', ')}")
    end
  end

  private

  def set_board
    @board = Board.find_by(token: params[:id])
    return if @board.present?

    render_error_response({}, "Board doesn't exists", 404)
  end

  def check_token
    @user = User.find_by(token: request.headers['Authorization'])
    return if @user.present?

    render_error_response({}, "User with token #{request.headers['Authorization']} doesn't exists", 404)
  end
end
