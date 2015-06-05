class CreateAdminGrupos < ActiveRecord::Migration
  def change
    create_table :admin_grupos do |t|
      t.string :nome
      t.float :custo_total
      t.timestamps null: false
    end
  end
end
