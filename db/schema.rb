# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150512230055) do

  create_table "admin_categories", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "admin_customers", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.string   "responsible", limit: 255
    t.boolean  "active",      limit: 1
    t.float    "hours",       limit: 24
    t.string   "phone1",      limit: 255
    t.string   "phone2",      limit: 255
    t.string   "address",     limit: 255
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "admin_employees", force: :cascade do |t|
    t.string   "name",           limit: 255
    t.integer  "registration",   limit: 4
    t.integer  "admin_grupo_id", limit: 4
    t.integer  "roles_mask",     limit: 4
    t.string   "post",           limit: 255
    t.float    "salary",         limit: 24
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  add_index "admin_employees", ["admin_grupo_id"], name: "index_admin_employees_on_admin_grupo_id", using: :btree

  create_table "admin_grupos", force: :cascade do |t|
    t.string   "nome",        limit: 255
    t.float    "custo_total", limit: 24
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "admin_work_types", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.boolean  "ativo",                  limit: 1
    t.integer  "cliente_id",             limit: 4
    t.integer  "roles_mask",             limit: 4,   default: 4
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "nome",                   limit: 255
  end

  add_index "users", ["cliente_id"], name: "index_users_on_cliente_id", using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
