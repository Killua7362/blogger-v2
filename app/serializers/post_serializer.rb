class PostSerializer
  include JSONAPI::Serializer
  attributes :id, :title, :description, :content, :pinned, :tags, :created_at, :updated_at
end
