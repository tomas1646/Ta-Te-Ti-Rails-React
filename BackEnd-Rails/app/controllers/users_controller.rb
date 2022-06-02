class UsersController < ApplicationController
  
  def register
    user = User.new(user_params)
    if user.save
      render_success_response(user, 'User Created')
    else
      render_error_response({}, "Error creating User #{user.errors.full_messages.join(', ')}")
    end
  end

  def login
    user = User.find_by(user_name: params[:user_name])

    if user.blank? || user.password != params[:password]
      render_error_response({}, 'Incorrect Username or Password')
    else
      render_success_response(user, 'Login successful')
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :password, :user_name)
  end
end
