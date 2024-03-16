class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.text :title
      t.text :description
      t.text :content
      t.boolean :pinned
      t.text :tags

      t.timestamps
    end
  end
end
