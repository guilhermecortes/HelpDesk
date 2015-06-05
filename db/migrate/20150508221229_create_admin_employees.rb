class CreateAdminEmployees < ActiveRecord::Migration
  def change
    create_table :admin_employees do |t|
      t.string :name
      t.integer :registration
      t.belongs_to :admin_grupo
      t.integer :roles_mask
      t.string :post
      t.float :salary
      t.timestamps null: false
    end
  end
end
