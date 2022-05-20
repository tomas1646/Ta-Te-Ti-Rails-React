class UsersController < ApplicationController
    before_action :set_user, only: [:show]

    def index
        users = User.all
        render_success_response(users)
    end

    def show
        render_success_response(@user)
    end

    def register
        user = User.new(user_params)
        if user.save
            render_success_response(user, "User Created")
        else
            render_error_response({}, "Error creating User " + user.errors.full_messages.join(", "))
        end
    end

    def login
        user = User.find_by(userName: params[:userName])
        
        if user.blank? || user.password != params[:password]
            render_error_response({}, "Incorrect Username or Password")
        else
            render_success_response(user, "Login successful")
        end
    end

    private

    def user_params
        params.require(:user).permit(:name, :password, :userName)
    end

    def set_user
        @user = User.find_by(id: params[:id])
        return if @user.present?
            render_error_response({}, "User with id #{params[:id]} doesn't exists", 404)
    end

end
