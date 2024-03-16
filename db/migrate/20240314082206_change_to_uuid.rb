class ChangeToUuid < ActiveRecord::Migration[7.1]
  def change
    enable_extension 'pgcrypto'
    add_column :posts, :uuid, :uuid, default: "gen_random_uuid()", null: false

    change_table :posts do |t|
      t.remove :id
      t.rename :uuid, :id
    end
    execute "ALTER TABLE posts ADD PRIMARY KEY (id);"
  end
end
