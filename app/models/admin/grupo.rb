class Admin::Grupo < ActiveRecord::Base

  has_many :admin_employees, :class_name => 'Admin::Employee'

  validates :nome, :presence => {:message => "Campo obrigatório"}
  validates :custo_total, :presence => {:message => "Campo obrigatório"}

end
