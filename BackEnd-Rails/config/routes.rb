Rails.application.routes.draw do

  resources :users, only: [] do
    collection do
      post :register
      post :login
    end
  end

  resources :boards, only: [:create, :show] do
    member do 
      post :join
      post :move
    end
    
    collection do
      get :find_open_boards
      get :find_user_boards
      get :find_user_open_boards
    end
  end
end
