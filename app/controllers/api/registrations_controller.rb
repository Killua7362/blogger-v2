module Api
  class RegistrationsController < ApplicationController
    def create # for sign up
      user = User.create(
        name: params['user']['name'],
        email: params['user']['email'],
        password: params['user']['password'],
        password_confirmation: params['user']['password_confirmation']
      )

      if user and user.errors.messages.empty?
        session[:user_id] = user.id
        head :no_content
      else
        render json: {
          errors: user.errors.messages
        }, status: 500
      end
    end
  end
end
