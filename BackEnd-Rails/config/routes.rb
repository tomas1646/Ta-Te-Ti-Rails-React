Rails.application.routes.draw do

  resources :users, only: [:create] do
    collection do
      post :login
    end
  end

  resources :boards, only: [:index, :create, :show] do
    member do 
      post :join
      post :move
    end
  end
end
