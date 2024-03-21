module Api
  class CommitsController < ApplicationController
    require 'json'
    include CurrentUserConcern

    def index
      if @current_user and @current_user.role == 'admin'
        keys = $redis.keys('commit_*')
        res = {}
        if !keys.empty?
          values = $redis.mget(*keys)
          keys.zip(values).each do |k,v|
            res[k.gsub("commit_","")] = v.gsub(/[^[:print:]]/, '')
          end
        end
        render json: res.to_json
      else
        render json: {}, status: 401
      end
    end

    def create
      if @current_user and @current_user.role == 'admin'
        Rails.cache.write("commit_#{params[:id]}",params[params[:id]].to_json)
        render json: params[params[:id]].to_json
      else
        render json: {}, status: 401
      end
    end
  
    def destroy
      if @current_user and @current_user.role == 'admin'
        Rails.cache.delete("commit_#{params[:id]}")
        head :no_content
      else
        render json: {}, status: 401
      end
    end

    def clear
      if @current_user and @current_user.role == 'admin'
        keys = $redis.keys('commit_*')
        if !keys.empty?
          $redis.del(*keys)
        end
        head :no_content
      else
        render json: {}, status: 401
      end
    end

  end
end
