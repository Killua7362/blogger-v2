module Api
  class SessionsController < ApplicationController
    include CurrentUserConcern

    def create
      begin
        user = User.where(email: params['user']['email']).first!
        if user.provider == "rails_login"
          if user and user.try(:authenticate,params['user']['password'])
            session[:user_id] = user.id 
            render json: {
              logged_in: true,
              name: user.name,
              role: user.role
            }
          else
            render json: {
              error: 'Password is wrong'
            }, status: 401
          end
        else
          render json: {
            error: 'Email is registered with Google provider'
          }, status: 404
        end
      rescue
        render json: {
          error: 'Email not found'
        }, status: 404
      end
    end
    
  def logged_in #check if we are logged in 
      if @current_user
        render json: {
          logged_in: true,
          name: @current_user.name,
          role: @current_user.role
        }
      else
        render json: {
          logged_in: false
        }, status: 401
      end
    end
    
    def logout #do logout
      reset_session
      render json: {
        logged_in: false
      }
    end
  end
end
