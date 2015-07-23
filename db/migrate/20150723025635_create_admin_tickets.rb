class CreateAdminTickets < ActiveRecord::Migration
  def change
    create_table :admin_tickets do |t|
      t.string :subject
      t.text :content
      t.belongs_to :user
      t.integer :status
      t.integer :priority
      t.date :delivery_date
      t.belongs_to :admin_category
      t.belongs_to :admin_work_type
      t.boolean :planned
      t.timestamps null: false
    end
      add_index :admin_tickets, :user_id
      add_index :admin_tickets, :admin_category_id
      add_index :admin_tickets, :admin_work_type_id
  end
end
