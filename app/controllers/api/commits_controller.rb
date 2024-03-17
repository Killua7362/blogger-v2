module Api
  class CommitsController < ApplicationController
    require 'json'
    def index
      keys = $redis.keys('commit_*')
      res = {}
      if !keys.empty?
        values = $redis.mget(*keys)
        keys.zip(values).each do |k,v|
          res[k.gsub("commit_","")] = v.gsub(/[^[:print:]]/, '')
        end
      end
      render json: res.to_json
    end

    def create
      Rails.cache.write("commit_#{params[:id]}",params[params[:id]].to_json)
      render json: params[params[:id]].to_json
    end
  
    def destroy
      Rails.cache.delete("commit_#{params[:id]}")
      head :no_content
    end

    def clear
      keys = $redis.keys('commit_*')
      if !keys.empty?
        $redis.del(*keys)
      end

      head :no_content
    end

  end
end
