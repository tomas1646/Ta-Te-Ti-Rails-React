Rails.application.routes.draw do

  resources :users, only: [:index, :show] do
    collection do
      post :register
      post :login
    end
  end

  resources :boards, only: [:index, :create, :show] do
    member do 
      post :join
      post :move
    end
    
    collection do
      get :find_open_boards
      get :find_user_boards
    end
  end
end
