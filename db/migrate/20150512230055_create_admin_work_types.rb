class CreateAdminWorkTypes < ActiveRecord::Migration
  def change
    create_table :admin_work_types do |t|
      t.string :name
      t.timestamps null: false
    end
  end
end
