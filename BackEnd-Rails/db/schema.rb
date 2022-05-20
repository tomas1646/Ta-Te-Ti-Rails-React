# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_05_11_193304) do
  create_table "boards", force: :cascade do |t|
    t.integer "created_by_id"
    t.integer "player_1_id"
    t.integer "player_2_id"
    t.string "token"
    t.string "board", default: "[0,0,0,0,0,0,0,0,0]"
    t.integer "status", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["created_by_id"], name: "index_boards_on_created_by_id"
    t.index ["player_1_id"], name: "index_boards_on_player_1_id"
    t.index ["player_2_id"], name: "index_boards_on_player_2_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "userName"
    t.string "password"
    t.string "token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
