class User < ApplicationRecord
  has_secure_password
  
  enum role: [:viewer, :moderator, :admin]
  validates :name, presence: true
  validates :email, uniqueness: true, presence: true
end
