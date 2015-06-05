class CreateAdminCustomers < ActiveRecord::Migration
  def change
    create_table :admin_customers do |t|
      t.string :name
      t.string :responsible
      t.boolean :active
      t.float :hours
      t.string :phone1
      t.string :phone2
      t.string :address
      t.timestamps null: false
    end
  end
end
