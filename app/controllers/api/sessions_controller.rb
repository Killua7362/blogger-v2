module Api
  class SessionsController < ApplicationController
    include CurrentUserConcern

    def create
      begin
        user = User.where(email: params['user']['email']).first!
        user = user.try(:authenticate,params['user']['password'])
        if user
          session[:user_id] = user.id 
          render json: {
            logged_in: true,
            name: user.name,
            role: user.role
          }
        else
          render json: {
            error: 'Password is wrong or you signed in with google'
          }, status: 401
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
