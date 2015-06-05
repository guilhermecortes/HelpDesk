class AddIndexGrupoToEmployee < ActiveRecord::Migration
  def change
    add_index :admin_employees, :admin_grupo_id
  end
end
