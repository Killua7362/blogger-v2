module Api
  class PostsController < ApplicationController

    def index
      posts = Rails.cache.fetch("all_posts") do 
        Post.all
      end
      
      render json: PostSerializer.new(posts).serializable_hash.to_json
    end
    
    def show
      post = Rails.cache.fetch("post_#{params[:id]}") do 
        Post.find_by(id: params[:id])
      end

      render json: PostSerializer.new(post).serializable_hash.to_json
    end

    def create
      post = Post.new(post_params)
      if post.save
        Rails.cache.write("post_#{post.id}",post)
        Rails.cache.delete("all_posts")
        render json: PostSerializer.new(post).serializable_hash.to_json
      else
        render json: {error: post.errors.messages},status: 422
      end
    end

    def update
      post = Rails.cache.fetch("post_#{params[:id]}") do 
        Post.find_by(id: params[:id])
      end

      if post.update(post_params)
        Rails.cache.write("post_#{params[:id]}",post)
        Rails.cache.delete("all_posts")
        render json: PostSerializer.new(post).serializable_hash.to_json
      else
        render json: {error: post.errors.messages},status: 422
      end
    end


    def destroy
      post = Post.find_by(id: params[:id])

      if post.destroy
        Rails.cache.delete("post_#{params[:id]}")
        Rails.cache.delete("all_posts")
        head :no_content
      else
        render json: {error: post.errors.messages},status: 422
      end
    end

    private

    def post_params
      params.require(:post).permit(:title,:description,:content,:pinned,:tags)
    end
  end
end
