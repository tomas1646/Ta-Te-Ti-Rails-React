class CreateBoards < ActiveRecord::Migration[7.0]
  def change
    create_table :boards do |t|
      t.belongs_to :player_1, class_name: "User"
      t.belongs_to :player_2, class_name: "User"

      t.string :token
      t.string :board, default: "[0,0,0,0,0,0,0,0,0]"
      t.integer :status, default: 0

      t.timestamps
    end
  end
end
