Rails.application.routes.draw do
  root "pages#index"
  
  namespace :api do
    resources :posts, param: :id
  end

  # get '*path', to: 'pages#index', via: :all
  get '/api/commits', to: 'api/commits#index'
  post '/api/commits/:id', to: 'api/commits#create'
  delete '/api/commits', to: 'api/commits#clear'
  delete '/api/commits/:id', to: 'api/commits#destroy'
end
