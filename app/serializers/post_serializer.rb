class PostSerializer
  include JSONAPI::Serializer
  attributes :title, :description, :content, :pinned, :tags, :created_at, :updated_at
end
