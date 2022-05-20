Rails.application.routes.draw do
  
  resources :users, only: [:index, :show] do
    collection do
      post :register
      post :login
    end
  end

  resources :boards, only: [:index, :create, :show] do
    collection do
      get :find_open_boards
      get "find_user_boards/:user_token", to: "boards#find_user_boards"

      post ":board_token/join", to: "boards#join"
      post ":board_token/move", to: "boards#move"
    end
  end
end
