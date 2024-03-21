require 'httparty'                                                             
module Api
  class RegistrationsController < ApplicationController
    require 'google/apis/oauth2_v2'
    include HTTParty

    def create
      check_user = User.find_by(email: params['user']['email'])
      if check_user
        if check_user.provider == 'google'
          render json: {
            error: "Email is signed up via google provider"
          }, status: 500
        else
          render json: {
            error: "Email already exist. Click on sign in"
          }, status: 500
        end
      else
        user = User.create(
          name: params['user']['name'],
          email: params['user']['email'],
          password: params['user']['password'],
          password_confirmation: params['user']['password_confirmation']
        ) 

        if user and user.errors.messages.empty?
          head :no_content
        else
          render json: {
            error: "Error Occured"
          }, status: 500
        end
      end
    end

    
    def google_auth
      begin
        pattern = /^Bearer /
        header = request.headers['Authorization']
        access_token = header.gsub(pattern,'') if header && header.match(pattern)
        oauth2 = Google::Apis::Oauth2V2::Oauth2Service.new
        verify_token = oauth2.tokeninfo(access_token: access_token) # verify token

        user = User.find_or_create_by(provider: "google", email: verify_token.email ) do |u|
          user_info = HTTParty.get('https://www.googleapis.com/oauth2/v3/userinfo',headers: {"Authorization" => "Bearer #{access_token}"})
          u.name = user_info["name"]
          u.email = user_info["email"]
          u.password = SecureRandom.hex(10)
          u.password_confirmation = u.password
          u.provider = "google"
        end

        if user.valid? and user.errors.messages.empty?
          session[:user_id] = user.id 
          session[:expires_at] = Time.current + 7.days
          render json: {
              logged_in: true,
              name: user.name,
              role: user.role
          }
        else
          render json: {error: "Email already exist in the system, Try singing in instead"}, status: 401
        end

      rescue
        render json: {error: "Not Authorized"}, status: 401
      end
    end
  end
end
